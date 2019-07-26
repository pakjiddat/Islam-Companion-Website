"use strict";

import { Utilities } from './../../common/utilities.js';
import { NavigatorCommon } from './../../common/navigator.js';

/** The HadithText class */
export class HadithText {

    /** The constructor */
    constructor(configuration) {
        /** The Config object is set as object property */
        this.config    = configuration;
    }
    
    /** Used to update the Hadith text */
    UpdateHadithText(is_async) {

        /** An object of Utilities class is created */
        let utilities  = new Utilities();                
        /** The url used to make the request */
        let url        = "/api/get_hadith";
        /** The parameters for the request */
        let parameters = {
            "title_id": this.config.title_id, 
            "language": this.config.language
        }                 
        
        /** The callback function */
        let callback   = (response) => {
            /** The callback for formatting the data */
            let format_callback = (text, index) => {
                /** The callback for formatting the data */
                return this.FormatText(text, index);
            }
            /** An object of NavigatorCommon class is created */
            let nav_common  = new NavigatorCommon(this.config);
            /** The main navigator text is updated */
            nav_common.UpdateMainText(response, format_callback);
            /** The select box sizes is adjusted */
            this.AdjustSelectBoxSizes();
        }
        /** The data is fetched from server and the verse list is updated */
        utilities.MakeRequest(url, parameters, callback, is_async);
    }
    
    /** Used to format the given text */
    FormatText(text, index) {
        /** The name of the text template */
        let template_name      = "template-not-first";
        /** If it is the first hadith */
        if (index == 0) {
            /** The name of the text template */
            template_name      = "template-first";
        }
        /** The text template contents are fetched */
        let text_template      = document.getElementById(template_name).innerHTML;
        /** The verse meta template contents are fetched */
        let meta_template      = document.getElementById("meta-template").innerHTML;
        
        /** The hadith text is set */
        let hadith_html        = text_template.replace("[hadith-text]", text.text);
        /** The hadith title is set */
        hadith_html            = hadith_html.replace("[hadith-title]", text.title);
                
        /** The hadith source is set */
        let meta_html          = meta_template.replace("[hadith-source]", text.source);
        /** The hadith book is set */
        meta_html              = meta_html.replace("[hadith-book]", text.book);
        
        /** If the current language is ltr */
        if (this.config.is_rtl == "no") {
            /** The hadith number is set */
            meta_html          = meta_html.replace("[hadith-number]", "#" + text.number);
        }
        /** If the current language is rtl */
        else {
            /** The hadith number is set */
            meta_html          = meta_html.replace("[hadith-number]", text.number + "#");
        }
        
        /** The meta html is appended to the hadith text */
        hadith_html            += meta_html;        
        
        return hadith_html;
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
