'use client';

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [visible, setVisible] = useState(false);
  const [showCTA, setShowCTA] = useState(false);

  useEffect(() => {
    setVisible(true);
    // Show CTA after main content fades in
    setTimeout(() => setShowCTA(true), 800);
  }, []);

  return (
    <main className={`flex min-h-screen flex-col items-center justify-center bg-white transition-all duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="w-full max-w-5xl text-center space-y-6">
        <h1 className="text-lg font-['Press_Start_2P'] tracking-[0.4em] text-black/80">
          NOISE
        </h1>
        <div className="flex items-center justify-center">
          <div className="h-[2px] w-8 bg-black/10"></div>
        </div>
        {showCTA && (
          <div className="flex flex-col items-center space-y-8 animate-fade-in">
            <p className="text-[8px] font-['Press_Start_2P'] tracking-[0.3em] text-black/40">
              welcome to the void
            </p>
            <Link 
              href="/enter"
              className="text-[10px] font-['Press_Start_2P'] tracking-[0.2em] text-black/60 hover:text-black/90 transition-all duration-300 group"
            >
              ENTER_
              <span className="inline-block w-2 h-[2px] bg-black/40 group-hover:bg-black/90 transition-all duration-300 ml-2"></span>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
} 