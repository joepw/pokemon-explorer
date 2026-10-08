"use client";

import Image from "next/image";
import { useState } from "react";

export function Sprite({
  src,
  alt,
  width,
  height,
  fallback,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  fallback: React.ReactNode;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <>{fallback}</>;
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      onError={() => setFailed(true)}
      className="object-contain"
    />
  );
}