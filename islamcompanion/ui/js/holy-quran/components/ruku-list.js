"use strict";

import { Utilities } from './../../common/utilities.js';

/** The RukuList class */
export class RukuList {

    /** The constructor */
    constructor(configuration) {
        /** The Config object is set as object property */
        this.config = configuration;
    }
        
    /** Used to update the ruku select box */
    UpdateRukuList(is_async) {
    
        /** An object of Utilities class is created */
        let utilities  = new Utilities();
        
        /** The url used to make the request */
        let url        = "/api/get_ruku_list";
        /** The parameters for the request */
        let parameters = {
            "division": this.config.division, 
            "div_num": this.config.div_num, 
            "sura": this.config.sura
        };
        
        /** The callback for updating the ruku list and ayat range */
        let success = (response) => {
            /** The response is json decoded */
            response            = JSON.parse(response);
            /** The ruku list is set */
            let ruku_list       = utilities.Range(response.start_ruku, response.end_ruku);
            /** The selected ruku is set */
            utilities.PopulateSelectBox("ruku-list", ruku_list, this.config.sura_ruku, null);
            /** The ayat range is set */
            document.getElementById("ayat-range").innerHTML = this.config.start_ayat + " - ";
            document.getElementById("ayat-range").innerHTML += this.config.end_ayat;
        }            
        /** The data is fetched from server and the ruku list is updated */
        utilities.MakeRequest(url, parameters, success, is_async);        
    }
}
