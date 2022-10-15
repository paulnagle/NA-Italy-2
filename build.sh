#!/bin/bash

RED='\033[0;31m'  
NC='\033[0m' # No Color

red_text() {
    echo -e "${RED}>>>>>>>>> [${FUNCNAME[1]}] $1${NC}"
}

usage(){
	echo "Usage: -b (Build for browser)"
    echo "       -i (Build for ios)"
    echo "       -a (Build for android)"
    echo "       -c (Clean old build files)"
	exit 1
}

add_plugins() {
    red_text "** Adding cordova plugins"
    ionic cordova plugin add cordova-plugin-splashscreen
    ionic cordova plugin add cordova-plugin-statusbar
    ionic cordova plugin add cordova-plugin-googlemaps
    ionic cordova plugin add com-badrit-base64
    ionic cordova plugin add cordova-plugin-ionic-webview
    ionic cordova plugin add cordova-plugin-inappbrowser
    ionic cordova plugin add cordova-plugin-geolocation
    ionic cordova plugin add cordova-plugin-advanced-http
    ionic cordova plugin add cordova-plugin-androidx-adapter
}

install_deps() {
    red_text "** Installing ionic cli"
    npm update -g --save @ionic/cli @ionic/cordova-builders native-run cordova-res cordova 

    red_text "** Installing other npm dependencies"
    npm update --save \
        @ionic-native/google-maps \
        @ionic-native/base64 \
        @awesome-cordova-plugins/in-app-browser \
        @awesome-cordova-plugins/geolocation  \
        @awesome-cordova-plugins/http  \
        @awesome-cordova-plugins/splash-screen \
        @awesome-cordova-plugins/status-bar \
        @ngx-translate/core \
        @ngx-translate/http-loader \
        @ionic/storage-angular \
        thenby \
        moment \
        moment-timezone

    red_text "** Running npm audit fix"
    npm audit fix
}

clean_old_build() {
    red_text "!! Removing cordova platforms"
    ionic cordova platform rm ios
    ionic cordova platform rm android
    ionic cordova platform rm browser

    red_text "!! Removing cordova plugins"
    ionic cordova plugin rm cordova-plugin-splashscreen
    ionic cordova plugin rm cordova-plugin-statusbar
    ionic cordova plugin rm cordova-plugin-googlemaps
    ionic cordova plugin rm com-badrit-base64
    ionic cordova plugin rm cordova-plugin-ionic-webview
    ionic cordova plugin rm cordova-plugin-inappbrowser
    ionic cordova plugin rm cordova-plugin-geolocation
    ionic cordova plugin rm cordova-plugin-advanced-http
    ionic cordova plugin rm cordova-plugin-androidx-adapter
    red_text "!! Deleting platform folder"
    rm -rf platform
    red_text "!! Deleting node_module folder"
    rm -rf node_modules
    red_text "!! Deleting plugins folder"
    rm -rf plugins
    red_text "!! Deleting www folder"
    rm -rf www
}

build_for() {
    PLATFORM=$1

    red_text ">>>> Building for ${PLATFORM}"
    install_deps
    red_text ">>>> ionic cordova platform add ${PLATFORM} --confirm --no-interactive"
    if [ ${PLATFORM} == "android" ]; then
        ionic cordova platform add android@11 --confirm --no-interactive 
    else
        ionic cordova platform add "${PLATFORM}" --confirm --no-interactive
    fi
    red_text ">>>> add_plugins"
    add_plugins
    # if [[ "${PLATFORM}" != "browser" ]]; then 
    #     echo ">>>> ionic cordova resources ${PLATFORM}"
    #     ionic cordova resources "${PLATFORM}"
    # fi 
    red_text ">>>> ionic cordova prepare ${PLATFORM}"
    ionic cordova prepare "${PLATFORM}" 
    red_text ">>>> ionic cordova build ${PLATFORM}"
    ionic cordova build "${PLATFORM}" 
}

[[ $# -eq 0 ]] && usage
while getopts "abci" option; do
   case $option in
      c) # Clean old build files
         clean_old_build
         ;;
      a) # Build for android
         build_for android
         ;;
      i) # Build for ios
         build_for ios
         ;;
      b) # Build for browser
         build_for browser
         ;;
   esac
done
