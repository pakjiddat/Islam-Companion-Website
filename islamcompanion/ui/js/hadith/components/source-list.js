"use strict";

import { Utilities } from './../../common/utilities.js';

/** The SourceList class */
export class SourceList {

    /** The constructor */
    constructor(configuration) {
        /** The Config object is set as object property */
        this.config = configuration;
    }
    
    /** Used to update the Hadith source select box */
    UpdateSourceList(is_async) {
        
        /** An object of Utilities class is created */
        let utilities  = new Utilities();      
        /** The url used to make the request */
        let url        = "/api/get_hadith_sources";
        /** The parameters for the request */
        let parameters = {
            "language": this.config.language
        };

        /** The callback for updating the source list */
        let success = (response) => {
            /** The response is json decoded */
            response            = JSON.parse(response);
            /** The source list */
            let source_list     = response;
            /** arrow function used to set the Hadith source select box options */
            let set_source_options = (option, data) => {
                /** The option value is set */
                option.value    = data;
                /** The option text is set */
                option.text     = data;
                
                return option;
            }
            /** The book list is updated */
            utilities.PopulateSelectBox("source-list", source_list, this.config.source, set_source_options);
        }            

        /** The data is fetched from server and the source list is updated */
        utilities.MakeRequest(url, parameters, success, is_async);        
    }    
}
