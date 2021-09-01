import * as React from 'react';
import { useRef } from 'react';

type WheelEventHandler = (e: WheelEvent) => void;

// ================================= Hook =================================
export default function useTouchMove(
  ref: React.RefObject<HTMLDivElement>,
  onOffset: (offsetX: number, offsetY: number) => boolean
) {
  // ========================= Events =========================

  // >>> Wheel event
  const lastWheelDirectionRef = useRef<'x' | 'y'>();

  function onWheel(e: WheelEvent) {
    const { deltaX, deltaY } = e;

    // Convert both to x & y since wheel only happened on PC
    let mixed = 0;
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);
    if (absX === absY) {
      mixed = lastWheelDirectionRef.current === 'x' ? deltaX : deltaY;
    } else if (absX > absY) {
      mixed = deltaX;
      lastWheelDirectionRef.current = 'x';
    } else {
      mixed = deltaY;
      lastWheelDirectionRef.current = 'y';
    }

    if (onOffset(-mixed, -mixed)) {
      e.preventDefault();
    }
  }

  // ========================= Effect =========================
  const touchEventsRef = useRef<{
    onWheel: WheelEventHandler;
  }>(null);

  touchEventsRef.current = { onWheel };

  React.useEffect(() => {
    function onProxyWheel(e: WheelEvent) {
      touchEventsRef.current?.onWheel(e);
    }

    // No need to clean up since element removed
    ref.current?.addEventListener('wheel', onProxyWheel);

    return () => {
      ref.current?.removeEventListener('wheel', onProxyWheel);
    };
  }, []);
}
