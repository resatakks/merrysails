'use client';
import { useEffect } from 'react';
import { onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals';

const send = (metric: any) => {
  if (typeof window === 'undefined') return;
  if ((window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: 'web_vital',
      metric_name: metric.name,
      metric_value: Math.round(metric.value),
      metric_id: metric.id,
      metric_rating: metric.rating,
      page_path: window.location.pathname,
    });
  }
  if (typeof (window as any).gtag === 'function') {
    (window as any).gtag('event', 'web_vital', {
      event_category: 'Web Vitals',
      event_label: metric.name,
      value: Math.round(metric.value),
      non_interaction: true,
      metric_rating: metric.rating,
    });
  }
};

export default function WebVitalsReporter() {
  useEffect(() => {
    onCLS(send);
    onFCP(send);
    onINP(send);
    onLCP(send);
    onTTFB(send);
  }, []);
  return null;
}
