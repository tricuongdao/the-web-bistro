import { useId } from 'react';

export function MarkAwning({ 
  size = 200, 
  variant = 'monogram', 
  stripeA = '#E0A93B', 
  stripeB = '#F6EFE2', 
  trim = '#F6EFE2', 
  letterColor = '#F6EFE2' 
}) {
  // Unique per-instance clipPath id — duplicate SVG ids on one page break
  // the clipping of every copy after the first.
  const clipId = `awn-clip-${useId()}`;

  if (variant === 'icon') {
    return (
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 200 200" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        role="img" 
        aria-label="The Web Bistro awning icon"
      >
        <defs>
          <clipPath id={clipId}>
            <path d="M14 44 H186 V150 a21.5 21.5 0 0 1 -43 0 a21.5 21.5 0 0 1 -43 0 a21.5 21.5 0 0 1 -43 0 a21.5 21.5 0 0 1 -43 0 Z"></path>
          </clipPath>
        </defs>
        <g clipPath={`url(#${clipId})`}>
          <rect x="14" y="34" width="43" height="140" fill={stripeA}></rect>
          <rect x="57" y="34" width="43" height="140" fill={stripeB}></rect>
          <rect x="100" y="34" width="43" height="140" fill={stripeA}></rect>
          <rect x="143" y="34" width="43" height="140" fill={stripeB}></rect>
        </g>
        <rect x="6" y="32" width="188" height="13" rx="6.5" fill={trim}></rect>
      </svg>
    );
  }

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      role="img" 
      aria-label="The Web Bistro awning monogram"
    >
      <defs>
        <clipPath id={clipId}>
          <path d="M36 62 H164 V112 a16 16 0 0 1 -32 0 a16 16 0 0 1 -32 0 a16 16 0 0 1 -32 0 a16 16 0 0 1 -32 0 Z"></path>
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <rect x="36" y="56" width="32" height="80" fill={stripeA}></rect>
        <rect x="68" y="56" width="32" height="80" fill={stripeB}></rect>
        <rect x="100" y="56" width="32" height="80" fill={stripeA}></rect>
        <rect x="132" y="56" width="32" height="80" fill={stripeB}></rect>
      </g>
      <rect x="30" y="50" width="140" height="10" rx="5" fill={trim}></rect>
      <text 
        x="100" 
        y="176" 
        textAnchor="middle" 
        fontFamily="'Bodoni Moda', serif" 
        fontSize="52" 
        fontWeight="600" 
        fill={letterColor} 
        letterSpacing="1"
      >WB</text>
    </svg>
  );
}
