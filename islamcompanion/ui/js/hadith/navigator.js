"use strict";

import { EventHandlers } from './event-handlers.js';
import { BookList } from './components/book-list.js';
import { BookTitleList } from './components/book-title-list.js';
import { HadithText } from './components/hadith-text.js';
import { SourceList } from './components/source-list.js';

/** The Hadith Navigator class */
export class HadithNavigator {

    /** The constructor */
    constructor(configuration) {
        /** The Config object is set as object property */
        this.config         = configuration;    
        /** The event handlers object is created */
        this.event_handlers = new EventHandlers(this, this.config);
    }

    /** Used to initialize the Hadith Navigator */
    Initialize() {
        /** The event handlers are registered */
        this.event_handlers.RegisterEventHandlers();
        /** The navigator is loaded */
        this.LoadNavigator("all");         
    }
    /** Used to load the navigator */
    LoadNavigator(components) {
        /** The common navigator related functions */
        let nav_common      = this.config.nav_common;
        /** The overlay is shown */
        nav_common.ShowOverlay();
        
        /** If the source list needs to be updated */
        if (components.indexOf("all") >=0 || components.indexOf("source") >= 0) {
            /** The SourceList class object is created */
            let sl = new SourceList(this.config);
            /** The source list is updated */
            sl.UpdateSourceList();
        }
        
        /** If the book list needs to be updated */
        if (components.indexOf("all") >=0 || components.indexOf("book") >= 0) {
            /** The BookList class object is created */
            let bl = new BookList(this.config);
            /** The book list is updated */
            bl.UpdateBookList();
        }
        
        /** If the title list needs to be updated */
        if (components.indexOf("all") >=0 || components.indexOf("title") >= 0) {
            /** The BookTitleList class object is created */
            let btl = new BookTitleList(this.config);
            /** The title list is updated */
            btl.UpdateBookTitleList();
        }
        
        /** If the hadith text needs to be updated */
        if (components.indexOf("all") >=0 || components.indexOf("text") >= 0) {
            /** The HadithText class object is created */
            let ht = new HadithText(this, this.config);
            /** The hadith text is updated */
            ht.UpdateHadithText();        
        }       
            
        /** The overlay is hidden */
        nav_common.HideOverlay();
        
        /** The current configuration is saved to local browser storage */
        this.config.SaveConfig();
    }
    
    /** The size of the select boxes is adjusted */
    AdjustSelectBoxSizes() {
        /** The list of select box ids */
        let sbox_ids = Array("source-list", "book-list", "title-list");
        /** The css class for the language */
        let lang_css           = "";
        /** If the css class for the language is present */
        if (this.config.font_classes.indexOf(this.config.language.toLowerCase()) >= 0) {
            /** The css class */
            lang_css           = this.config.language.toLowerCase();
        }
        
        /** If the current language is rtl */
        if (this.config.is_rtl == "yes") {
            /** The rtl-text class is added to the first tab */
            document.getElementById("menu1").classList.add("rtl-text");
        }            
        /** If the language is ltr */
        else {            
            /** The rtl-text class is removed from the first tab */
            document.getElementById("menu1").classList.remove("rtl-text");
        }
        
        /** Each select box id is checked */
        for (let count = 0; count < sbox_ids.length; count++) {
            /** The default css classes for the select box are set */
            document.getElementById(sbox_ids[count]).className = "form-control font-weight-bold";
            /** If the current language is rtl */
            if (this.config.is_rtl == "yes") {
                /** The dropdown css classes are added */
                document.getElementById(sbox_ids[count]).className += " rtl-dropdown dropdown-menu-right";
                /** If the language css is arabic */
                if (lang_css == "arabic")
                    /** The size of select box is set to large */
                    document.getElementById(sbox_ids[count]).className += " custom-select-lg rtl-dropdown-arabic";
                /** If the language css is urdu */
                if (lang_css == "urdu")
                    /** The size of select box is set to medium */
                    document.getElementById(sbox_ids[count]).className += " custom-select-md";
                    
                /** If the language css is not empty, then it is appended to the class name */
                if (lang_css != "")
                    document.getElementById(sbox_ids[count]).className += " " + lang_css;
            }
            /** If the current language is ltr */
            else {
                /** The size of select box is set to small */
                document.getElementById(sbox_ids[count]).className += " custom-select-sm";                
            }                    
        }
    }
}
