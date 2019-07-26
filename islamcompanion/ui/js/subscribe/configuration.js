"use strict";

/** The Config class */
export class Config {

    /** The constructor */
    constructor() {        
        /** The narrator */
        this.narrator         = "Abul A'ala Maududi";
        /** The language */
        this.language         = "Urdu";
        /** The left to right languages */
        this.ltr_langs        = ["Azerbaijani", "Amharic", "Bosnian", "Bengali", "Bulgarian", "Amazigh", "Czech", "German", "Divehi", "Spanish", "English", "French", "Hindi", "Hausa", "Indonesian", "Italian", "Japanese", "Korean", "Malayalam", "Malay", "Dutch", "Norwegian", "Portuguese", "Polish", "Russian", "Romanian", "Swedish", "Somali", "Albanian", "Swahili", "Turkish", "Tajik", "Tamil", "Tatar", "Thai", "Uzbek", "Chinese"];
        /** The right to left languages */
        this.rtl_langs        = ["Arabic", "Azerbaijani", "Persian", "Kurdish", "Sindhi", "Urdu", "Uyghur"];
        /** Indicates if the language is rtl */
        this.is_rtl           = "yes";
    }
    
    /** Fetches the current navigator configuration from local browser storage */
    GetConfig() {
        /** If the language item has not been stored, then function returns */
        if (!localStorage.getItem("qlanguage")) return;

        /** The narrator */
        this.narrator       = localStorage.getItem("narrator");
        /** The language */
        this.language       = localStorage.getItem("qlanguage");
        /** If the language is ltr */
        if (this.ltr_langs.indexOf(this.language) >= 0) {
            /** Indicates that language is ltr */
            this.is_rtl     = "no";
        }
    }
}    
