"use strict";

import { Utilities } from './../../common/utilities.js';

/** The DivisionList class */
export class DivisionList {

    /** The constructor */
    constructor(configuration) {
        /** The Config object is set as object property */
        this.config = configuration;
    }
        
    /** Used to update the division list */
    UpdateDivisionList () {
    
        /** An object of Utilities class is created */
        let utilities       = new Utilities();
        /** If the current division is not ruku, then the division box is made visible */
        if (this.config.division != "ruku") {
            /** The number of items in the division */
            var item_count  = this.config.divisions[this.config.division];
            
            /** The first letter of the selected division is capitalized */
            let label       = this.config.division.charAt(0).toUpperCase();
            /** The first letter of the selected division is capitalized */            
            label           += this.config.division.substring(1).toLowerCase();
            
            /** The division number box label is set */
            document.getElementById("division-label").innerHTML = label; 
            /** The range of number is generated */
            var number_list                                     = utilities.Range(1, item_count);
            /** The division list is updated */
            utilities.PopulateSelectBox("division-number-list", number_list, this.config.div_num, "");
            /** The width of the sura section is reduced */
            document.getElementById("sura-section").classList.remove("col-lg-4");
            /** The width of the sura section is reduced */
            document.getElementById("sura-section").classList.add("col-lg-3");            
            /** The division section is made visible */
            document.getElementById("division-section").classList.remove("d-none");            
        }
        /** If the current division is ruku, then the division box is hidden */
        else {
            /** The width of the sura section is increased */
            document.getElementById("sura-section").classList.remove("col-lg-3");
            /** The width of the sura section is increased */
            document.getElementById("sura-section").classList.add("col-lg-4");            
            /** The division section is made hidden */
            document.getElementById("division-section").classList.add("d-none");     
        }
    }  
}
