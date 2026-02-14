'use client';

import { useRef } from 'react';
import { useScroll, useTransform, MotionValue } from 'framer-motion';

interface ParallaxOptions {
  offset?: number;
  speed?: number;
}

export function useParallax(options: ParallaxOptions = {}) {
  const { offset = 0, speed = 0.5 } = options;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ['start start', 'end center'],
  });

  const y = useTransform(scrollY, (value: number) => value * speed + offset);

  return {
    ref,
    y,
    scrollY,
  };
}
