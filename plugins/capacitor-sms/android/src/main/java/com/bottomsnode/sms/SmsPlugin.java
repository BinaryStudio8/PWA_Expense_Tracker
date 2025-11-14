package com.bottomsnode.sms;

import android.Manifest;
import android.content.pm.PackageManager;

import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.Bridge;
import com.getcapacitor.JSObject;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.PluginMethod;

@CapacitorPlugin(name = "Sms", permissions = {
        Manifest.permission.RECEIVE_SMS,
        Manifest.permission.READ_SMS
})
public class SmsPlugin extends Plugin {

    private static final int SMS_PERMISSION_REQ = 10101;
    private PluginCall savedCall;

    @Override
    public void load() {
        // Attach bridge to Receiver
        SmsReceiver.setBridge(getBridge());
    }

    @PluginMethod
    public void requestPermissions(PluginCall call) {
        savedCall = call;

        boolean receiveGranted = ContextCompat.checkSelfPermission(
            getContext(), Manifest.permission.RECEIVE_SMS
        ) == PackageManager.PERMISSION_GRANTED;

        boolean readGranted = ContextCompat.checkSelfPermission(
            getContext(), Manifest.permission.READ_SMS
        ) == PackageManager.PERMISSION_GRANTED;

        if (receiveGranted && readGranted) {
            JSObject ret = new JSObject();
            ret.put("granted", true);
            call.resolve(ret);
            return;
        }

        // Request missing permissions
        ActivityCompat.requestPermissions(
            getActivity(),
            new String[]{Manifest.permission.RECEIVE_SMS, Manifest.permission.READ_SMS},
            SMS_PERMISSION_REQ
        );
    }

    @Override
    public void handleRequestPermissionsResult(
        int requestCode,
        String[] permissions,
        int[] grantResults
    ) {
        if (savedCall == null) return;

        if (requestCode == SMS_PERMISSION_REQ) {
            boolean granted = grantResults.length > 0 &&
                grantResults[0] == PackageManager.PERMISSION_GRANTED;

            JSObject ret = new JSObject();
            ret.put("granted", granted);
            savedCall.resolve(ret);
        }
    }
}
