'use client';

import { useCallback, useEffect, useRef } from 'react';

interface CountUpProps {
  to: number;
  from?: number;
  direction?: 'up' | 'down';
  delay?: number;
  duration?: number;
  className?: string;
  startWhen?: boolean;
  separator?: string;
  onStart?: () => void;
  onEnd?: () => void;
}

export default function CountUp({
  to,
  from = 0,
  direction = 'up',
  delay = 0,
  duration = 2,
  className = '',
  startWhen = true,
  separator = '',
  onStart,
  onEnd,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  const getDecimalPlaces = (num: number): number => {
    const str = num.toString();
    if (str.includes('.')) {
      const decimals = str.split('.')[1];
      if (parseInt(decimals) !== 0) return decimals.length;
    }
    return 0;
  };

  const maxDecimals = Math.max(getDecimalPlaces(from), getDecimalPlaces(to));

  const formatValue = useCallback(
    (latest: number) => {
      const hasDecimals = maxDecimals > 0;
      const options: Intl.NumberFormatOptions = {
        useGrouping: !!separator,
        minimumFractionDigits: hasDecimals ? maxDecimals : 0,
        maximumFractionDigits: hasDecimals ? maxDecimals : 0,
      };
      const formatted = Intl.NumberFormat('en-US', options).format(latest);
      return separator ? formatted.replace(/,/g, separator) : formatted;
    },
    [maxDecimals, separator],
  );

  useEffect(() => {
    if (!ref.current || !startWhen) return;
    const el = ref.current;
    const startVal = direction === 'down' ? to : from;
    const endVal = direction === 'down' ? from : to;
    el.textContent = formatValue(startVal);

    let raf = 0;
    let timeout = 0 as unknown as ReturnType<typeof setTimeout>;
    let endTimeout = 0 as unknown as ReturnType<typeof setTimeout>;
    let observer: IntersectionObserver | null = null;

    const animate = () => {
      onStart?.();
      const startTime = performance.now();
      const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
      const tick = (now: number) => {
        const elapsed = (now - startTime) / 1000;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOut(progress);
        const current = startVal + (endVal - startVal) * eased;
        // round to avoid floating drift
        const display = maxDecimals ? Number(current.toFixed(maxDecimals)) : Math.round(current);
        el.textContent = formatValue(display);
        if (progress < 1) raf = requestAnimationFrame(tick);
        else onEnd?.();
      };
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      timeout = setTimeout(animate, delay * 1000) as unknown as ReturnType<typeof setTimeout>;
      if (duration) {
        endTimeout = setTimeout(() => {}, delay * 1000 + duration * 1000) as unknown as ReturnType<typeof setTimeout>;
      }
    };

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          start();
          observer?.disconnect();
        }
      },
      { threshold: 0 },
    );
    observer.observe(el);

    return () => {
      observer?.disconnect();
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
      clearTimeout(endTimeout);
    };
  }, [from, to, direction, delay, duration, startWhen, formatValue, maxDecimals, onStart, onEnd]);

  return <span className={className} ref={ref} />;
}
