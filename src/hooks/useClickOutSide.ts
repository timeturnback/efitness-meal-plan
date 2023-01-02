import { useEffect, useRef } from 'react';

export const useClickOutSide = (handler: () => void) => {
  const menuref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const _handler = (e: any) => {
      const mouse = e || window.event;
      if (mouse.button === 0) {
        const node = menuref.current;
        if (!node?.contains(e.target)) handler();
      }
    };
    document.addEventListener('mousedown', _handler);
    return () => document.addEventListener('mousedown', _handler);
  });
  return menuref;
};
