"use strict";

/** The Utilities class */
export class Utilities {

    /** The constructor */
    constructor() {
    
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
    MakeRequest(url, parameters, success, is_async) {
    
        /** The Ajax call */
        $.ajax({
            method: "POST",
            url: url,
            data: parameters,
            async: is_async
		})
        /** This function is called after data has been loaded */
        .done(success)
        .fail(this.Fail);                
    }

    /** Used to indicate that ajax request has failed */
    Fail() {
    
        /** Alert message is shown */ 
        alert("Error!");
    }

    /** Used to display the overlay */
    ShowOverlay(id) {
    
        /** The top value for the holy quran navigator */
        var top     = document.getElementById(id).offsetTop;
        /** The left value for the holy quran navigator */
        var left    = document.getElementById(id).offsetLeft;
        /** The width value for the holy quran navigator */
        var width   = document.getElementById(id).offsetWidth;
        /** The height value for the holy quran navigator */
        var height  = document.getElementById(id).offsetHeight;
        
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
            if (callback != null) {
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
