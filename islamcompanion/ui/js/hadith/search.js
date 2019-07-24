"use strict";

import { HadithNavigator } from './navigator.js';

/** The Search class */
export class Search {

    /** The constructor */
    constructor(event_handlers, configuration) {
        /** The Config object is set as object property */
        this.config = configuration;
        /** The EventHandlers class object is set as object propery */
        this.event_handlers = event_handlers;
    }
    
    /** Used to search the verse text */
    SearchText() {    
        /** The url used to make the request */
        var url        = this.config.site_url + "/api/search_hadith";
        /** The parameters for the request */
        var parameters = {
            "is_random" : "no",
            "language" : this.config.language,
            "page_number" : this.config.page_number,
            "results_per_page" : this.config.results_per_page,
            "search_text" : document.getElementById("search-text").value
        }
        
        /** The common navigator related functions */
        let nav_common = this.config.nav_common;
        /** The callback function */
        let callback   = (response) => {
            /** The callback for formatting the data */
            let format_callback = (text) => {
                /** The callback for formatting the data */
                return this.FormatText(text);
            }
            /** The main navigator text is updated */
            nav_common.UpdateSearchText(response, format_callback);
            /** If the current action is search, then search element event handlers are registered */
            if (this.config.action == "search") {
                /** The language direction */
                let lang_dir         = (this.config.is_rtl == "yes") ? "rtl" : "ltr";
                /** The event handlers for search result controls are registered */
                this.event_handlers.RegisterSearchEventHandlers(lang_dir);
            }
        }
        /** The data is fetched from server and the verse list is updated */
        nav_common.MakeRequest(url, parameters, callback);
    }
    
    /** Used to format the given text */
    FormatText (text) {
        /** An object of Navigator class is created */
        let hadith_nav       = new HadithNavigator(this.config);
        /** The search words */
        let search_words     = document.getElementById("search-text").value;
        /** The highlighted text */
        let highlighted_text = "<span class='highlighted-text'>" + search_words + "</span>";  
        /** The regular expression for finding the search words */
        let regex            = new RegExp(search_words, "gi");
        
        /** The text is formatted */
        text                 = hadith_nav.FormatText(text);        
        /** The text is updated so the search words are highlighted */
        text                 = text.replace(regex, highlighted_text);
        
        return text;
    }      
}
