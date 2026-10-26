import { Download } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { PLAY_STORE_URL } from "../../lib/seo";
interface StoreProps {
  className?: string;
  theme?: "dark" | "light";
  onClick?: () => void;
}
function track(platform: "ios" | "android") {
  void Promise.resolve(
    supabase.from("app_downloads").insert({ platform }),
  ).catch(() => {});
}
export function AppStoreButton({
  className = "",
  theme = "dark",
  onClick,
}: StoreProps) {
  return (
    <a
      href="https://apps.apple.com/nl/app/kortio-kortingscodes-deals/id6758350707"
      target="_blank"
      rel="noopener noreferrer"
      className={`store-button ${theme === "light" ? "store-light" : ""} ${className}`}
      aria-label="Download Kortio in de App Store"
      onClick={() => {
        track("ios");
        onClick?.();
      }}
    >
      <svg aria-hidden="true" viewBox="0 0 384 512" fill="currentColor">
        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 46.9 126.7 89.8 126.7 19 0 25.4-11.9 65.5-11.9 39.3 0 49.3 11.9 66.8 11.9 45 0 71.7-80.1 82.5-111.8-46-17-64.3-51.2-64.3-100.9zM205.8 88.3c18.5-27.6 25.1-59.5 22.1-88.3-25.5 0-57.4 16.6-77.9 44-16.1 21.6-26.6 57.7-22.1 86.1 27.6 1.4 56.6-17.1 77.9-41.8z" />
      </svg>
      <span>
        <small>Download in de</small>
        <strong>App Store</strong>
      </span>
    </a>
  );
}
export function PlayStoreButton({ className = "", onClick }: StoreProps) {
  return (
    <a
      href={PLAY_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`store-button android ${className}`}
      aria-label="Download Kortio op Google Play"
      onClick={() => {
        track("android");
        onClick?.();
      }}
    >
      <Download aria-hidden="true" />
      <span>
        <small>Ontdek het op</small>
        <strong>Google Play</strong>
      </span>
    </a>
  );
}
