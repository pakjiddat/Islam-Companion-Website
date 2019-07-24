"use strict";

/** The BookTitleList class */
export class BookTitleList {

    /** The constructor */
    constructor(configuration) {
        /** The Config object is set as object property */
        this.config = configuration;
    }
    
    /** Used to update the Hadith title select box */
    UpdateBookTitleList() {
        /** The url used to make the request */
        var url        = this.config.site_url + "/api/get_hadith_titles";
        /** The parameters for the request */
        var parameters = {
            "book_id": this.config.book_id,
            "language": this.config.language
        };
        
        /** The common navigator related functions */
        let nav_common = this.config.nav_common;
        
        /** The callback for updating the title list */
        let success = (response) => {
            /** The response is json decoded */
            response            = JSON.parse(response);
            /** The title list */
            let title_list = response;
            /** arrow function used to set the Hadith title select box options */
            let set_title_options = (option, data) => {
                /** The option value is set */
                option.value    = data.id;
                /** The option text is set */
                option.text     = data.title;
                /** The option text is truncated to max allowed words */
                option.text     = nav_common.TruncateText(data.title, this.config.max_word_count);
                
                return option;
            }
            /** The title list is updated */
            nav_common.PopulateSelectBox("title-list", title_list, this.config.title_id, set_title_options);
        }            

        /** The data is fetched from server and the hadith navigator configuration is updated */
        nav_common.MakeRequest(url, parameters, success);        
    }
    
}
