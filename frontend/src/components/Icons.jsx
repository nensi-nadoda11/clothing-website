function makeIcon(path, { viewBox = '0 0 24 24' } = {}) {
  return function Icon({ className = '', strokeWidth = 1.8 }) {
    return (
      <svg
        className={className}
        viewBox={viewBox}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {path}
      </svg>
    );
  };
}

export const IconSearch = makeIcon(<><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>);
export const IconBag = makeIcon(<><path d="M6 8h12l-1 12H7L6 8Z" /><path d="M9 8a3 3 0 0 1 6 0" /></>);
export const IconHeart = makeIcon(<path d="M20 8.5c0 4.5-8 10.5-8 10.5S4 13 4 8.5A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 8 2.5Z" />);
export const IconMenu = makeIcon(<><path d="M4 6h16" /><path d="M4 12h16" /><path d="M4 18h16" /></>);
export const IconX = makeIcon(<path d="M6 6l12 12M18 6 6 18" />);
export const IconTruck = makeIcon(<><path d="M3 7h11v10H3z" /><path d="M14 10h4l3 3v4h-7z" /><circle cx="7" cy="18" r="2" /><circle cx="17" cy="18" r="2" /></>);
export const IconShield = makeIcon(<><path d="M12 3 5 6v5c0 4.9 3.1 8.7 7 10 3.9-1.3 7-5.1 7-10V6l-7-3Z" /><path d="m9.5 12 1.9 1.9 3.8-3.8" /></>);
export const IconArrowRight = makeIcon(<path d="M5 12h14M13 5l7 7-7 7" />);
export const IconStar = makeIcon(<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.1L12 17l-5.6 3.1 1.1-6.1L3 9.6l6.2-.9L12 3Z" />);
export const IconMinus = makeIcon(<path d="M5 12h14" />);
export const IconPlus = makeIcon(<><path d="M12 5v14" /><path d="M5 12h14" /></>);
export const IconTrash = makeIcon(<><path d="M4 7h16" /><path d="M6 7l1 13h10l1-13" /><path d="M9 7V4h6v3" /></>);
export const IconFilter = makeIcon(<><path d="M4 6h16l-6 7v5l-4-2v-3L4 6Z" /></>);
export const IconCheck = makeIcon(<path d="m5 13 4 4L19 7" />);
export const IconMail = makeIcon(<><path d="M4 6h16v12H4z" /><path d="m4 7 8 6 8-6" /></>);
export const IconPhone = makeIcon(<path d="M7 4h2l2 5-2 1c1.5 3 3.5 5 6 6l1-2 5 2v2c0 1-1 2-2 2C10.9 20 4 13.1 4 5c0-1 1-1 3-1Z" />);
export const IconMapPin = makeIcon(<><path d="M12 21s6-5.4 6-11a6 6 0 0 0-12 0c0 5.6 6 11 6 11Z" /><circle cx="12" cy="10" r="2" /></>);
export const IconClock = makeIcon(<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>);
export const IconSparkle = makeIcon(<><path d="M12 2 13.7 8.3 20 10l-6.3 1.7L12 18l-1.7-6.3L4 10l6.3-1.7L12 2Z" /><path d="M19 16l.8 2.8L22 19l-2.2.6L19 22l-.8-2.4L16 19l2.2-.6L19 16Z" /></>);
export const IconUser = makeIcon(<><circle cx="12" cy="8" r="4" /><path d="M4 20c1.8-4 5.2-6 8-6s6.2 2 8 6" /></>);
export const IconLogIn = makeIcon(<><path d="M10 17 15 12 10 7" /><path d="M15 12H3" /><path d="M21 4v16" /></>);
export const IconLogOut = makeIcon(<><path d="M14 17 19 12 14 7" /><path d="M19 12H7" /><path d="M11 4H5v16h6" /></>);
export const IconLock = makeIcon(<><rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V8a4 4 0 0 1 8 0v2" /></>);
