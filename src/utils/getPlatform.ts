export const getPlatform = (): "ios" | "android" | "desktop" => {
  const ua = navigator.userAgent.toLowerCase();

  const isIOS =
    /iphone|ipad|ipod/.test(ua) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

  if (isIOS) return "ios";

  if (/android/.test(ua)) return "android";

  return "desktop";
};
