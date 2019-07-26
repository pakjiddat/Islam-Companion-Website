"use strict";

import { Search } from './components/search.js';
import { Subscription } from './../common/subscription.js';
import { CommonEventHandlers } from './../common/event-handlers.js';
import { Utilities } from './../common/utilities.js';

/** The EventHandlers class */
export class EventHandlers extends CommonEventHandlers {

    /** The constructor */
    constructor(navigator, configuration) {
        /** The base class constructor is called */
        super(Search, navigator, configuration);
    }
        
    /** Used to register the event handlers */
    RegisterEventHandlers() {
        /** The event handlers of elements common to quran and hadith navigators are registered */
        this.RegisterCommonEventHandlers();
        /** The source selectbox select handler is registered */
        document.getElementById("source-list").addEventListener("change", () => {this.HandleEvent("source_box");});
        /** The book selectbox select handler is registered */
        document.getElementById("book-list").addEventListener("change", () => {this.HandleEvent("book_box");});
        /** The title selectbox select handler is registered */
        document.getElementById("title-list").addEventListener("change", () => {this.HandleEvent("title_box");});
        /** The language list select handler is registered */
        document.getElementById("language-list").addEventListener("change", () => {this.HandleEvent("language_box");});
        /** If the current language is rtl */
        if (this.config.is_rtl == "yes") {
            /** The row class is replaced with rtl-row class */
            document.getElementById("menu1").classList.remove("row");
            document.getElementById("menu1").classList.add("rtl-row");
        }
    }
     
    /** Used to get the list of components to update depending on the action */
    GetComponentsToUpdate(action) {   
        /** The list of components to update */
        var components            = "";        
        /** If the action is source_box */
        if (action == "source_box") {
            /** The components to update */
            components           = "book,title,text";
        }            
        /** If the action is book_box */
        else if (action == "book_box") {
            /** The components to update */
            components           = "title,text";
        }            
        /** If the action is title_box */
        else if (action == "title_box") {
            /** The components to update */
            components           = "text";
        }
        /** If the action is language_box */
        else if (action == "language_box") {
            /** The components to update */
            components            = "source,book,title,text";
        }
        /** If the action is next, prev or random */
        else if (action == "next" || action == "prev" || action == "random") {
            /** If the current source value is not same as the new source value */
            if (document.getElementById("source-list").value != this.config.source) {
                /** The book and title list components are marked for update */
                components        += ",book,title";
                /** The new source item is selected */
                document.getElementById("source-list").value = this.config.source;
            }
            /** If the current source value is same as the new source value */
            else {
            
                /** An object of Utilities class is created */
                let utilities  = new Utilities();
        
                /** If the new book id is not in select box */
                if (!utilities.IsItemPresent(this.config.book_id, "book-list")) {
                    /** The book and title list components are marked for update */
                    components        += ",book,title";
                }
                /** If the new book id is in select box */
                else {
                    /** If the current book value is not same as the new book value */
                    if (document.getElementById("book-list").value != this.config.book_id) {
                        /** The title list component is marked for update */
                        components        += ",title";
                    }                
                    /** The book list item is selected */
                    document.getElementById("book-list").value = this.config.book_id;
                }
                /** If the new title id is not in select box */
                if (!utilities.IsItemPresent(this.config.title_id, "title-list")) {
                    /** The title list component is marked for update */
                    components        += ",title";
                }
                /** If the current title id is in select box */
                else {
                    /** The title list item is selected */
                    document.getElementById("title-list").value = this.config.title_id;
                }
            }                        
            /** The text component is marked for update */
            components            += ",text";
        }
        /** If the action contains search */
        else if (action.indexOf("search") == 0) {
            /** The search action is handled */
            this.HandleSearch(action);
        }
        
        /** If the action is not a search related action */
        if (action.indexOf("search") < 0) {
            /** The search results header is hidden */
            document.getElementById('search-results-header').style.display = "none";
        }
        
        return components;
    }
    
    /** Used to update the application config with the selected values */
    UpdateAppConfig(action) {
        /** If the action is source_box */
        if (action == "source_box") {
            /** The current hadith source is set to the selected hadith source */
            this.config.source   = document.getElementById("source-list").value;
        }            
        /** If the action is book_box */
        else if (action == "book_box") {
            /** The current hadith book is set to the selected hadith book */
            this.config.book_id  = document.getElementById("book-list").value;
        }            
        /** If the action is title_box */
        else if (action == "title_box") {
            /** The current hadith title is set to the selected hadith title */
            this.config.title_id = document.getElementById("title-list").value;
        }
        /** If the action is language_box */
        else if (action == "language_box") {
            /** The current language is set to the selected language */
            this.config.language  = document.getElementById("language-list").value;
            /** If the language is rtl */
            if (this.config.ltr_langs.indexOf(this.config.language) < 0) {
                /** The language direction is set to rtl */
                this.config.is_rtl = "yes";
            }
            /** The language direction is set to rtl */
            else {
                this.config.is_rtl = "no";
            }
            /** The button event handlers are registered again */
            this.RegisterNextPrevEventHandlers();
        }
    }
    
    /** Used to fetch navigator configuration for the given action */
    HandleEvent(action) {
        /** The action is set */
        this.config.action = action;
        
        /** If the action is subscribe */
        if (action == "subscribe") {
            /** The subscriber is added */
            let subscription      = new Subscription(this.config);
            /** The subscriber is added */
            subscription.AddSubscriber("hadith");
        }
        else {
            /** The url used to make the request */
            var url            = "/api/get_hadith_nav_config";
            /** The app config is updated */
            this.UpdateAppConfig(action);
            /** The parameters for the request */
            var params         = {
                                   "source": this.config.source, 
                                   "book_id": this.config.book_id,
                                   "title_id": this.config.title_id,
                                   "language": this.config.language,
                                   "action": action   
                                 };                              
            /** The ui components are updated */
            this.UpdateUiComponents(url, params, action);
        }            
    }
}
