package com.bottomsnode.expensetracker;

import android.os.Bundle;
import java.util.ArrayList;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;

import com.bottomsnode.sms.SmsPlugin;
import com.bottomsnode.sms.SmsReceiver;

public class MainActivity extends BridgeActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Attach bridge to SMS receiver
        SmsReceiver.setBridge(this.bridge);
    }

    @Override
    public void onStart() {
        super.onStart();

        // Register your plugin
        this.init(
            this.getLastNonConfigurationInstance(),
            new ArrayList<Class<? extends Plugin>>() {{
                add(SmsPlugin.class);
            }}
        );
    }
}
