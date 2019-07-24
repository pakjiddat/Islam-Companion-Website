"use strict";

/** The HadithText class */
export class HadithText {

    /** The constructor */
    constructor(navigator, configuration) {
        /** The Config object is set as object property */
        this.config    = configuration;
        /** The Navigator class object is set as object property */
        this.navigator = navigator;
    }
    
    /** Used to update the Hadith text */
    UpdateHadithText() {
                
        /** The url used to make the request */
        var url        = this.config.site_url + "/api/get_hadith";
        /** The parameters for the request */
        var parameters = {
            "title_id": this.config.title_id, 
            "language": this.config.language
        }                 

        /** The common navigator related functions */
        let nav_common = this.config.nav_common;
        /** The callback function */
        let callback   = (response) => {
            /** The callback for formatting the data */
            let format_callback = (text, index) => {
                /** The callback for formatting the data */
                return this.FormatText(text, index);
            }
            /** The main navigator text is updated */
            nav_common.UpdateMainText(response, format_callback);
            /** The select box sizes is adjusted */
            this.navigator.AdjustSelectBoxSizes();
        }
        /** The data is fetched from server and the verse list is updated */
        nav_common.MakeRequest(url, parameters, callback);
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
        
        /** If the current language is rtl */
        if (this.config.language == "rtl") {
            /** The hadith number is set */
            meta_html          = meta_html.replace("[hadith-number]", "#" + text.number);
        }
        /** If the current language is ltr */
        else {
            /** The hadith number is set */
            meta_html          = meta_html.replace("[hadith-number]", text.number + "#");
        }
        
        /** The meta html is appended to the hadith text */
        hadith_html            += meta_html;        
        
        return hadith_html;
    }
}
