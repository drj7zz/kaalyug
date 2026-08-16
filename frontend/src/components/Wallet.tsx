"use client";

import { useState } from "react";

export default function Wallet() {
  const [walletBalance, setWalletBalance] = useState(250);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 1800);
  };

  const simulateReceive = () => {
    setWalletBalance((prev) => prev + 25);
    showToast("+25 YC received");
  };

  const simulateSend = () => {
    if (walletBalance < 10) {
      showToast("Insufficient demo balance");
      return;
    }
    setWalletBalance((prev) => prev - 10);
    showToast("-10 YC sent");
  };

  return (
    <section id="wallet" className="w-[min(92%,1100px)] mx-auto mt-[90px]">
      <div className="mb-[22px]">
        <div className="text-[#62d9c5] text-[9px] font-semibold tracking-[0.12em]">NATIVE ECOSYSTEM WALLET</div>
        <h2 className="mt-[8px] text-[34px] tracking-[-1.8px] font-bold">YugCoin</h2>
        <p className="max-w-[560px] mt-[10px] text-[#7d7f89] text-[11px] leading-[1.7]">
          A lightweight wallet interface designed for the Kaalyug ecosystem. In the demo, YugCoin represents the internal digital balance used to demonstrate marketplace transactions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1.15fr_0.85fr] gap-[15px]">
        {/* WALLET CARD */}
        <div className="wallet-card-bg relative min-h-[350px] md:min-h-[320px] p-[28px] overflow-hidden rounded-[27px] border border-[rgba(255,255,255,0.13)] backdrop-blur-[30px] shadow-[inset_0_1px_rgba(255,255,255,0.09),0_30px_90px_rgba(0,0,0,0.4)]">
          <div className="relative z-[2] flex justify-between items-center">
            <div className="flex items-center gap-[10px]">
              <div className="w-[34px] h-[34px] grid place-items-center rounded-full text-[12px] font-extrabold text-[#111] bg-gradient-to-br from-[#fff] via-[#83e9ff] to-[#a06aff] shadow-[0_0_25px_rgba(100,190,255,0.25)]">
                YC
              </div>
              <div>
                <strong className="text-[13px]">YUGCOIN</strong>
                <small className="block mt-[3px] text-[#6e707b] text-[8px]">KAALYUG WALLET</small>
              </div>
            </div>
            <div className="px-[9px] py-[6px] rounded-[8px] text-[#7d808c] bg-[rgba(255,255,255,0.05)] text-[8px]">YC-20481</div>
          </div>

          <div className="relative z-[2] mt-[55px] text-[#72747e] text-[9px] tracking-[0.1em]">AVAILABLE BALANCE</div>
          <div className="relative z-[2] mt-[8px] text-[45px] font-bold tracking-[-2px]">
            {walletBalance.toFixed(2)} <span className="text-[#777984] text-[13px] font-medium tracking-normal">YC</span>
          </div>

          <div className="static md:absolute mt-[35px] md:mt-0 left-[28px] right-[28px] bottom-[25px] flex justify-between items-end">
            <div>
              <small className="block text-[#676974] text-[8px]">WALLET OWNER</small>
              <strong className="block mt-[3px] text-[10px]">kaalyug_dev</strong>
            </div>
            <div className="flex gap-[7px]">
              <button onClick={simulateReceive} className="px-[11px] py-[8px] text-[#b8bac5] border border-[rgba(255,255,255,0.09)] rounded-[9px] bg-[rgba(255,255,255,0.045)] text-[8px] cursor-pointer hover:bg-[rgba(255,255,255,0.1)]">
                + Receive
              </button>
              <button onClick={simulateSend} className="px-[11px] py-[8px] text-[#b8bac5] border border-[rgba(255,255,255,0.09)] rounded-[9px] bg-[rgba(255,255,255,0.045)] text-[8px] cursor-pointer hover:bg-[rgba(255,255,255,0.1)]">
                Send →
              </button>
            </div>
          </div>
        </div>

        {/* TRANSACTIONS */}
        <div className="glass p-[23px] rounded-[25px]">
          <div className="flex justify-between items-center mb-[18px]">
            <h3 className="text-[14px] font-bold">Recent activity</h3>
            <span className="text-[#666873] text-[8px]">DEMO WALLET</span>
          </div>

          {[
            { id: 1, title: "Demo Balance", subtitle: "Initial wallet", icon: "↓", amount: "+250 YC", type: "received" },
            { id: 2, title: "Glass UI Kit", subtitle: "Marketplace", icon: "↗", amount: "-25 YC", type: "sent" },
            { id: 3, title: "Creator Reward", subtitle: "Kaalyug ecosystem", icon: "↓", amount: "+40 YC", type: "received" },
            { id: 4, title: "UI Components", subtitle: "Marketplace", icon: "↗", amount: "-15 YC", type: "sent" },
          ].map((tx) => (
            <div key={tx.id} className="flex items-center justify-between py-[12px] border-b border-[rgba(255,255,255,0.06)] last:border-0">
              <div className="flex items-center gap-[10px]">
                <div className="w-[30px] h-[30px] grid place-items-center rounded-[10px] text-[#8e90a0] bg-[rgba(255,255,255,0.05)] text-[10px]">{tx.icon}</div>
                <div>
                  <strong className="block text-[9px]">{tx.title}</strong>
                  <small className="block mt-[3px] text-[#656773] text-[7px]">{tx.subtitle}</small>
                </div>
              </div>
              <div className={`text-[9px] font-semibold ${tx.type === "received" ? "text-[#67dec9]" : "text-[#ff8799]"}`}>{tx.amount}</div>
            </div>
          ))}
        </div>
      </div>

      {toastMessage && (
        <div className="fixed right-[20px] bottom-[20px] z-[999] px-[16px] py-[12px] rounded-[12px] bg-[rgba(20,20,27,0.9)] border border-[rgba(255,255,255,0.12)] backdrop-blur-[20px] text-white text-[11px] shadow-[0_15px_40px_rgba(0,0,0,0.35)]">
          {toastMessage}
        </div>
      )}
    </section>
  );
}
