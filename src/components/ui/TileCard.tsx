import React from 'react';

type Props = {
  title: string;
  subtitle?: string;
  img?: string;
  accent?: 'mint' | 'peach' | 'sky';
  badge?: number | string;
  onClick?: () => void;
};

const accentMap = {
  mint:  'bg-mint-100 text-mint-500',
  peach: 'bg-peach-100 text-peach-500',
  sky:   'bg-sky-100 text-sky-500',
} as const;

export default function TileCard({
  title, subtitle, img, accent = 'sky', badge, onClick,
}: Props) {
  return (
    <button onClick={onClick} className="w-full text-left">
      <div className="app-card app-card-hover relative overflow-hidden">
        {/* image */}
        <div className="aspect-[4/3] w-full overflow-hidden">
          {img ? (
            <img src={img} alt={title} className="h-full w-full object-cover" loading="lazy" />
          ) : (
            <div className={`tile-icon ${accentMap[accent]} m-4`} />
          )}
        </div>

        {/* content */}
        <div className="p-4">
          <h3 className="text-[15px] font-semibold leading-5 line-clamp-2">{title}</h3>
          {subtitle && (
            <p className="mt-1 text-xs text-slate-500 line-clamp-1">{subtitle}</p>
          )}
        </div>

        {/* corner badge */}
        {badge ? <span className="badge">{badge}</span> : null}
      </div>
    </button>
  );
}
