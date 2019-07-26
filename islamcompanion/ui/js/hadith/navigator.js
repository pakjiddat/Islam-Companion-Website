"use strict";

import { EventHandlers } from './event-handlers.js';
import { BookList } from './components/book-list.js';
import { BookTitleList } from './components/book-title-list.js';
import { HadithText } from './components/hadith-text.js';
import { SourceList } from './components/source-list.js';
import { Utilities } from './../common/utilities.js';

/** The Hadith Navigator class */
export class HadithNavigator {

    /** The constructor */
    constructor(configuration) {
        /** The Config object is set as object property */
        this.config         = configuration;    
        /** The event handlers object is created */
        this.event_handlers = new EventHandlers(this, this.config);
    }

    /** Used to initialize the Hadith Navigator */
    Initialize() {
        /** The event handlers are registered */
        this.event_handlers.RegisterEventHandlers();
        /** The navigator is loaded */
        this.LoadNavigator("all", true);         
    }
    /** Used to load the navigator */
    LoadNavigator(components, is_async) {
                
        /** If the source list needs to be updated */
        if (components.indexOf("all") >=0 || components.indexOf("source") >= 0) {
            /** The SourceList class object is created */
            let sl = new SourceList(this.config);
            /** The source list is updated */
            sl.UpdateSourceList(is_async);
        }
        
        /** If the book list needs to be updated */
        if (components.indexOf("all") >=0 || components.indexOf("book") >= 0) {
            /** The BookList class object is created */
            let bl = new BookList(this.config);
            /** The book list is updated */
            bl.UpdateBookList(is_async);
        }
        
        /** If the title list needs to be updated */
        if (components.indexOf("all") >=0 || components.indexOf("title") >= 0) {
            /** The BookTitleList class object is created */
            let btl = new BookTitleList(this.config);
            /** The title list is updated */
            btl.UpdateBookTitleList(is_async);
        }
        
        /** If the hadith text needs to be updated */
        if (components.indexOf("all") >=0 || components.indexOf("text") >= 0) {
            /** The HadithText class object is created */
            let ht = new HadithText(this.config);
            /** The hadith text is updated */
            ht.UpdateHadithText(is_async);        
        }
        
        /** The current configuration is saved to local browser storage */
        this.config.SaveConfig();
    }
}
