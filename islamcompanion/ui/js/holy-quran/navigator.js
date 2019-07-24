"use strict";

import { EventHandlers } from './event-handlers.js';
import { DivisionList } from './components/division-list.js';
import { SuraList } from './components/sura-list.js';
import { RukuList } from './components/ruku-list.js';
import { VerseText } from './components/verse-text.js';
import { LanguageList } from './components/language-list.js';
import { NarratorList } from './components/narrator-list.js';
import { AudioFile } from './components/audio-file.js';

/** The Holy Quran Navigator class */
export class HolyQuranNavigator {

    /** The constructor */
    constructor(configuration) {
        /** The Config object is set as object property */
        this.config         = configuration;    
        /** The event handlers object is created */
        this.event_handlers = new EventHandlers(this, this.config);
    }

    /** Used to initialize the Holy Quran Navigator */
    Initialize() {    
        /** The event handlers are registered */
        this.event_handlers.RegisterEventHandlers();
        /** The navigator is loaded */
        this.LoadNavigator("all");         
    }

    /** Used to load the navigator */
    LoadNavigator(components) {
        /** The common navigator related functions */
        let nav_common      = this.config.nav_common;
        /** The overlay is shown */
        nav_common.ShowOverlay();
        
        /** If the division list needs to be updated */
        if (components.indexOf("all") >=0 || components.indexOf("division") >= 0) {
            /** The DivisionList class object is created */
            let dl = new DivisionList(this.config);
            /** The division list is updated */
            dl.UpdateDivisionList();
        }
        
        /** If the sura list needs to be updated */
        if (components.indexOf("all") >=0 || components.indexOf("sura") >= 0) {
            /** The SuraList class object is created */
            let sl = new SuraList(this.config);
            /** The sura list is updated */
            sl.UpdateSuraList();
        }
        
        /** If the ruku list needs to be updated */
        if (components.indexOf("all") >=0 || components.indexOf("ruku") >= 0) {
            /** The RukuList class object is created */
            let rl = new RukuList(this.config);
            /** The ruku list is updated */
            rl.UpdateRukuList();
        }
        
        /** If the verse text needs to be updated */
        if (components.indexOf("all") >=0 || components.indexOf("verse") >= 0) {
            /** The VerseText class object is created */
            let vt = new VerseText(this.config);
            /** The verse text is updated */
            vt.UpdateVerseText();
        }
        
        /** If the language list needs to be updated */
        if (components.indexOf("all") >=0 || components.indexOf("language") >= 0) {
            /** The LanguageList class object is created */
            let ll = new LanguageList(this.config);       
            /** The language list is updated */
            ll.UpdateLanguageList();
        }
        
        /** If the narrator list needs to be updated */
        if (components.indexOf("all") >=0 || components.indexOf("narrator") >= 0) {
            /** The NarratorList class object is created */
            let nl = new NarratorList(this.config);       
            /** The narrator list is updated */
            nl.UpdateNarratorList();
        }
        
        /** If all components need to be updated */
        if (components.indexOf("all") >=0) {
            /** The layout select box value is set */
            document.getElementById("layout-list").value = this.config.layout;
        }
        
        /** The AudioFile class object is created */
        let af = new AudioFile(this.config);                   
        /** The audio file url is updated */
        af.UpdateAudioFileUrl();
        
        /** The overlay is hidden */
        nav_common.HideOverlay();
        
        /** The current configuration is saved to local browser storage */
        this.config.SaveConfig();
    }
}
