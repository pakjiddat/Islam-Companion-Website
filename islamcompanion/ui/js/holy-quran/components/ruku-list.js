"use strict";

/** The RukuList class */
export class RukuList {

    /** The constructor */
    constructor(configuration) {
        /** The Config object is set as object property */
        this.config = configuration;
    }
        
    /** Used to update the ruku select box */
    UpdateRukuList() {
        /** The url used to make the request */
        var url        = this.config.site_url + "/api/get_ruku_list";
        /** The parameters for the request */
        var parameters = {
            "division": this.config.division, 
            "div_num": this.config.div_num, 
            "sura": this.config.sura
        };
        
        /** The callback for updating the ruku list and ayat range */
        let success = (response) => {
            /** The common navigator related functions */
            let nav_common      = this.config.nav_common; 
            /** The response is json decoded */
            response            = JSON.parse(response);
            /** The ruku list is set */
            let ruku_list       = this.config.nav_common.Range(response.start_ruku, response.end_ruku);
            /** The selected ruku is set */
            nav_common.PopulateSelectBox("ruku-list", ruku_list, this.config.sura_ruku, "");
            /** The ayat range is set */
            document.getElementById("ayat-range").innerHTML = this.config.start_ayat + " - ";
            document.getElementById("ayat-range").innerHTML += this.config.end_ayat;
        }            
        /** The common navigator related functions */
        let nav_common      = this.config.nav_common;
        /** The data is fetched from server and the ruku list is updated */
        nav_common.MakeRequest(url, parameters, success);        
    }
}
