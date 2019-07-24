"use strict";

import { NavigatorCommon } from '../navigator-common.js';
import { EventHandlers } from './event-handlers.js';

/** The HadithDownload class */
export class HadithDownload extends NavigatorCommon {

    /** The constructor */
    constructor() {
        /** The parent class constructor is called */
        super();
        /** The event handlers object is created */
        this.event_handlers = new EventHandlers(this);
    }

    /** Used to initialize the hadith download form */
    Initialize() {    
        /** The event handlers are registered */
        this.event_handlers.RegisterEventHandlers();   
    }
    
    /** Used to send an email with link to download the hadith database */
    SendDownloadLink() {    

        /** If the email is not valid */
        if (!document.getElementById("email").checkValidity()) {
            /** An alert message is shown */
            alert("Please enter a valid email address !");
            /** The function returns */
            return;
        }        
        
        /** The overlay is shown */
        this.ShowOverlay('hadithdownload');
        
        /** The email address */
        var email_address     = document.getElementById("email").value;
        /** The url used to make the request */
        var url               = this.site_url + "/hadith-download/email";
        /** The parameters for the request */
        var parameters        = {"email": email_address};
        
        /** The callback for displaying the confirmation message */
        let success    = (response) => {
            /** The response is json decoded */
            response   = JSON.parse(response);
            /** An alert message is shown */
            alert(response.message);
        };          

        /** The data is sent to server */
        this.MakeRequest(url, parameters, success);
        
        /** The overlay is hidden */
        this.HideOverlay();
    }
}
