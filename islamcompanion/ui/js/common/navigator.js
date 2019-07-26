"use strict";

import { Utilities } from './../common/utilities.js';

/** The Navigator class */
export class NavigatorCommon {

    /** The constructor */
    constructor(configuration) {
        /** The Config object is set as object property */
        this.config = configuration;
    }
    
    /** Used to update the main text */
    UpdateMainText(response, format_callback) {
        /** The response is json decoded */
        response               = JSON.parse(response);
        /** The text area is emptied */
        document.getElementById("navigator-text").innerHTML = "";
        /** The text list css class */
        let text_class         = "ltr-list";
        /** The language direction */
        let lang_dir           = "ltr";
        /** If the language is rtl or layout is double column */
        if (this.config.is_rtl == "yes" || this.config.layout == "double-column") {
            /** The verse text list css class */
            text_class = "rtl-list";
            /** The language direction */
            lang_dir   = "rtl";
        }
        /** The css class for the language */
        let lang_css           = "";
        /** If the css class for the language is present */
        if (this.config.font_classes.indexOf(this.config.language.toLowerCase()) >= 0) {
            /** The css class */
            lang_css           = this.config.language.toLowerCase();
        }
            
        /** The css class for the verse text container */
        document.getElementById("navigator-text").className = text_class;      
            
        /** Each text item is appended to the list */
        for (let count = 0; count < response.length; count++) {
            /** The text object */
            let text               = response[count];            
            /** The main text is formatted */
            let text_html          = format_callback(text, count);
            /** The css class for verse template is set */
            text_html              = text_html.replace(/\[lang\-css\]/g, lang_css);
            /** The css class for language direction is set */
            text_html              = text_html.replace(/\[lang\-dir\]/g, lang_dir);      
            /** If the language is ltr */
            if (lang_dir == "ltr") {
                /** The numbering is added to the ltr text */
                text_html = text_html.replace("[index]", (count +1) + ". ");
                /** If the search section exists */
                if (document.getElementById("search-section")) {
                    /** The right alignment is removed */
                    document.getElementById("search-section").classList        = "col-lg-6 float-left";
                    /** The search results header is floated right */
                    document.getElementById("search-results-header").classList = "col-lg-6 form-inline float-right";
                }
            }
            /** If the language is rtl */
            else {
                /** The numbering placeholder is removed from rtl text */
                text_html = text_html.replace("[index]", "");
                /** If the search section exists */
                if (document.getElementById("search-section")) {
                    /** The search section is right aligned */
                    document.getElementById("search-section").classList        = "col-lg-6 float-right rtl-search";
                    /** If the css class for the current language exists */
                    if (lang_css != "") {
                        /** The language css class is added */
                        document.getElementById("search-section").classList.add(lang_css);
                    }
                    /** The search results header is floated left */
                    document.getElementById("search-results-header").classList = "col-lg-6 form-inline float-left";
                }
            }
            /** The list element is created */
            let list_item          = document.createElement("li");
            /** The html for the list item is set */
            list_item.innerHTML    = text_html;
            /** The verse html is appended to the verse list */
            document.getElementById("navigator-text").appendChild(list_item);
        }
    }
    
    /** The search results header is updated */
    UpdateSearchHeader() {
        /** The total number of pages */
        let page_count     = Math.ceil(this.config.result_count / this.config.results_per_page);
        /** The search results numbering is set */
        document.getElementById("page-list").value = this.config.page_number;        
        /** The start number for the search results */
        let start             = ((this.config.page_number-1) * this.config.results_per_page) + 1;
        /** The search results numbering is set */
        document.getElementById("navigator-text").setAttribute("start", start);
                    
        /** The next button id */
        let next_btn_id    = "next-page";
        /** The prev button id */
        let prev_btn_id    = "prev-page"; 
        
        /** If the language is rtl */
        if (this.config.is_rtl == "yes") {
            /** The next button id */
            next_btn_id = "prev-page";
            /** The prev button id */
            prev_btn_id = "next-page";            
        }
        
        /** If there is one search result */
        if (page_count == 1) {
            /** The next page button is hidden */
            document.getElementById(next_btn_id).classList.add("d-none");
            /** The prev page button is hidden */
            document.getElementById(prev_btn_id).classList.add("d-none");
        }
        /** If there are more than one search result */
        else {
            /** If the current page number is 1 */
            if (this.config.page_number == 1) {
                /** The prev page button is hidden */
                document.getElementById(prev_btn_id).classList.add("d-none");
            }
            else {
                /** The prev page button is shown */
                document.getElementById(prev_btn_id).classList.remove("d-none");
            }
            /** If the current page number is equal to total number of pages */
            if (this.config.page_number == page_count) {
                /** The next page button is hidden */
                document.getElementById(next_btn_id).classList.add("d-none");
            }
            else {
                /** The next page button is shown */
                document.getElementById(next_btn_id).classList.remove("d-none");
            }
        }
    }
    
    /** Used to update the search text */
    UpdateSearchText(response, format_callback) {
        
        /** An object of Utilities class is created */
        let utilities             = new Utilities();
        
        /** The response is json decoded */
        response                  = JSON.parse(response);
        
        /** The temporary container */
        let tcontainer            = document.getElementById("temp-container");                      
        /** The result count is copied to app this.config */
        this.config.result_count  = response.result_count;        
                    
        /** The search results are json encoded */
        let search_results        = JSON.stringify(response.search_results);
        /** The main text is updated */
        this.UpdateMainText(search_results, format_callback);        
        
        /** If the current action is not search, then function returns */
        if (this.config.action != "search") {
            /** The search results header is updated */
            this.UpdateSearchHeader();
            /** The function returns */
            return;
        }            

        /** The search results header is set to empty */
        document.getElementById("search-results-header").innerHTML = "";                    
        /** If no search results were returned, then message is shown to the user */
        if (response.result_count == "0") {
            /** The search heading is set */
            tcontainer.innerHTML  = "<h2 id='no-results'>No results were found !</h2>";
            /** The search results header html is set */
            document.getElementById("search-results-header").innerHTML = tcontainer.innerHTML;
            /** The contents of temporary container are set to empty */
            tcontainer.innerHTML  = "";            
        }
        /** If search results were found, then inner html of temp container is set */
        else {
            /** The search heading is set */
            tcontainer.innerHTML  = document.getElementById("search-heading-template").innerHTML;
            /** The total number of pages */
            let page_count        = Math.ceil(this.config.result_count / this.config.results_per_page);
            /** The search template is updated */
            tcontainer.innerHTML  = tcontainer.innerHTML.replace("[page_count]", page_count);            
            /** The page number list is set */
            let page_list         = utilities.Range(1, page_count);
            /** The current page number is set */
            utilities.PopulateSelectBox("page-list", page_list, this.config.page_number, null);
            /** The search results header html is set */
            document.getElementById("search-results-header").innerHTML = tcontainer.innerHTML;
            /** The contents of temporary container are set to empty */
            tcontainer.innerHTML  = "";
            /** The search results header is updated */
            this.UpdateSearchHeader();
        }        
    }    
}
