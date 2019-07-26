"use strict";

/** The Config class */
export class Config {

    /** The constructor */
    constructor() {
        /** The Hadith source */
        this.source           = "صحیح بخاری";
        /** The Hadit book id */
        this.book_id          = "87";
        /** The Hadith title id */
        this.title_id         = "1";
        /** The Hadith language */
        this.language         = "Urdu";        
        /** The last action */
        this.action           = "";
        /** The number of search results per page */
        this.results_per_page = 5;
        /** The current search results page number */
        this.page_number      = 1;
        /** The total result count */
        this.result_count     = 0;
        /** Indicates if the language is rtl */
        this.is_rtl           = "yes";
        /** The left to right languages */
        this.ltr_langs        = ["English"];
        /** The right to left languages */
        this.rtl_langs        = ["Arabic", "Urdu"];
        /** The css classes for custom fonts */
        this.font_classes     = ["urdu", "arabic"];
        /** The current layout */
        this.layout           = "single-column";
        /** The current navigator type */
        this.type             = "hadith";
    }
    
    /** Saves the current navigator configuration to local browser storage */
    SaveConfig() {        
        /** The source */
        localStorage.setItem("source", this.source);
        /** The book_id */
        localStorage.setItem("book_id", this.book_id);
        /** The title_id */
        localStorage.setItem("title_id", this.title_id);
        /** The language */
        localStorage.setItem("hlanguage", this.language);
        /** The action */
        localStorage.setItem("action", this.action);
    }
    
    /** Fetches the current navigator configuration from local browser storage */
    GetConfig() {
        /** If the language item has not been stored, then function returns */
        if (!localStorage.getItem("hlanguage")) return;
        
        /** The source */
        this.source   = localStorage.getItem("source");
        /** The book_id */
        this.book_id  = localStorage.getItem("book_id");
        /** The title_id */
        this.title_id = localStorage.getItem("title_id");
        /** The language */
        this.language = localStorage.getItem("hlanguage");
        /** The action */
        this.action   = localStorage.getItem("action");
        /** The language value is set to the language-list select box */
        document.getElementById("language-list").value = this.language;
        /** If the language is ltr */
        if (this.ltr_langs.indexOf(this.language) >= 0) {
            /** Indicates that language is ltr */
            this.is_rtl           = "no";
        } 
    }
}    
