/* eslint-disable @typescript-eslint/no-unused-vars */
import { WebPlugin, PluginListenerHandle } from '@capacitor/core';
import type { SmsPlugin, SmsMessage } from './definitions';

export class SmsWeb extends WebPlugin implements SmsPlugin {
    async requestPermissions() {
        console.warn("SMS not supported on web.");
        return { granted: false };
    }

    async addListener(
        _eventName: "onSMSReceived",
        _listener: (sms: SmsMessage) => void
    ): Promise<PluginListenerHandle> {
        console.warn("SMS listener not supported on web.");

        return {
            remove: async () => {
                /* no-op */
            }
        };
    }
}
