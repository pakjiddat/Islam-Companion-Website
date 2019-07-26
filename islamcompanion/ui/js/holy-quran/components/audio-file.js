"use strict";

/** The AudioFile class */
export class AudioFile {

    /** The constructor */
    constructor(configuration) {
        /** The Config object is set as object property */
        this.config = configuration;
    }
        
    /** Used to update the audio file url */
    UpdateAudioFileUrl() {
        /** The sura ruku id */
        let ruku_id = this.config.sura_ruku;
        /** If the sura ruku id is less than 10 */
        if (ruku_id < 10) {
            /** The current sura ruku id is padded with "0" */
            ruku_id = "0" + ruku_id;
        }            
        /** The url of the audio file */
        let url     = "https://res.cloudinary.com/islamcompanion/video/upload/audio/rukoo" + ruku_id;
        url        += this.config.audiofile + ".mp3";
        
        /** The src attribute of the audio tag is updated */
        document.getElementById("audio-file").src = url;
    }
}
