"use strict";

/** The Navigator class */
export class NavigatorCommon {

    /** The constructor */
    constructor(configuration) {        
        /** The Config object is set as object property */
        this.config = configuration;
                
        /** The overlay is recalculated when window is resized */
        window.addEventListener("resize", () => {
            if (document.getElementById("overlay").style.display == "block") {
                this.ShowOverlay();
            }
        });
        /** The overlay is recalculated when window is scrolled */
        window.addEventListener("scroll", () => {
            if (document.getElementById("overlay").style.display == "block") {
                this.ShowOverlay();
            }
        });       
    }

    /** Used to make ajax request to the server */
    MakeRequest(url, parameters, success) {        
        /** The Ajax call */
        $.ajax({
            method: "POST",
            url: url,
            data: parameters,
            async: false
		})
        /** This function is called after data has been loaded */
        .done(success)
        .fail(this.Fail);                
    }

    /** Used to indicate that ajax request has failed */
    Fail() {
        alert("Error!");
    }

    /** Used to display the overlay */
    ShowOverlay() {       
        /** The top value for the holy quran navigator */
        var top     = document.getElementById("navigator-inner").offsetTop;
        /** The left value for the holy quran navigator */
        var left    = document.getElementById("navigator-inner").offsetLeft;
        /** The width value for the holy quran navigator */
        var width   = document.getElementById("navigator-inner").offsetWidth;
        /** The height value for the holy quran navigator */
        var height  = document.getElementById("navigator-inner").offsetHeight;
        
        /** If the user is scrolling */
        if (window.scrollY > 0) {
            /** The top value for the overlay */
            document.getElementById("overlay").style.top  = "0px";
        }
        /** If the user is not scrolling */
        else {
            /** The top value for the overlay */
            document.getElementById("overlay").style.top  = top + "px";
        }
        /** The left value for the overlay */
        document.getElementById("overlay").style.left     = left + "px";
        /** The width value for the overlay */
        document.getElementById("overlay").style.width    = width + "px";
        /** The height value for the overlay */
        document.getElementById("overlay").style.height   = height + "px";

        /** The overlay is shown */
        document.getElementById("overlay").style.display  = "block";
    }

    /** Used to hide the overlay */
    HideOverlay() {
        /** The overlay is shown */
        document.getElementById("overlay").style.display  = "none";
    }
    
    
    /** Used to return a range of numbers */
    Range(start, end) {
    
        /** The list of numbers in the range */
        var number_range = Array();
        /** Each number in the range is added to the array */
        for (let count = start; count <= end; count++) {
            /** The number is added to the range */
            number_range.push(count);
        }
        
        return number_range;
    }
    
     /** Used to truncate the text to the given number of words */
    TruncateText(text, max_word_count) {
        /** The text is split on space */
        let words          = text.split(" ");
        /** If the size of the text is less than 20 words, then the function returns the original text */
        if (words.length < 20) return text;
        
        /** The shortened text */
        let shortened_text = words.slice(0, 20).join(" ");
        
        /** The "..." is added to the end of the shortended text */
        shortened_text     = shortened_text + " ...";
        
        return shortened_text
    }
    
    /** Used to populate the given select box */
    PopulateSelectBox(id, data, selected_value, callback) {
    
        /** The select box is emptied */
        document.getElementById(id).options.length = 0;
        
        /** Each data item is added */
        for (let count = 0; count < data.length; count++) {
            /** An option element is created */
            let option   = document.createElement("option");
            /** If the callback is set, then it is used to set the value of the option */
            if (callback != "") {
                option   = callback(option, data[count]);
            }
            /** If the callback is not set */
            else {
                /** The option value is set */
                option.value = data[count];
                /** The option text is set */
                option.text  = data[count];
            }
            /** If the option value matches the given selected value */
            if (option.value == selected_value) {
                /** The option is set to selected */
                option.selected = true;
            }
            /** The option is appended to the select box */
            document.getElementById(id).appendChild(option);
        }
        
        /** The select box value is set */
        document.getElementById(id).value = selected_value;
    }
    
    /** Used to update the main text */
    UpdateMainText(response, format_callback) {
        /** The response is json decoded */
        response               = JSON.parse(response);
        /** The text area is emptied */
        document.getElementById("navigator-text").innerHTML = "";
        /** The text list css class */
        let text_class         = "ltr-list";
        /** The language direction */
        let lang_dir           = "ltr";
        /** If the language is rtl or layout is double column */
        if (this.config.ltr_langs.indexOf(this.config.language) < 0 || this.config.layout == "double-column") {
            /** The verse text list css class */
            text_class         = "rtl-list";
            /** If the language is rtl */
            if (this.config.ltr_langs.indexOf(this.config.language) < 0) {
                /** The language direction */
                lang_dir           = "rtl";
            }
        }        
            
        /** The language direction is set to application config */
        this.config.is_rtl     = (lang_dir == "rtl") ? "yes" : "no";
        /** The css class for the language */
        let lang_css           = "";
        /** If the css class for the language is present */
        if (this.config.font_classes.indexOf(this.config.language.toLowerCase()) >= 0) {
            /** The css class */
            lang_css           = this.config.language.toLowerCase();
        }
            
        /** The css class for the verse text container */
        document.getElementById("navigator-text").className = text_class;      
            
        /** Each text item is appended to the list */
        for (let count = 0; count < response.length; count++) {
            /** The text object */
            let text               = response[count];            
            /** The main text is formatted */
            let text_html          = format_callback(text, count);
            /** The css class for verse template is set */
            text_html              = text_html.replace(/\[lang\-css\]/g, lang_css);
            /** The css class for language direction is set */
            text_html              = text_html.replace(/\[lang\-dir\]/g, lang_dir);      
            /** If the language is ltr */
            if (lang_dir == "ltr") {
                /** The numbering is added to the ltr text */
                text_html = text_html.replace("[index]", (count +1) + ". ");
                /** If the search section exists */
                if (document.getElementById("search-section")) {
                    /** The right alignment is removed */
                    document.getElementById("search-section").classList        = "col-lg-6 float-left";
                    /** The search results header is floated right */
                    document.getElementById("search-results-header").classList = "col-lg-6 form-inline float-right";
                }
            }
            /** If the language is rtl */
            else {
                /** The numbering placeholder is removed from rtl text */
                text_html = text_html.replace("[index]", "");
                /** If the search section exists */
                if (document.getElementById("search-section")) {
                    /** The search section is right aligned */
                    document.getElementById("search-section").classList        = "col-lg-6 float-right rtl-search";
                    /** If the css class for the current language exists */
                    if (lang_css != "") {
                        /** The language css class is added */
                        document.getElementById("search-section").classList.add(lang_css);
                    }
                    /** The search results header is floated left */
                    document.getElementById("search-results-header").classList = "col-lg-6 form-inline float-left";
                }
            }
            /** The list element is created */
            let list_item          = document.createElement("li");
            /** The html for the list item is set */
            list_item.innerHTML    = text_html;
            /** The verse html is appended to the verse list */
            document.getElementById("navigator-text").appendChild(list_item);
        }
    }
    
    /** The search results header is updated */
    UpdateSearchHeader() {        
        /** The total number of pages */
        let page_count     = Math.ceil(this.config.result_count / this.config.results_per_page);
        /** The search results numbering is set */
        document.getElementById("page-list").value = this.config.page_number;        
        /** The start number for the search results */
        let start             = ((this.config.page_number-1) * this.config.results_per_page) + 1;
        /** The search results numbering is set */
        document.getElementById("navigator-text").setAttribute("start", start);
                    
        /** The next button id */
        let next_btn_id    = "next-page";
        /** The prev button id */
        let prev_btn_id    = "prev-page"; 
        
        /** If the language is rtl */
        if (this.config.is_rtl == "yes") {
            /** The next button id */
            next_btn_id = "prev-page";
            /** The prev button id */
            prev_btn_id = "next-page";            
        }
        
        /** If there is one search result */
        if (page_count == 1) {
            /** The next page button is hidden */
            document.getElementById(next_btn_id).classList.add("d-none");
            /** The prev page button is hidden */
            document.getElementById(prev_btn_id).classList.add("d-none");
        }
        /** If there are more than one search result */
        else {
            /** If the current page number is 1 */
            if (this.config.page_number == 1) {
                /** The prev page button is hidden */
                document.getElementById(prev_btn_id).classList.add("d-none");
            }
            else {
                /** The prev page button is shown */
                document.getElementById(prev_btn_id).classList.remove("d-none");
            }
            /** If the current page number is equal to total number of pages */
            if (this.config.page_number == page_count) {
                /** The next page button is hidden */
                document.getElementById(next_btn_id).classList.add("d-none");
            }
            else {
                /** The next page button is shown */
                document.getElementById(next_btn_id).classList.remove("d-none");
            }
        }
    }
    
    /** Used to update the search text */
    UpdateSearchText(response, format_callback) {
        
        /** The response is json decoded */
        response                  = JSON.parse(response);
        
        /** The temporary container */
        let tcontainer            = document.getElementById("temp-container");                      
        /** The result count is copied to app config */
        this.config.result_count  = response.result_count;        
                    
        /** The search results are json encoded */
        let search_results        = JSON.stringify(response.search_results);
        /** The main text is updated */
        this.UpdateMainText(search_results, format_callback);        
        
        /** If the current action is not search, then function returns */
        if (this.config.action != "search") {
            /** The search results header is updated */
            this.UpdateSearchHeader();
            /** The function returns */
            return;
        }            

        /** The search results header is set to empty */
        document.getElementById("search-results-header").innerHTML = "";                    
        /** If no search results were returned, then message is shown to the user */
        if (response.result_count == "0") {
            /** The search heading is set */
            tcontainer.innerHTML  = "<h2 id='no-results'>No results were found !</h2>";
            /** The search results header html is set */
            document.getElementById("search-results-header").innerHTML = tcontainer.innerHTML;
            /** The contents of temporary container are set to empty */
            tcontainer.innerHTML  = "";            
        }
        /** If search results were found, then inner html of temp container is set */
        else {
            /** The search heading is set */
            tcontainer.innerHTML  = document.getElementById("search-heading-template").innerHTML;
            /** The total number of pages */
            let page_count        = Math.ceil(this.config.result_count / this.config.results_per_page);
            /** The search template is updated */
            tcontainer.innerHTML  = tcontainer.innerHTML.replace("[page_count]", page_count);            
            /** The page number list is set */
            let page_list         = this.Range(1, page_count);
            /** The current page number is set */
            this.config.nav_common.PopulateSelectBox("page-list", page_list, this.config.page_number, "");            
            /** The search results header html is set */
            document.getElementById("search-results-header").innerHTML = tcontainer.innerHTML;
            /** The contents of temporary container are set to empty */
            tcontainer.innerHTML  = "";
            /** The search results header is updated */
            this.UpdateSearchHeader();
        }        
    }
    
    /** Used to check if the given item id exists in the select box */
    IsItemPresent(id, select_box_id) {

        /** The select box items */
        let option_list = document.getElementById(select_box_id).options;
        /** Each select box item is checked */
        for (let count = 0; count < option_list.length; count++) {
            /** An option element is created */
            let option   = option_list[count];
            /** If the option value exists */
            if (option.value == id) return true;
        }
        
        return false;
    }
}
