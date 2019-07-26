"use strict";

import { Utilities } from './utilities.js';

/** The CommonEventHandlers class */
export class CommonEventHandlers {

    /** The constructor */
    constructor(SearchClass, navigator, configuration) {
        
        /** The Config object is set as object property */
        this.config    = configuration;
        /** The Navigator object is set as object property */
        this.navigator = navigator;
        /** The Search object is created and set as object property */            
        this.search    = new SearchClass(this, this.config);
    }
        
    /** Used to register the event handlers for elements common to holy quran and hadith navigators */
    RegisterCommonEventHandlers() {
        
        /** The event handlers for next/prev buttons are registered */
        this.RegisterNextPrevEventHandlers();            
        /** The random button click handler is registered */
        document.getElementById("random").addEventListener("click", () => {this.HandleEvent("random");});        
        /** The search button click handler is registered */
        document.getElementById("search-btn").addEventListener("click", () => {this.HandleEvent("search");});
        /** The search text box key handler is registered */
        document.getElementById("search-text").addEventListener("keypress", (event) => {if (event.keyCode == 13)this.HandleEvent("search");});
        /** The email text box key handler is registered */
        document.getElementById("email-address").addEventListener("keypress", (event) => {if (event.keyCode == 13)this.HandleEvent("subscribe");});
        /** The email button click handler is registered */
        document.getElementById("subscribe-btn").addEventListener("click", () => {this.HandleEvent("subscribe");});
        /** The tab click event is registered */
        $('.nav-tabs a').on('shown.bs.tab', (event) => {
            /** The text of the active tab */
            var x = $(event.target).text();
            /** If the active tab is Search or Navigation and current navigator is hadith */
            if (x == "Search" || (x == "Navigation" && this.config.type == "hadith")) {
                /** The href attribute is fetched */
                let href = $(event.target).attr("href").replace("#", "");
                /** If the current language is rtl */
                if (this.config.is_rtl == "yes") {
                    /** The row class is replaced with rtl-row class */
                    document.getElementById(href).classList.remove("row");
                    document.getElementById(href).classList.add("rtl-row");
                }
                /** If the current language is ltr */
                else {
                    /** The rtl-row class is replaced with row class */
                    document.getElementById(href).classList.remove("rtl-row");
                    document.getElementById(href).classList.add("row");
                }
            }
        });
    }
    
    /** Used to register event handlers for next, previous buttons */
    RegisterNextPrevEventHandlers() {
    
        /** The title of the button */
        let btn_title = "";
        /** If the navigator type is hadith */
        if (this.config.type == "hadith")
            btn_title = " Hadith";
        else
            btn_title = " Ruku";
        
        /** The event listners are removed */
        document.getElementById("next").outerHTML = document.getElementById("next").outerHTML;
        /** The event listners are removed */
        document.getElementById("prev").outerHTML = document.getElementById("prev").outerHTML;
        
        /** If the language direction is ltr */
        if (this.config.is_rtl == "no") {  
            /** The next button click handler is registered */
            document.getElementById("next").addEventListener("click", () => {this.HandleEvent("prev");});
            /** The prev button click handler is registered */
            document.getElementById("prev").addEventListener("click", () => {this.HandleEvent("next");});
            /** The next button title is set to "Previous" */
            document.getElementById("next").title = "Previous" + btn_title;
            /** The previous button title is set to "Next" */
            document.getElementById("prev").title = "Next" + btn_title;
        }
        /** If the language direction is rtl */
        else {                            
            /** The next button click handler is registered */
            document.getElementById("next").addEventListener("click", () => {this.HandleEvent("next");});
            /** The prev button click handler is registered */
            document.getElementById("prev").addEventListener("click", () => {this.HandleEvent("prev");});
            /** The next button title is set to "Next" */
            document.getElementById("next").title = "Next" + btn_title;
            /** The previous button title is set to "Previous" */
            document.getElementById("prev").title = "Previous" + btn_title;
        }
    }
    
    /** Used to register event handlers for next, previous and page list controls */
    RegisterSearchEventHandlers(lang_dir) {
        
        /** If the language direction is ltr */
        if (lang_dir == "ltr") {
            /** The next page button click handler is registered */
            document.getElementById("next-page").addEventListener("click", () => {this.HandleEvent("search_next");});
            /** The prev page button click handler is registered */
            document.getElementById("prev-page").addEventListener("click", () => {this.HandleEvent("search_prev");});
            /** The page list select handler is registered */
            document.getElementById("page-list").addEventListener("change", () => {this.HandleEvent("search_page");});
            
            /** The next button title is set to "Next Page" */
            document.getElementById("next-page").title = "Next Page";
            /** The previous button title is set to "Previous Page" */
            document.getElementById("prev-page").title = "Previous Page";
        }
        /** If the language direction is rtl */
        else if (lang_dir == "rtl") {
            /** The next page button click handler is registered */
            document.getElementById("next-page").addEventListener("click", () => {this.HandleEvent("search_prev");});
            /** The prev page button click handler is registered */
            document.getElementById("prev-page").addEventListener("click", () => {this.HandleEvent("search_next");});
            /** The page list select handler is registered */
            document.getElementById("page-list").addEventListener("change", () => {this.HandleEvent("search_page");}); 
            
            /** The next button title is set to "Previous Page" */
            document.getElementById("next-page").title = "Previous Page";
            /** The previous button title is set to "Next Page" */
            document.getElementById("prev-page").title = "Next Page";
        }
    }
    
    /** Used the handle the search action */
    HandleSearch(action) {    
        
        /** If the search box has some text */
        if (document.getElementById('search-text').value != '') {
            /** The total number of pages */
            let page_count = Math.ceil(this.config.result_count / this.config.results_per_page);
            /** If the action is search_next and current page number is less than page count */
            if (action == "search_next" && this.config.page_number < page_count) {
                /** The page number is increased by 1 */
                this.config.page_number++;
            }
            /** If the action is search_prev and current page number is more than 1 */
            else if (action == "search_prev" && this.config.page_number > 1) {
                /** The page number is decreased by 1 */
                this.config.page_number--;
            }
            /** If the action is search_page */
            else if (action == "search_page") {
                /** The page number is set to the selected page */
                this.config.page_number = document.getElementById("page-list").value;
            }
            /** If the action is search */
            if (action == "search") {
                /** The page number is set to 1 */
                this.config.page_number = "1";
            }
            /** The search results header is shown */
            document.getElementById('search-results-header').style.display = "block";
            /** The verses are searched */
            this.search.SearchText();
            /** The function returns */
            return;
        }
        /** If the search box has no text */
        else {
            /** An alert message is shown */
            alert("Please enter search text");
        }    
    }
        
    /** Used to fetch navigator configuration */
    UpdateUiComponents(url, params, action) {        
        
        /** The callback for updating the Holy Quran Navigator configuration */
        let success = (response) => {
            /** The response is json decoded */
            response           = JSON.parse(response);
            /** The values in the response are copied to the navigator configuration */
            Object.assign(this.config, response);
            /** The list of components to update */
            let components     = this.GetComponentsToUpdate(action);
            /** The navigator is reloaded with the updated configuration data */
            this.navigator.LoadNavigator(components);
        }

        /** An object of Utilities class is created */
        let utilities = new Utilities();
        /** The navigator configuration is fetched from server and the ui components are updated */
        utilities.MakeRequest(url, params, success);
    }
}
