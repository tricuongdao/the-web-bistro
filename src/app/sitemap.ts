import type { MetadataRoute } from 'next';

const BASE = 'https://the-web-bistro.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE}/`, changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE}/menu`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/work`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/book`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/privacy`, changeFrequency: 'yearly', priority: 0.2 },
  ];
}
