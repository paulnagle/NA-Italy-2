#!/bin/bash
if [ -z "$1" ]
then
    rm -rf www

    # ionic cordova platform rm ios
    ionic cordova platform rm android

    ionic cordova plugin rm cordova-plugin-inappbrowser
    ionic cordova plugin rm cordova-plugin-splashscreen
    ionic cordova plugin rm cordova-plugin-statusbar
    ionic cordova plugin rm cordova-plugin-whitelist
    ionic cordova plugin rm cordova-plugin-googlemaps
    ionic cordova plugin rm cordova-plugin-advanced-http
    ionic cordova plugin rm com-badrit-base64

    rm -rf platform/*

    # ionic cordova platform add ios@latest
    ionic cordova platform add android@latest

    ionic cordova plugin add cordova-plugin-inappbrowser
    ionic cordova plugin add cordova-plugin-splashscreen
    ionic cordova plugin add cordova-plugin-statusbar
    ionic cordova plugin add cordova-plugin-whitelist
    ionic cordova plugin add https://github.com/mapsplugin/cordova-plugin-googlemaps.git#multiple_maps  --variable API_KEY_FOR_ANDROID="AIzaSyA-BELBbbsJnG41sViw4Ve0A1CVxO757Xc" --variable API_KEY_FOR_IOS="AIzaSyA-BELBbbsJnG41sViw4Ve0A1CVxO757Xc"
    ionic cordova plugin add cordova-plugin-advanced-http
    ionic cordova plugin add com-badrit-base64
fi

# ionic cordova prepare ios --prod
ionic cordova prepare android --prod 

#ionic cordova resources ios
# ionic cordova resources android

#ionic build --prod  --minifyjs   --minifycss  --optimizejs
