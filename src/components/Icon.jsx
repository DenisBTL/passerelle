import React from "react";
export default function Icon({ name, size = 24, ...props }) {
  const paths = {
    arrow: (
      <>
        <path d="M4 12h15M13 6l6 6-6 6" />
      </>
    ),
    search: (
      <>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m16 16 5 5" />
      </>
    ),
    close: <path d="m6 6 12 12M6 18 18 6" />,
    plus: <path d="M12 5v14M5 12h14" />,
    menu: <path d="M4 6h16M4 12h16M4 18h16" />,
    bulb: (
      <>
        <path d="M8 15a7 7 0 1 1 8 0l-1 3H9l-1-3ZM9 21h6M10 18v-7m4 7v-7m-4 0 2 2 2-2" />
      </>
    ),
    bottle: (
      <>
        <path d="M8 3h4v5l3 4v9H5v-9l3-4V3ZM5 14h10M19 6c3 3 3 7 0 10m-2-8c2 2 2 4 0 6" />
        <path d="M8 17h4" />
      </>
    ),
    document: (
      <>
        <path d="M14 2H4v20h16V8l-6-6ZM14 2v6h6M8 12h8M8 16h6" />
        <circle cx="18" cy="19" r="4" />
        <path d="M14 19h8m-4-4v8" />
      </>
    ),
    gift: (
      <>
        <path d="M3 10h18v4H3zM5 14v8h14v-8M12 10v12" />
        <path d="M12 10C2 11 3 0 8 3c3 2 4 7 4 7Zm0 0c10 1 9-10 4-7-3 2-4 7-4 7Z" />
      </>
    ),
    cloche: (
      <>
        <path d="M2 16h20M4 16a8 8 0 0 1 16 0M4 20h16M12 5V3M10 3h4" />
      </>
    ),
    sparkles: (
      <>
        <path d="m12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7Z" />
        <path d="M20 2v4m-2-2h4" />
      </>
    ),
    truck: (
      <>
        <path d="M2 4h12v14H2zM14 9h5l3 5v4h-8M14 14h8" />
        <circle cx="6" cy="19" r="2" />
        <circle cx="18" cy="19" r="2" />
      </>
    ),
    euro: (
      <>
        <path d="M16 6a6 6 0 1 0 0 12M5 10h9M5 14h8M19 3l3 3-3 3M22 6h-3M5 21l-3-3 3-3M2 18h3" />
      </>
    ),
    link: (
      <>
        <path d="m10 14 4-4M9 16l-2 2a4 4 0 0 1-6-6l5-5a4 4 0 0 1 6 0m0 10a4 4 0 0 0 6 0l5-5a4 4 0 0 0-6-6l-2 2" />
      </>
    ),
    chart: (
      <>
        <path d="M4 13h3v8H4zM11 9h3v12h-3zM18 3h3v18h-3z" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    leaf: (
      <>
        <path d="M20 3C5 2 2 9 6 17c8 4 15-2 14-14ZM3 21 15 9M8 16v-5m0 5h6" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 6 9 7 9-7" />
      </>
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name] || paths.link}
    </svg>
  );
}

export function GrapeMark({ className = "" }) {
  return (
    <svg
      className={className}
      width="42"
      height="54"
      viewBox="0 0 48 64"
      aria-hidden="true"
    >
      <g fill="currentColor">
        <circle cx="10" cy="22" r="7" />
        <circle cx="27" cy="22" r="7" />
        <circle cx="41" cy="22" r="6" />
        <circle cx="18" cy="38" r="7" />
        <circle cx="34" cy="38" r="7" />
        <circle cx="26" cy="53" r="7" />
      </g>
      <path
        d="M24 14Q21 3 30 2M10 13l3-9m27 9-5-9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
