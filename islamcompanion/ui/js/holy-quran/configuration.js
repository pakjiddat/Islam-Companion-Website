"use strict";

/** The Config class */
export class Config {

    /** The constructor */
    constructor() {
        /** The division */
        this.division         = "ruku";
        /** The division number */
        this.div_num          = "1";
        /** The current sura ruku id */
        this.sura_ruku        = "1";
        /** The current sura id */
        this.sura             = "1";
        /** The narrator */
        this.narrator         = "Abul A'ala Maududi";
        /** The language */
        this.language         = "Urdu";
        /** The division information */
        this.divisions        = {hizb: 240, juz: 30, manzil: 7, page: 604, ruku: 556}
        /** The start sura ayat */
        this.start_ayat       = "1";
        /** The end sura ayat */
        this.end_ayat         = "7";
        /** The last action */
        this.action           = "";
        /** The audio file base name */
        this.audiofile        = "fatiha";
        /** The left to right languages */
        this.ltr_langs        = ["Azerbaijani", "Amharic", "Bosnian", "Bengali", "Bulgarian", "Amazigh", "Czech", "German", "Divehi", "Spanish", "English", "French", "Hindi", "Hausa", "Indonesian", "Italian", "Japanese", "Korean", "Malayalam", "Malay", "Dutch", "Norwegian", "Portuguese", "Polish", "Russian", "Romanian", "Swedish", "Somali", "Albanian", "Swahili", "Turkish", "Tajik", "Tamil", "Tatar", "Thai", "Uzbek", "Chinese"];
        /** The right to left languages */
        this.rtl_langs        = ["Arabic", "Azerbaijani", "Persian", "Kurdish", "Sindhi", "Urdu", "Uyghur"];
        /** The css classes for custom fonts */
        this.font_classes     = ["urdu", "arabic", "bengali", "malayalam", "tamil", "devehi", "hindi", "korean", "tamil", "persian", "thai"];
        /** The current layout */
        this.layout           = "single-column";
        /** The number of search results per page */
        this.results_per_page = 10;
        /** The current search results page number */
        this.page_number      = 1;
        /** The total result count */
        this.result_count     = 0;
        /** Indicates if the language is rtl */
        this.is_rtl           = "yes";
        /** The current navigator type */
        this.type             = "quran";
    }
    
    /** Saves the current navigator configuration to local browser storage */
    SaveConfig() {        
        /** The division */
        localStorage.setItem("division", this.division);
        /** The division number */
        localStorage.setItem("div_num", this.div_num);
        /** The current sura ruku id */
        localStorage.setItem("sura_ruku", this.sura_ruku);
        /** The current sura id */
        localStorage.setItem("sura", this.sura);
        /** The narrator */
        localStorage.setItem("narrator", this.narrator);
        /** The language */
        localStorage.setItem("qlanguage", this.language);
        /** The start sura ayat */
        localStorage.setItem("start_ayat", this.start_ayat);
        /** The end sura ayat */
        localStorage.setItem("end_ayat", this.end_ayat);
        /** The last action */
        localStorage.setItem("action", this.action);
        /** The audio file base name */
        localStorage.setItem("audiofile", this.audiofile);
        /** The layout */
        localStorage.setItem("layout", this.layout);
    }
    
    /** Fetches the current navigator configuration from local browser storage */
    GetConfig() {
        /** If the language item has not been stored, then function returns */
        if (!localStorage.getItem("qlanguage")) return;
        
        /** The division */
        this.division       = localStorage.getItem("division");
        /** The division number */
        this.div_num        = localStorage.getItem("div_num");
        /** The current sura ruku id */
        this.sura_ruku      = localStorage.getItem("sura_ruku");
        /** The current sura id */
        this.sura           = localStorage.getItem("sura");
        /** The narrator */
        this.narrator       = localStorage.getItem("narrator");
        /** The language */
        this.language       = localStorage.getItem("qlanguage");
        /** The start sura ayat */
        this.start_ayat     = localStorage.getItem("start_ayat");
        /** The end sura ayat */
        this.end_ayat       = localStorage.getItem("end_ayat");
        /** The last action */
        this.action         = localStorage.getItem("action");
        /** The audio file base name */
        this.audiofile      = localStorage.getItem("audiofile");
        /** The layout */
        this.layout         = localStorage.getItem("layout");
        /** If the language is ltr */
        if (this.ltr_langs.indexOf(this.language) >= 0) {
            /** Indicates that language is ltr */
            this.is_rtl     = "no";
        }
        /** The current division is selected */
        document.getElementById("division-list").value = this.division;
    }
}    
