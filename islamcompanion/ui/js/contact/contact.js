"use strict";

import { Utilities } from './../common/utilities.js';

/** The Contact class */
export class Contact {

    /** Used to register the event handlers */
    RegisterEventHandlers() {
        /** The submit button click handler is registered */
        document.getElementById("contact-btn").addEventListener("click", () => {this.SendMessage();});
    }
    
    /** Used to initialize the contact form */
    Initialize() {    
        /** The event handlers are registered */
        this.RegisterEventHandlers();   
    }
    
    /** Used to send a contact message */
    SendMessage() {    
        
        /** An object of Utilities class is created */
        let utilities = new Utilities();
        
        /** If the email is not valid */
        if (!document.getElementById("email").checkValidity()) {
            /** An alert message is shown */
            alert("Please enter a valid email address !");
            /** The function returns */
            return;
        }        
        /** If the name was not entered */
        else if (!document.getElementById("name").checkValidity()) {
            /** An alert message is shown */
            alert("Please enter your name !");
            /** The function returns */
            return;
        }
        /** If the message was not entered */
        else if (!document.getElementById("message").checkValidity()) {
            /** An alert message is shown */
            alert("Please enter your message !");
            /** The function returns */
            return;
        }

        /** The overlay is shown */
        utilities.ShowOverlay('contact');
        
        /** The email address */
        var email_address     = document.getElementById("email").value;
        /** The name */
        var name              = document.getElementById("name").value;
        /** The messsage */
        var text              = document.getElementById("message").value;
        /** The url used to make the request */
        var url               = "/contact/add";      
        /** The parameters for the request */
        var parameters        = {"email": email_address, "name": name, "message": text};
        
        /** The callback for displaying the confirmation message */
        let success    = (response) => {
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
