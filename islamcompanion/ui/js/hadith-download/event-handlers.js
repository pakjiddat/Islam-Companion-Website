"use strict";

/** The EventHandlers class */
export class EventHandlers {

    /** The constructor */
    constructor(hadithdownload) {
        this.hadithdownload = hadithdownload;
    }
        
    /** Used to register the event handlers */
    RegisterEventHandlers() {
        /** The submit button click handler is registered */
        document.getElementById("hadith-download-button").addEventListener(
            "click",
            () => {this.hadithdownload.SendDownloadLink();}
        );
    }        
}
