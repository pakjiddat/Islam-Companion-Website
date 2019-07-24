"use strict";

/** The SuraList class */
export class SuraList {

    /** The constructor */
    constructor(configuration) {
        /** The Config object is set as object property */
        this.config = configuration;
    }
        
    /** Used to update the sura list */
    UpdateSuraList () {
                
        /** The url used to make the request */
        var url        = this.config.site_url + "/api/get_suras_in_division";
        /** The parameters for the request */
        var parameters = {
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
            /** The common navigator related functions */
            let nav_common      = this.config.nav_common;            
            /** The sura list is updated */
            nav_common.PopulateSelectBox("sura-list", sura_list, this.config.sura, set_sura_options);
        }            
        /** The common navigator related functions */
        let nav_common      = this.config.nav_common;
        /** The data is fetched from server and the sura list is updated */
        nav_common.MakeRequest(url, parameters, success);
    }
}
