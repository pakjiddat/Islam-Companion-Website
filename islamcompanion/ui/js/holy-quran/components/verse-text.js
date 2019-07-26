"use strict";

import { Utilities } from './../../common/utilities.js';
import { NavigatorCommon } from './../../common/navigator.js';

/** The VerseText class */
export class VerseText {

    /** The constructor */
    constructor(configuration) {
        /** The Config object is set as object property */
        this.config = configuration;
    }
        
    /** Used to update the verse text */
    UpdateVerseText(is_async) {

        /** An object of Utilities class is created */
        let utilities  = new Utilities();
        
        /** The ayat range is set */
        document.getElementById("ayat-range").innerHTML = this.config.start_ayat + " - ";
        document.getElementById("ayat-range").innerHTML += this.config.end_ayat;                
                
        /** The url used to make the request */
        let url        = "/api/get_verses";
        /** The parameters for the request */
        let parameters = {
            "start_ayat" : this.config.start_ayat, 
            "end_ayat" : this.config.end_ayat, 
            "sura" : this.config.sura, 
            "language" : this.config.language, 
            "narrator" : this.config.narrator
        }
        /** The callback function */
        let callback   = (response) => {
            /** The callback for formatting the data */
            let format_callback = (text) => {
                /** The callback for formatting the data */
                return this.FormatText(text);
            }
            
            /** An object of NavigatorCommon class is created */
            let nav_common  = new NavigatorCommon(this.config);
            /** The main navigator text is updated */
            nav_common.UpdateMainText(response, format_callback);
        }
        /** The data is fetched from server and the verse list is updated */
        utilities.MakeRequest(url, parameters, callback, is_async);
    }
    
    /** Used to fetch the meta text for the given ayat */
    GetAyatMeta (text) {
    
        /** The ayat information */
        let ayat_text = text.sura_id + ":" + text.ayat;
        /** The meta text */
        let meta_text = "(" + text.sura_name + " " + ayat_text + ")";
                
        return meta_text;
    }
    
    /** Used to format the given text */
    FormatText (text) {
        /** The text template contents are fetched */
        let text_template      = document.getElementById("template-" + this.config.layout).innerHTML;
        /** The verse meta template contents are fetched */
        let meta_template      = document.getElementById("meta-template").innerHTML;
        
        /** The meta text is fetched */
        let meta_text          = this.GetAyatMeta(text);
        /** The verse meta html */
        let meta_html          = meta_template.replace("[verse-meta]", meta_text);
            
        /** The arabic text is set */
        let verse_html         = text_template;
        /** If the layout is double column */
        if (this.config.layout == "double-column") {                
            /** The arabic text is set */
            verse_html         = verse_html.replace("[arabic-text]", text.arabic_text);
        }

        /** The translated text is set */
        verse_html             = verse_html.replace("[translated-text]", text.translation);
        /** The verse meta data is appended to the translated text */
        verse_html             += meta_html;
                
        return verse_html;
    }
}
