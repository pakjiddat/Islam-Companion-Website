"use strict";

/** The NarratorList class */
export class NarratorList {

    /** The constructor */
    constructor(configuration) {
        /** The Config object is set as object property */
        this.config = configuration;
    }
        
    /** Used to update the narrator list */
    UpdateNarratorList () {
                   
        /** The url used to make the request */
        var url        = this.config.site_url + "/api/get_narrators";
        /** The parameters for the request */
        var parameters = {
            "language": this.config.language
        };
        
        /** The callback for updating the narrator list */
        let success = (response) => {
            /** The response is json decoded */
            response                     = JSON.parse(response);
            /** The narrator list */
            let narrator_list            = response;
            /** If the current narrator is not in the list of returned narrators */
            if (narrator_list.indexOf(this.config.narrator) < 0) {
                /** The current narrator is set to the first narrator */
                this.config.narrator         = narrator_list[0];
            }
            /** arrow function used to set the narrator select box options */
            let set_narrator_options     = (option, data) => {
                /** The option value is set */
                option.value             = data;
                /** The option text is set */
                option.text              = data;
                
                return option;
            }
            /** The common navigator related functions */
            let nav_common = this.config.nav_common;
            /** The narrator list is updated */
            nav_common.PopulateSelectBox("narrator-list", narrator_list, this.config.narrator, set_narrator_options);
        }            

        /** The common navigator related functions */
        let nav_common = this.config.nav_common;
        /** The data is fetched from server and the narrator list is updated */
        nav_common.MakeRequest(url, parameters, success);
    }
}
