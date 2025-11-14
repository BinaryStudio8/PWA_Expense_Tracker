package com.bottomsnode.sms;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.telephony.SmsMessage;

import com.getcapacitor.Bridge;
import com.getcapacitor.JSObject;

public class SmsReceiver extends BroadcastReceiver {

    public static Bridge bridge;

    public static void setBridge(Bridge b) {
        bridge = b;
    }

    @Override
    public void onReceive(Context context, Intent intent) {
        if (bridge == null) return;

        Bundle extras = intent.getExtras();
        if (extras == null) return;

        Object[] pdus = (Object[]) extras.get("pdus");
        if (pdus == null || pdus.length == 0) return;

        String format = extras.getString("format");
        StringBuilder fullBody = new StringBuilder();
        String sender = null;

        // Combine multipart SMS segments
        for (Object pdu : pdus) {
            SmsMessage sms;
            if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.M) {
                sms = SmsMessage.createFromPdu((byte[]) pdu, format);
            } else {
                sms = SmsMessage.createFromPdu((byte[]) pdu);
            }

            if (sms == null) continue;

            if (sender == null) {
                sender = sms.getOriginatingAddress();
            }

            fullBody.append(sms.getMessageBody());
        }

        // Build payload
        JSObject data = new JSObject();
        data.put("body", fullBody.toString());
        data.put("sender", sender != null ? sender : "unknown");

        bridge.triggerWindowJSEvent("onSMSReceived", data.toString());
    }
}
