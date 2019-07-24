"use strict";

/** The VerseText class */
export class VerseText {

    /** The constructor */
    constructor(configuration) {
        /** The Config object is set as object property */
        this.config = configuration;
    }
        
    /** Used to update the verse text */
    UpdateVerseText () {

        /** The ayat range is set */
        document.getElementById("ayat-range").innerHTML = this.config.start_ayat + " - ";
        document.getElementById("ayat-range").innerHTML += this.config.end_ayat;                
                
        /** The url used to make the request */
        var url        = this.config.site_url + "/api/get_verses";
        /** The parameters for the request */
        var parameters = {
            "start_ayat" : this.config.start_ayat, 
            "end_ayat" : this.config.end_ayat, 
            "sura" : this.config.sura, 
            "language" : this.config.language, 
            "narrator" : this.config.narrator
        }
        /** The common navigator related functions */
        let nav_common = this.config.nav_common;
        /** The callback function */
        let callback   = (response) => {
            /** The callback for formatting the data */
            let format_callback = (text, ayat_count) => {
                /** The callback for formatting the data */
                return this.FormatText(text, ayat_count);
            }
            /** The main navigator text is updated */
            nav_common.UpdateMainText(response, format_callback);
        }
        /** The data is fetched from server and the verse list is updated */
        nav_common.MakeRequest(url, parameters, callback);
    }
    
    /** Used to fetch the meta text for the given ayat */
    GetAyatMeta (ayat_count) {
        /** The currently selected index */
        let index           = document.getElementById("sura-list").selectedIndex;
        /** The current sura text */
        let sura_text       = document.getElementById("sura-list").options[index].text;
        /** The sura text is split on "(" */
        let temp_arr        = sura_text.split("(");
        /** The sura text is set */
        sura_text           = temp_arr[0].trim();
        
        /** The verse meta text */
        let ayat_text       = (this.config.start_ayat*1 + ayat_count);
        ayat_text           = this.config.sura + ":" + ayat_text;
        let verse_meta_text = "(" + sura_text + " " + ayat_text + ")";
                
        return verse_meta_text;
    }
    
    /** Used to format the given text */
    FormatText (text, ayat_count) {
        /** The text template contents are fetched */
        let text_template      = document.getElementById("template-" + this.config.layout).innerHTML;
        /** The verse meta template contents are fetched */
        let meta_template      = document.getElementById("meta-template").innerHTML;
        
        /** The meta text is fetched */
        let meta_text          = this.GetAyatMeta(ayat_count);
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
