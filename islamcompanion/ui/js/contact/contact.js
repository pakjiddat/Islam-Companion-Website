"use strict";

import { NavigatorCommon } from '../navigator-common.js';
import { EventHandlers } from './event-handlers.js';

/** The Contact class */
export class Contact extends NavigatorCommon {

    /** The constructor */
    constructor() {
        /** The parent class constructor is called */
        super();
        /** The event handlers object is created */
        this.event_handlers = new EventHandlers(this);
    }

    /** Used to initialize the contact form */
    Initialize() {    
        /** The event handlers are registered */
        this.event_handlers.RegisterEventHandlers();   
    }
    
    /** Used to send a contact message */
    SendMessage() {    

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
        this.ShowOverlay('contact');
        
        /** The email address */
        var email_address     = document.getElementById("email").value;
        /** The name */
        var name              = document.getElementById("name").value;
        /** The messsage */
        var text              = document.getElementById("message").value;
        /** The url used to make the request */
        var url               = this.site_url + "/contact/add";      
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
        this.MakeRequest(url, parameters, success);
        
        /** The overlay is hidden */
        this.HideOverlay();
    }
}
