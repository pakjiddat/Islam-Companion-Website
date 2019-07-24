"use strict";

import { HolyQuranNavigator } from './navigator.js';
import { Config } from './configuration.js';
import { NavigatorCommon } from './../common/navigator.js';

/** The Holy Quran navigator is created after page loads */
window.addEventListener("load", function () {
    /** The Config object is created */
    let config        = new Config();
    /** The common navigator related functions */
    let nav_common    = new NavigatorCommon(config);
    /** The nav common object is set */
    config.nav_common = nav_common;
    /** The navigator configuration is fetched from local browser storage */
    config.GetConfig();
    /** The Holy Quran Navigator object is created */
    let holy_quran_navigator = new HolyQuranNavigator(config);
    /** The Holy Quran Navigator is initialized */
    holy_quran_navigator.Initialize();
});
