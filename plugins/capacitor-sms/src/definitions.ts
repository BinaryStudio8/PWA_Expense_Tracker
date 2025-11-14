import type { PluginListenerHandle } from "@capacitor/core";

export interface SmsMessage {
    body: string;
    sender: string;
}

export interface SmsReceivedEvent {
    detail: string; // raw JSON string from Java
}

export interface SmsPlugin {
    requestPermissions(): Promise<{ granted: boolean }>;

    addListener(
        eventName: "onSMSReceived",
        listener: (data: SmsMessage) => void
    ): Promise<PluginListenerHandle>;
}
