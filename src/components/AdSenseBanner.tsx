import React from 'react';

interface AdSenseBannerProps {
  format?: 'horizontal' | 'rectangle';
  className?: string;
}

export const AdSenseBanner: React.FC<AdSenseBannerProps> = ({
  format = 'horizontal',
  className = '',
}) => {
  return (
    <aside
      aria-label="Sponsored Advertisement Slot"
      className={`my-12 max-w-5xl mx-auto px-4 ${className}`}
    >
      <div className="rounded-xl border border-[#232738] bg-[#0e1017]/70 p-4 text-center">
        <div className="flex items-center justify-between pb-2 border-b border-[#1b1f2b] text-[10px] uppercase font-bold text-gray-400 tracking-wider">
          <span>Advertisement / Sponsored Placement</span>
          <span>AdSense Ready</span>
        </div>

        <div
          className={`mt-3 mx-auto flex flex-col items-center justify-center rounded-lg border border-dashed border-[#2b3144] bg-[#12141d]/50 text-gray-400 text-xs p-6 ${
            format === 'horizontal' ? 'h-24 sm:h-28 w-full' : 'h-48 w-full max-w-sm'
          }`}
        >
          <div className="flex items-center space-x-2 text-gray-400 mb-1">
            <span className="w-2 h-2 rounded-full bg-gray-500" />
            <span className="font-mono text-[11px] font-semibold">
              {format === 'horizontal' ? 'Responsive Leaderboard Banner (728x90 / 970x90)' : 'Medium Rectangle (300x250)'}
            </span>
          </div>
          <p className="text-[10px] text-gray-400">
            AdSense script tag container slot • Configured for high viewability and strict policy compliance
          </p>
        </div>
      </div>
    </aside>
  );
};
