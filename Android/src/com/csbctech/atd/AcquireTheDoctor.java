/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
 */

package com.csbctech.atd;

import android.content.Context;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Bundle;
import android.os.PowerManager;
import android.view.Display;
import android.view.WindowManager;
import android.webkit.WebSettings.RenderPriority;

import org.apache.cordova.*;

public class AcquireTheDoctor extends DroidGap
{
	protected float ORIG_APP_H = 480;
	protected PowerManager.WakeLock mWakeLock;
	
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        
		getWindow().setFlags(
				WindowManager.LayoutParams.FLAG_FULLSCREEN,
				WindowManager.LayoutParams.FLAG_FULLSCREEN
						| WindowManager.LayoutParams.FLAG_FORCE_NOT_FULLSCREEN);

        // Set by <content src="index.html" /> in config.xml
        super.loadUrl(Config.getStartUrl());
		// set some defaults
		this.appView.setBackgroundColor(0x000000);
		this.appView.setHorizontalScrollBarEnabled(false);
		this.appView.setHorizontalScrollbarOverlay(false);
		this.appView.setVerticalScrollBarEnabled(false);
		this.appView.setVerticalScrollbarOverlay(false);

		// get actual screen size
		Display display = ((WindowManager) getSystemService(Context.WINDOW_SERVICE))
				.getDefaultDisplay();
		// int width = display.getWidth();
		int height = display.getHeight();

		// calculate target scale (only dealing with landscape)
		double globalScale = Math.ceil((height / ORIG_APP_H) * 100);

		// set some defaults to the web view
		this.appView.getSettings().setBuiltInZoomControls(false);
		this.appView.getSettings().setSupportZoom(false);
		this.appView.getSettings().setGeolocationEnabled(true);
		this.appView.getSettings().setLightTouchEnabled(true);
		this.appView.getSettings().setRenderPriority(RenderPriority.HIGH);

		// set the scale
		int scale = (int) globalScale;
		scale -= 5;
		this.appView.setInitialScale(scale);

		final PowerManager pm = (PowerManager) getSystemService(Context.POWER_SERVICE);
		this.mWakeLock = pm.newWakeLock(PowerManager.SCREEN_BRIGHT_WAKE_LOCK,
				"atd");
		this.mWakeLock.acquire();
	}

    @Override
    public void onPause(){
    	this.mWakeLock.release();
    	super.onPause();
    }

	public boolean isOnline() {
		ConnectivityManager cm = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);
		NetworkInfo netInfo = cm.getActiveNetworkInfo();
		if (netInfo != null && netInfo.isConnectedOrConnecting()) {
			return true;
		}
		return false;
	}
}