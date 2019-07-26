"use strict";

import { Utilities } from './../common/utilities.js';

/** The HadithDownload class */
export class HadithDownload {

    /** Used to register the event handlers */
    RegisterEventHandlers() {
        /** The submit button click handler is registered */
        document.getElementById("download-btn").addEventListener("click", () => {this.SendDownloadLink();});
    }
    
    /** Used to initialize the hadith download form */
    Initialize() {    
        /** The event handlers are registered */
        this.RegisterEventHandlers();   
    }
    
    /** Used to send an email with link to download the hadith database */
    SendDownloadLink() {    
    
        /** An object of Utilities class is created */
        let utilities  = new Utilities();
        
        /** If the email is not valid */
        if (!document.getElementById("email").checkValidity()) {
            /** An alert message is shown */
            alert("Please enter a valid email address !");
            /** The function returns */
            return;
        }        
        
        /** The overlay is shown */
        utilities.ShowOverlay("hadithdownload-inner");
        
        /** The email address */
        let email_address     = document.getElementById("email").value;
        /** The url used to make the request */
        let url               = "/hadith-download/email";
        /** The parameters for the request */
        let parameters        = {"email": email_address};
        
        /** The callback for displaying the confirmation message */
        let success           = (response) => {
                                    /** The response is json decoded */
                                    response   = JSON.parse(response);
                                    /** An alert message is shown */
                                    alert(response.message);
                                };          

        /** The data is sent to server */
        utilities.MakeRequest(url, parameters, success);
        
        /** The overlay is hidden */
        utilities.HideOverlay();
    }
}
