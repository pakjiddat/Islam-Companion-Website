"use strict";

import { Search } from './components/search.js';
import { Subscription } from './../common/subscription.js';
import { CommonEventHandlers } from './../common/event-handlers.js';

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
            
        /** The division number list select handler is registered */
        document.getElementById("division-number-list").addEventListener("change", () =>  {this.HandleEvent("div_num_box");});
        /** The ruku list select handler is registered */
        document.getElementById("ruku-list").addEventListener("change", () => {this.HandleEvent("ruku_box");});
        /** The sura list select handler is registered */
        document.getElementById("sura-list").addEventListener("change", () => {this.HandleEvent("sura_box");});
        /** The language list select handler is registered */
        document.getElementById("language-list").addEventListener("change", () => {this.HandleEvent("language_box");});
        /** The narrator list select handler is registered */
        document.getElementById("narrator-list").addEventListener("change", () => {this.HandleEvent("narrator_box");});
        /** The division list select handler is registered */
        document.getElementById("division-list").addEventListener("change", () => {this.HandleEvent("division_box");});
        /** The layout list select handler is registered */
        document.getElementById("layout-list").addEventListener("change", () => {this.HandleEvent("layout_box");});
    }
    
    /** Used to get the list of components to update depending on the action */
    GetComponentsToUpdate(action) {   
        /** The list of components to update */
        var components                   = "";
        /** If the action is div_num_box */
        if (action == "div_num_box") {
            /** The components to update */
            components            = "sura,ruku,verse";
        }            
        /** If the action is ruku_box */
        else if (action == "ruku_box") {
            /** The components to update */
            components            = "verse";
        }
        /** If the action is sura_box */
        else if (action == "sura_box") {
            /** The components to update */
            components            = "ruku,verse";
        }
        /** If the action is language_box */
        else if (action == "language_box") {
            /** The narrator list box is updated */
            this.navigator.LoadNavigator("narrator");
            /** The components to update */
            components            = "verse";
        }
        /** If the action is narrator_box */
        else if (action == "narrator_box") {
            /** The components to update */
            components            = "verse";
        }
        /** If the action is division_box */
        else if (action == "division_box") {
            /** The components to update */
            components            = "division,verse";
        }
        /** If the action is layout_box */
        else if (action == "layout_box") {
            /** The components to update */
            components          = "verse";
        }        
        /** If the action is next, prev or random */
        else if (action == "next" || action == "prev" || action == "random") {
            /** If the new division is not same as current division and the division is not ruku */
            if (document.getElementById('division-number-list').value != this.config.div_num
               && this.config.division != "ruku"
            ) {
                /** The division number list value is set to the new division */
                document.getElementById('division-number-list').value = this.config.div_num;
            }
            /** If the new sura is not in the sura list */
            if (!this.config.nav_common.IsItemPresent(this.config.sura, "sura-list")) {
                /** The sura list is marked for update */
                components          += ",sura";
            }
            /** If the new sura is present in the sura list */
            else {
                /** If the new sura value is not same as current sura value */
                if (document.getElementById('sura-list').value != this.config.sura) {
                    /** The ruku list component is marked for update */
                    components          += ",ruku";
                    /** The sura list value is set to the new sura */
                    document.getElementById('sura-list').value = this.config.sura;
                }                
            }
            
            /** If the new ruku is not in the ruku list */
            if (!this.config.nav_common.IsItemPresent(this.config.sura_ruku, "ruku-list")) {
                /** The ruku list is marked for update */
                components          += ",ruku";
            }
            /** If the new ruku is present in the ruku list */
            else {
                /** The ruku list value is set to the new ruku */
                document.getElementById('ruku-list').value = this.config.sura_ruku;
            }
            
            /** The components to update */
            components          += "verse";
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
        /** If the action is div_num_box */
        if (action == "div_num_box") {
            /** The current division number is set to the selected division number */
            this.config.div_num   = document.getElementById("division-number-list").value;
        }            
        /** If the action is ruku_box */
        else if (action == "ruku_box") {
            /** The current ruku number is set to the selected ruku number */
            this.config.sura_ruku = document.getElementById("ruku-list").value;
        }
        /** If the action is sura_box */
        else if (action == "sura_box") {
            /** The current sura number is set to the selected sura number */
            this.config.sura      = document.getElementById("sura-list").value;
        }
        /** If the action is language_box */
        else if (action == "language_box") {
            /** The current language is set to the selected language */
            this.config.language  = document.getElementById("language-list").value;
            /** The current narrator is set to the selected narrator */
            this.config.narrator  = document.getElementById("narrator-list").value;
        }
        /** If the action is narrator_box */
        else if (action == "narrator_box") {
            /** The current narrator is set to the selected narrator */
            this.config.narrator  = document.getElementById("narrator-list").value;
        }
        /** If the action is division_box */
        else if (action == "division_box") {
            /** The current division is set to the selected division */
            this.config.division  = document.getElementById("division-list").value;
        }
        /** If the action is layout_box */
        else if (action == "layout_box") {
            /** The current layout is set to the selected layout */
            this.config.layout  = document.getElementById("layout-list").value;
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
            subscription.AddSubscriber("holy-quran");
        }
        else {
            /** The url used to make the request */
            var url            = this.config.site_url + "/api/get_quran_nav_config";
            /** The app config is updated */
            this.UpdateAppConfig(action);
            /** The parameters for the request */
            var params         = {
                                   "division": this.config.division,
                                   "div_num": this.config.div_num, 
                                   "sura": this.config.sura, 
                                   "sura_ruku": this.config.sura_ruku, 
                                   "action": action
                                 };                              
            /** The ui components are updated */
            this.UpdateUiComponents(url, params, action);
        }               
    }
}
