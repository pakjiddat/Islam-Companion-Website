"use strict";

/** The SourceList class */
export class SourceList {

    /** The constructor */
    constructor(configuration) {
        /** The Config object is set as object property */
        this.config = configuration;
    }
    
    /** Used to update the Hadith source select box */
    UpdateSourceList() {
        /** The url used to make the request */
        var url        = this.config.site_url + "/api/get_hadith_sources";
        /** The parameters for the request */
        var parameters = {
            "language": this.config.language
        };
        
        /** The common navigator related functions */
        let nav_common = this.config.nav_common;
        
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
            nav_common.PopulateSelectBox("source-list", source_list, this.config.source, set_source_options);
        }            

        /** The data is fetched from server and the source list is updated */
        nav_common.MakeRequest(url, parameters, success);        
    }
    
}
