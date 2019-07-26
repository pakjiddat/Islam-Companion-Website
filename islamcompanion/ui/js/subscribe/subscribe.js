"use strict";

import { Config } from './configuration.js';
import { Utilities } from './../common/utilities.js';
import { Subscription } from './../common/subscription.js';
import { LanguageList } from './../holy-quran/components/language-list.js';
import { NarratorList } from './../holy-quran/components/narrator-list.js';

/** The Subscribe class */
export class Subscribe {

    /** The constructor */
    constructor() {
        /** The Configuration class object is created */
        this.config            = new Config();
    }
    
    /** Used to register the event handlers */
    RegisterEventHandlers() {
        /** An object of Subscription class is created */
        let subscription = new Subscription(this.config);
        /** The language list select handler is registered */
        document.getElementById("language-list").addEventListener("change", () => {
            /** An object of NarratorList class is created */
            let nl = new NarratorList(this.config);
            /** The narrator list is loaded */
            nl.UpdateNarratorList(true);
        });
        /** The submit button click handler is registered */
        document.getElementById("subscribe-btn").addEventListener("click", () => {
            /** The type value is fetched */
            let type = document.getElementById("type").value;
            /** The subscriber is added */
            subscription.AddSubscriber(type);
        });
        /** The type select box handler is registered */
        document.getElementById("type").addEventListener("change", () => {
            /** The type value is fetched */
            let type = document.getElementById("type").value;
            /** If the type value is hadith */
            if (type == "hadith") {
                /** The language list is cleared */
                document.getElementById("language-list").options.length = 0;
                /** The hadith language options are added */
                this.AddHadithLanguageOptions();
                /** The narrator section is hidden */
                document.getElementById("narrator-section").classList.add("d-none");
            }
            /** If the type value is Holy Quran */
            else if (type == "holy-quran") {
                /** The language and narrator select boxes are loaded with data */
                this.LoadSubscriptionForm();
                /** The narrator section is shown */
                document.getElementById("narrator-section").classList.remove("d-none");
            }
        });
    }
    
    /** Used to add the hadith language options */
    AddHadithLanguageOptions() {    
        /** The list of supported Hadith languages */
        let languages = Array("Arabic", "English", "Urdu");
        /** An object of Utilities class is created */
        let utilities = new Utilities();
        /** The language select box is populated */
        utilities.PopulateSelectBox("language-list", languages, "Urdu");
    }
    
    /** Used to initialize the contact form */
    Initialize() {    
        /** The event handlers are registered */
        this.RegisterEventHandlers();
        /** The select boxes on the form are loaded with data */
        this.LoadSubscriptionForm();
    }
    
    /** Used to load the select boxes on Subscription form */
    LoadSubscriptionForm() {        
        
        /** An object of LanguageList class is created */
        let ll = new LanguageList(this.config);
        /** The language list is loaded */
        ll.UpdateLanguageList(true);
        
        /** An object of NarratorList class is created */
        let nl = new NarratorList(this.config);
        /** The narrator list is loaded */
        nl.UpdateNarratorList(true);
    }
}
