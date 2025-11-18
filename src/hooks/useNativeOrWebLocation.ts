import { useCallback, useEffect, useState } from "react";
import { Geolocation } from "@capacitor/geolocation";

interface Coordinates {
  lat: number;
  lng: number;
}

export const useNativeOrWebLocation = () => {
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isNative = (): boolean => {
    const globalWin = window as any;
    return Boolean(globalWin.Capacitor?.isNativePlatform?.());
  };

  const requestNativePermission = async () => {
    try {
      const perm = await Geolocation.requestPermissions();
      console.log("Location Permission:", perm);

      if (perm.location !== "granted") {
        throw new Error("Location permission denied");
      }
    } catch (e: any) {
      throw new Error("Failed to request location permissions: " + e.message);
    }
  };

  const getLocation = useCallback(async () => {
    try {
      if (isNative()) {
        // 1️⃣ Android requires runtime permission
        await requestNativePermission();

        // 2️⃣ Fetch location
        const coords = await Geolocation.getCurrentPosition({
          enableHighAccuracy: true,
        });

        setLocation({
          lat: coords.coords.latitude,
          lng: coords.coords.longitude,
        });

      } else if ("geolocation" in navigator) {
        // Web fallback
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            setLocation({
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            });
          },
          (err) => setError(err.message),
          { enableHighAccuracy: true }
        );
      } else {
        setError("Geolocation not supported.");
      }
    } catch (e: any) {
      setError(e.message ?? String(e));
    }
  }, []);

  useEffect(() => {
    void getLocation();
  }, [getLocation]);

  return { location, error, refresh: getLocation };
};
