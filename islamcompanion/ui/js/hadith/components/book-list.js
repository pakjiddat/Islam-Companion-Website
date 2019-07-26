"use strict";

import { Utilities } from './../../common/utilities.js';

/** The BookList class */
export class BookList {

    /** The constructor */
    constructor(configuration) {
        /** The Config object is set as object property */
        this.config = configuration;
    }
    
    /** Used to update the Hadith book select box */
    UpdateBookList(is_async) {
        /** The url used to make the request */
        let url        = "/api/get_hadith_books";
        /** The parameters for the request */
        let parameters = {
            "source": this.config.source,
            "language": this.config.language
        };
        
        /** An object of Utilities class is created */
        let utilities = new Utilities();
        
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
            utilities.PopulateSelectBox("book-list", book_list, this.config.book_id, set_book_options);
        }            

        /** The data is fetched from server and the ruku list is updated */
        utilities.MakeRequest(url, parameters, success, is_async);        
    }  
    
}
