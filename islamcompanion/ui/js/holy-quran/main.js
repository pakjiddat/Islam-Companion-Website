"use strict";

import { HolyQuranNavigator } from './navigator.js';
import { Config } from './configuration.js';

/** The Holy Quran navigator is created after page loads */
window.addEventListener("load", function () {
    /** The Config object is created */
    let config        = new Config();
    /** The navigator configuration is fetched from local browser storage */
    config.GetConfig();
    /** The Holy Quran Navigator object is created */
    let quran_nav     = new HolyQuranNavigator(config);
    /** The Holy Quran Navigator is initialized */
    quran_nav.Initialize();
});
