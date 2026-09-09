import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getApiData, readApiError, yugcoinApiUrl } from '../lib/api';
import { getYugcoinSession } from '../lib/yugcoinAuth';

type Activity = { _id?: string; id?: string; type?: string; description?: string; createdAt?: string; amount?: number | string; status?: string };
type Wallet = { balance?: number | string; walletId?: string; walletAddress?: string; address?: string; transactions?: Activity[]; recentTransactions?: Activity[] };
type WalletResponse = Wallet & { wallet?: Wallet };
const formatAmount = (amount: number | string | undefined) => Number(amount ?? 0).toLocaleString(undefined, { maximumFractionDigits: 2 });

export default function Wallet() {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [error, setError] = useState('');
  const session = getYugcoinSession();

  useEffect(() => {
    if (!session) return;
    const controller = new AbortController();
    fetch(`${yugcoinApiUrl}/wallet`, { headers: { Authorization: `Bearer ${session.token}` }, signal: controller.signal })
      .then(async response => {
        if (!response.ok) throw new Error(await readApiError(response, 'Unable to load your wallet'));
        return response.json();
      })
      .then(payload => {
        const data = getApiData<WalletResponse>(payload);
        setWallet(data.wallet ?? data);
      })
      .catch(requestError => { if (requestError.name !== 'AbortError') setError(requestError.message); });
    return () => controller.abort();
  }, [session?.token]);

  const activities = wallet?.transactions ?? wallet?.recentTransactions ?? [];
  return <section id="wallet" className="w-[min(92%,1100px)] mx-auto mt-[90px]">
    <div className="mb-[22px]"><div className="text-[#71dfcc] text-[11px] font-semibold tracking-[0.12em]"><i className="fa-solid fa-bolt mr-1"></i>NATIVE ECOSYSTEM WALLET</div><h2 className="mt-[8px] text-[clamp(26px,3.4vw,36px)] tracking-[-1px] font-bold">YugCoin</h2><p className="max-w-[560px] mt-[10px] text-[#a3a5b0] text-[13px] leading-[1.7]">Your YugCoin account and activity are loaded securely from the live wallet service.</p></div>
    {!session ? <div className="glass p-[28px] rounded-[25px] text-center"><p className="text-[#c3c4cd] text-sm"><i className="fa-solid fa-lock text-[#ff8799] mr-2"></i>Sign in with your YugCoin account to view your live wallet.</p><Link to="/yugcoin/login" className="inline-block mt-4 auth-button btn-hover w-auto px-6"><i className="fa-solid fa-right-to-bracket mr-2"></i>YugCoin login</Link><p className="mt-3 text-[#8f919c] text-[11px]">Marketplace login and YugCoin login are separate accounts.</p></div> : <div className="grid grid-cols-1 md:grid-cols-[1.15fr_0.85fr] gap-[15px]">
      <div className="wallet-card-bg relative min-h-[320px] p-[28px] overflow-hidden rounded-[27px] border border-[rgba(255,255,255,0.13)] backdrop-blur-[30px] shadow-[inset_0_1px_rgba(255,255,255,0.09),0_30px_90px_rgba(0,0,0,0.4)] hover:shadow-[0_40px_100px_rgba(0,0,0,0.6)] hover:-translate-y-1 transition-all duration-300">
        <div className="relative z-[2] flex justify-between items-center"><div className="flex items-center gap-[10px]"><div className="w-[34px] h-[34px] grid place-items-center rounded-full text-[12px] font-extrabold text-[#111] bg-[#71e5d1]"><i className="fa-solid fa-coins"></i></div><div><strong className="text-[14px]">YUGCOIN</strong><small className="block mt-[3px] text-[#8f919c] text-[10px]">LIVE WALLET</small></div></div><div className="px-[9px] py-[6px] rounded-[8px] text-[#a3a5b0] bg-[rgba(255,255,255,0.05)] text-[10px]"><i className="fa-solid fa-fingerprint mr-1"></i>{wallet?.walletId ?? wallet?.walletAddress ?? wallet?.address ?? 'Loading...'}</div></div>
        <div className="relative z-[2] mt-[55px] text-[#9b9da8] text-[10px] tracking-[0.1em]">AVAILABLE BALANCE</div><div className="relative z-[2] mt-[8px] text-[45px] font-bold tracking-[-2px]">{wallet ? formatAmount(wallet.balance) : '—'} <span className="text-[#9b9da8] text-[14px] font-medium tracking-normal">YC</span></div><div className="absolute left-[28px] bottom-[25px]"><small className="block text-[#8f919c] text-[10px]">WALLET OWNER</small><strong className="block mt-[3px] text-[12px]"><i className="fa-solid fa-user text-[#71e5d1] mr-1"></i>{session.name}</strong></div>
      </div>
      <div className="glass p-[23px] rounded-[25px]"><div className="flex justify-between items-center mb-[18px]"><h3 className="text-[14px] font-bold"><i className="fa-solid fa-clock-rotate-left mr-2 text-[#71dfcc]"></i>Recent activity</h3><span className="text-[#8f919c] text-[10px]"><i className="fa-solid fa-satellite-dish mr-1"></i>LIVE DATA</span></div>{error ? <p className="text-[#ff8799] text-[11px]">{error}</p> : activities.length ? activities.slice(0, 4).map((activity, index) => <div key={activity._id ?? activity.id ?? index} className="flex items-center justify-between py-[12px] border-b border-[rgba(255,255,255,0.06)] last:border-0 hover:bg-[rgba(255,255,255,0.02)] px-2 -mx-2 rounded-lg transition-colors"><div><strong className="block text-[11px]">{activity.description ?? activity.type ?? 'Wallet activity'}</strong><small className="block mt-[3px] text-[#8f919c] text-[9px]">{activity.createdAt ? new Date(activity.createdAt).toLocaleDateString() : activity.status ?? 'Completed'}</small></div><div className="text-[11px] font-semibold text-[#71dfcc]">{formatAmount(activity.amount)} YC</div></div>) : <p className="py-[22px] text-center text-[#a3a5b0] text-[12px]"><i className="fa-solid fa-ghost mr-2"></i>No wallet activity yet.</p>}</div>
    </div>}
  </section>;
}
