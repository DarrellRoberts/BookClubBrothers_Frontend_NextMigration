"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const ScrollToTop = () => {
  const router = useRouter();

  // Automatically scrolls to top whenever pathname changes
  useEffect(() => {
    const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  scrollToTop()},
  [router]);
  return null;
}

export default ScrollToTop;