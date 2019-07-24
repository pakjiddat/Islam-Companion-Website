"use strict";

/** The LanguageList class */
export class LanguageList {

    /** The constructor */
    constructor(configuration) {
        /** The Config object is set as object property */
        this.config = configuration;
    }
        
    /** Used to update the language list */
    UpdateLanguageList () {
                
        /** The url used to make the request */
        var url        = this.config.site_url + "/api/get_languages";
        /** The parameters for the request */
        var parameters = {};
        
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
            /** The common navigator related functions */
            let nav_common = this.config.nav_common;
            /** The language list is updated */
            nav_common.PopulateSelectBox("language-list", language_list, this.config.language, set_language_options);
        }            

        /** The common navigator related functions */
        let nav_common = this.config.nav_common;
        /** The data is fetched from server and the language list is updated */
        nav_common.MakeRequest(url, parameters, success);
    }
}
