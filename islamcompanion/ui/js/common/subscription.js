"use strict";

import { Utilities } from './utilities.js';

/** The Subscription class */
export class Subscription {

    /** The constructor */
    constructor(configuration) {
        /** The Config object is set as object property */
        this.config = configuration;
    }
    
    /** Used to add a subscriber */
    AddSubscriber(type) {    

        /** An object of Utilities class is created */
        let utilities          = new Utilities();
        /** If the email is not valid */
        if (!document.getElementById("email-address").checkValidity()) {
            /** An alert message is shown */
            alert("Please enter a valid email address !");
            /** The function returns */
            return;
        }

        /** The email address */
        let email_address     = document.getElementById("email-address").value;
        /** The url used to make the request */
        let url               = "/subscribe/add";
        /** Indicates if language is rtl */
        let is_rtl            = this.config.is_rtl;
        
        /** The extra subscriber data */
        let extra             = "";
        /** The subscription type */
        let subscription_type = "";
        
        /** If the subscription type is holy-quran */
        if (type == "holy-quran") {
            /** The type */
            subscription_type      = "Holy Quran";            
            /** The narrator and language */
            extra                  = {
                                       "narrator" : document.getElementById("narrator-list").value,
                                       "language" : document.getElementById("language-list").value,
                                       "is_rtl" : is_rtl
                                     };
        }
        /** If the subscription type is hadith */
        else if (type == "hadith") {
            /** The type */
            subscription_type = "Hadith";            
            /** The language */
            extra             = {
                                  "language" : document.getElementById("language-list").value,
                                  "is_rtl" : is_rtl
                                };
        }
                                            
        /** The JSON object is converted to a string */
        extra                 = JSON.stringify(extra);                                
        /** The parameters for the request */
        let parameters        = {
                                  "email" : email_address,
                                  "type" : subscription_type,
                                  "extra" : extra
                                };
        
        /** The callback for displaying the confirmation message */
        let success    = (response) => {
            /** The response is json decoded */
            response   = JSON.parse(response);
            /** An alert message is shown */
            alert(response.message);
        };          

        /** The data is sent to server */
        utilities.MakeRequest(url, parameters, success, true);
    }
}
