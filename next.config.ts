import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // v16 default is [75] only; anything else silently coerces down.
    // 90 is used for a handful of hero/detail shots.
    qualities: [75, 90],
  },
};

export default nextConfig;
