"use strict";

import { Utilities } from './../../common/utilities.js';

/** The LanguageList class */
export class LanguageList {

    /** The constructor */
    constructor(configuration) {
        /** The Config object is set as object property */
        this.config = configuration;
    }
        
    /** Used to update the language list */
    UpdateLanguageList (is_async) {
             
        /** An object of Utilities class is created */
        let utilities  = new Utilities();                
        /** The url used to make the request */
        let url        = "/api/get_languages";
        /** The parameters for the request */
        let parameters = {};
        
        /** The callback for updating the language list */
        let success = (response) => {
            /** The response is json decoded */
            response                 = JSON.parse(response);
            /** The language list */
            let language_list        = response;
            /** arrow function used to set the language select box options */
            let set_language_options = (option, data) => {
                /** The option value is set */
                option.value         = data;
                /** The option text is set */
                option.text          = data;
                
                return option;
            }
            /** The language list is updated */
            utilities.PopulateSelectBox("language-list", language_list, this.config.language, set_language_options);
        }            

        /** The data is fetched from server and the language list is updated */
        utilities.MakeRequest(url, parameters, success, is_async);
    }
}
