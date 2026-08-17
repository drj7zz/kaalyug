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
    <div className="mb-[22px]"><div className="text-[#62d9c5] text-[9px] font-semibold tracking-[0.12em]">NATIVE ECOSYSTEM WALLET</div><h2 className="mt-[8px] text-[34px] tracking-[-1.8px] font-bold">YugCoin</h2><p className="max-w-[560px] mt-[10px] text-[#7d7f89] text-[11px] leading-[1.7]">Your YugCoin account and activity are loaded securely from the live wallet service.</p></div>
    {!session ? <div className="glass p-[28px] rounded-[25px] text-center"><p className="text-[#aeb0bc] text-sm">Sign in with your YugCoin account to view your live wallet.</p><Link to="/yugcoin/login" className="inline-block mt-4 auth-button">YugCoin login</Link><p className="mt-3 text-[#858691] text-[10px]">Marketplace login and YugCoin login are separate accounts.</p></div> : <div className="grid grid-cols-1 md:grid-cols-[1.15fr_0.85fr] gap-[15px]">
      <div className="wallet-card-bg relative min-h-[320px] p-[28px] overflow-hidden rounded-[27px] border border-[rgba(255,255,255,0.13)] backdrop-blur-[30px] shadow-[inset_0_1px_rgba(255,255,255,0.09),0_30px_90px_rgba(0,0,0,0.4)]">
        <div className="relative z-[2] flex justify-between items-center"><div className="flex items-center gap-[10px]"><div className="w-[34px] h-[34px] grid place-items-center rounded-full text-[12px] font-extrabold text-[#111] bg-gradient-to-br from-[#fff] via-[#83e9ff] to-[#a06aff]">YC</div><div><strong className="text-[13px]">YUGCOIN</strong><small className="block mt-[3px] text-[#6e707b] text-[8px]">LIVE WALLET</small></div></div><div className="px-[9px] py-[6px] rounded-[8px] text-[#7d808c] bg-[rgba(255,255,255,0.05)] text-[8px]">{wallet?.walletId ?? wallet?.walletAddress ?? wallet?.address ?? 'Loading...'}</div></div>
        <div className="relative z-[2] mt-[55px] text-[#72747e] text-[9px] tracking-[0.1em]">AVAILABLE BALANCE</div><div className="relative z-[2] mt-[8px] text-[45px] font-bold tracking-[-2px]">{wallet ? formatAmount(wallet.balance) : '—'} <span className="text-[#777984] text-[13px] font-medium tracking-normal">YC</span></div><div className="absolute left-[28px] bottom-[25px]"><small className="block text-[#676974] text-[8px]">WALLET OWNER</small><strong className="block mt-[3px] text-[10px]">{session.name}</strong></div>
      </div>
      <div className="glass p-[23px] rounded-[25px]"><div className="flex justify-between items-center mb-[18px]"><h3 className="text-[14px] font-bold">Recent activity</h3><span className="text-[#666873] text-[8px]">LIVE DATA</span></div>{error ? <p className="text-[#ff8799] text-[10px]">{error}</p> : activities.length ? activities.slice(0, 4).map((activity, index) => <div key={activity._id ?? activity.id ?? index} className="flex items-center justify-between py-[12px] border-b border-[rgba(255,255,255,0.06)] last:border-0"><div><strong className="block text-[9px]">{activity.description ?? activity.type ?? 'Wallet activity'}</strong><small className="block mt-[3px] text-[#656773] text-[7px]">{activity.createdAt ? new Date(activity.createdAt).toLocaleDateString() : activity.status ?? 'Completed'}</small></div><div className="text-[9px] font-semibold text-[#67dec9]">{formatAmount(activity.amount)} YC</div></div>) : <p className="py-[22px] text-center text-[#858691] text-[10px]">No wallet activity yet.</p>}</div>
    </div>}
  </section>;
}
