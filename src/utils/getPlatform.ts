export const getPlatform = (): "ios" | "android" | "desktop" => {
    const ua = navigator.userAgent.toLowerCase();
    const standalone =
        (window.navigator as any).standalone === true ||
        window.matchMedia("(display-mode: standalone)").matches;

    const isIOS =
        /iphone|ipad|ipod/.test(ua) ||
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

    if (isIOS) return "ios";

    if (/android/.test(ua)) return "android";

    return "desktop";
};
