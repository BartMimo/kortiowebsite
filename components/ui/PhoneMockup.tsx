interface PhoneMockupProps {
  imgSrc: string;
  alt?: string;
  className?: string;
  eager?: boolean;
}
export function PhoneMockup({
  imgSrc,
  alt = "Kortio app",
  className = "",
  eager = false,
}: PhoneMockupProps) {
  return (
    <div className={`phone-frame ${className}`}>
      <img
        src={imgSrc}
        alt={alt}
        width={720}
        height={1565}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
      />
    </div>
  );
}
