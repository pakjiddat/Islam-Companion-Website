"use strict";

import { HadithNavigator } from './navigator.js';
import { Config } from './configuration.js';
import { NavigatorCommon } from './../common/navigator.js';

/** The Hadith navigator is created after page loads */
window.addEventListener("load", function () {
    /** The Config object is created */
    let config        = new Config();
    /** The navigator configuration is fetched from local browser storage */
    config.GetConfig();
    /** The Hadith Navigator object is created */
    let hadith_nav    = new HadithNavigator(config);
    /** The Hadith Navigator is initialized */
    hadith_nav.Initialize();
});
