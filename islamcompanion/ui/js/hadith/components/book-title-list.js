"use strict";

import { Utilities } from './../../common/utilities.js';

/** The BookTitleList class */
export class BookTitleList {

    /** The constructor */
    constructor(configuration) {
        /** The Config object is set as object property */
        this.config = configuration;
    }
    
    /** Used to update the Hadith title select box */
    UpdateBookTitleList(is_async) {
        /** The url used to make the request */
        let url        = "/api/get_hadith_titles";
        /** The parameters for the request */
        let parameters = {
            "book_id": this.config.book_id,
            "language": this.config.language
        };
        
        /** An object of Utilities class is created */
        let utilities  = new Utilities();
        
        /** The callback for updating the title list */
        let success = (response) => {
            /** The response is json decoded */
            response            = JSON.parse(response);
            /** The title list */
            let title_list = response;
            /** arrow function used to set the Hadith title select box options */
            let set_title_options = (option, data) => {
                /** The option value is set */
                option.value    = data.id;
                /** The option text is set */
                option.text     = data.title;
                /** The option text is truncated to max allowed words */
                option.text     = utilities.TruncateText(data.title, this.config.max_word_count);
                
                return option;
            }
            /** The title list is updated */
            utilities.PopulateSelectBox("title-list", title_list, this.config.title_id, set_title_options);
        }            

        /** The data is fetched from server and the hadith navigator configuration is updated */
        utilities.MakeRequest(url, parameters, success, is_async);        
    }
    
}
