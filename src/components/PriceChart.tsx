// src/components/PriceChart.tsx
'use client';
import { useEffect, useRef } from 'react';

export default function PriceChart() {
  const ref = useRef<HTMLDivElement>(null);
  const symbol = process.env.NEXT_PUBLIC_TV_SYMBOL || 'BINANCE:BNBUSDT';

  useEffect(() => {
    if (!ref.current) return;
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol,
      interval: '60',
      timezone: 'Etc/UTC',
      theme: 'dark',
      style: '1',
      hide_legend: false,
      allow_symbol_change: true,
      studies: ['MASimple@tv-basicstudies'],
      locale: 'en',
    });
    ref.current.innerHTML = '';
    ref.current.appendChild(script);
    return () => { ref.current && (ref.current.innerHTML = ''); };
  }, [symbol]);

  return <div style={{height:420}}><div className="tradingview-widget-container" ref={ref}/></div>;
}
