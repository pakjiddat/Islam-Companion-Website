"use strict";

/** The BookList class */
export class BookList {

    /** The constructor */
    constructor(configuration) {
        /** The Config object is set as object property */
        this.config = configuration;
    }
    
    /** Used to update the Hadith book select box */
    UpdateBookList() {
        /** The url used to make the request */
        var url        = this.config.site_url + "/api/get_hadith_books";
        /** The parameters for the request */
        var parameters = {
            "source": this.config.source,
            "language": this.config.language
        };
        
        /** The common navigator related functions */
        let nav_common = this.config.nav_common;
        
        /** The callback for updating the book list */
        let success = (response) => {
            /** The response is json decoded */
            response            = JSON.parse(response);
            /** The book list */
            let book_list       = response;
            /** arrow function used to set the Hadith book select box options */
            let set_book_options = (option, data) => {
                /** The option value is set */
                option.value    = data.id;
                /** The option text is set */
                option.text     = data.book;
                
                return option;
            }
            /** The book list is updated */
            nav_common.PopulateSelectBox("book-list", book_list, this.config.book_id, set_book_options);
        }            

        /** The data is fetched from server and the ruku list is updated */
        nav_common.MakeRequest(url, parameters, success);        
    }  
    
}
