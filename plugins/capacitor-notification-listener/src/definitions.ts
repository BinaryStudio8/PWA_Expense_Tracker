import type { PluginListenerHandle } from "@capacitor/core";

export interface NotificationData {
  packageName: string;
  title?: string;
  text?: string;
  postTime?: number;
}

export interface NotificationListenerPlugin {
  requestPermission(): Promise<{ granted: boolean }>;
  addListener(
    eventName: "notificationReceived",
    listenerFunc: (data: NotificationData) => void,
  ): Promise<PluginListenerHandle>;
}
