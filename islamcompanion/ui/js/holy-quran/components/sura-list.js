"use strict";

import { Utilities } from './../../common/utilities.js';

/** The SuraList class */
export class SuraList {

    /** The constructor */
    constructor(configuration) {
        /** The Config object is set as object property */
        this.config = configuration;
    }
        
    /** Used to update the sura list */
    UpdateSuraList(is_async) {
                
        /** An object of Utilities class is created */
        let utilities  = new Utilities();
        
        /** The url used to make the request */
        let url        = "/api/get_suras_in_division";
        /** The parameters for the request */
        let parameters = {
            "division": this.config.division, 
            "div_num": this.config.div_num
        };
        
        /** The callback for updating the sura list */
        let success = (response) => {
            /** The response is json decoded */
            response             = JSON.parse(response);
            /** The sura list */
            let sura_list        = response;
            /** arrow function used to set the Holy Quran sura select box options */
            let set_sura_options = (option, data) => {
                /** The option value is set */
                option.value     = data.sindex;
                /** The option text is set */
                option.text      = data.tname + " (" + data.ename + ")";
                
                return option;
            }
            /** The sura list is updated */
            utilities.PopulateSelectBox("sura-list", sura_list, this.config.sura, set_sura_options);
        }            
        /** The data is fetched from server and the sura list is updated */
        utilities.MakeRequest(url, parameters, success, is_async);
    }
}
