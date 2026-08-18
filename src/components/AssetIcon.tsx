import type { CSSProperties } from "react";

type AssetIconProps = {
  src: string;
  size?: number;
  slot?: string;
  className?: string;
};

export function AssetIcon({ src, size, slot, className }: AssetIconProps) {
  const classes = ["icon-frame", className].filter(Boolean).join(" ");

  return (
    <span
      className={classes}
      slot={slot}
      style={
        {
          ...(size != null ? { width: size, height: size } : {}),
          "--icon-src": `url("${src}")`,
        } as CSSProperties
      }
    >
      <img src={src} alt="" width={size} height={size} />
    </span>
  );
}
