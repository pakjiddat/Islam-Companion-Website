"use strict";

/** The EventHandlers class */
export class EventHandlers {

    /** The constructor */
    constructor(contact) {
        this.contact = contact;
    }
        
    /** Used to register the event handlers */
    RegisterEventHandlers() {
        /** The submit button click handler is registered */
        document.getElementById("contact-button").addEventListener("click", () => {this.contact.SendMessage();});
    }        
}
