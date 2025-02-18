'use client';

import { useEffect, useState } from "react";

interface Token {
  token: {
    symbol: string;
    mint: string;
  };
  pools: Array<{
    price: { usd: number };
    liquidity: { usd: number };
  }>;
  events: {
    "1h": { priceChangePercentage: number };
  };
}

export default function MarketFeed() {
  const [trending, setTrending] = useState<Token[]>([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const fetchData = async () => {
      try {
        const trendingRes = await fetch('https://data.solanatracker.io/tokens/trending/1h', {
          headers: { 'x-api-key': 'cbbff4e0-dc44-4106-9e43-2b54667ea532' }
        });
        const trendingData = await trendingRes.json();
        setTrending(trendingData.slice(0, 5));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number, decimals = 8) => {
    if (num === 0) return '0';
    if (num < 0.00001) return num.toExponential(2);
    return num.toFixed(decimals).replace(/\.?0+$/, '');
  };

  return (
    <main className={`flex min-h-screen flex-col items-center justify-center bg-white text-black transition-all duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="w-full max-w-[280px] space-y-6">
        {trending.map((token, i) => {
          const price = token.pools[0]?.price?.usd || 0;
          const change = token.events['1h']?.priceChangePercentage || 0;
          const isPositive = change > 0;
          
          return (
            <div key={i} className="flex flex-col items-center space-y-[2px] group">
              <div className="flex items-center space-x-2">
                <p className="font-['Press_Start_2P'] text-[8px] tracking-[0.2em] text-black/60">
                  ${token.token.symbol.toLowerCase()}
                </p>
                <p className="font-['Press_Start_2P'] text-[8px] tracking-[0.2em] text-black/40">
                  ${formatNumber(price)}
                </p>
              </div>
              <p className={`font-['Press_Start_2P'] text-[8px] tracking-[0.1em] ${isPositive ? 'text-black/30' : 'text-black/20'}`}>
                {isPositive ? '+' : ''}{formatNumber(change, 2)}%
              </p>
              <div className="h-[1px] w-0 bg-black/5 transition-all duration-300 group-hover:w-8"></div>
            </div>
          );
        })}
      </div>
    </main>
  );
} 