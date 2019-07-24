<?php

declare(strict_types=1);

namespace IslamCompanion\Ui\Pages;

use \Framework\Application\Page as Page;
use \Framework\Config\Config as Config;
use \Framework\Utilities\UtilitiesFramework as UtilitiesFramework;

/**
 * This class provides common functions that are used to generate the application pages
 *
 * @category   Pages
 * @author     Nadir Latif <nadir@pakjiddat.pk>
 * @license    https://www.gnu.org/licenses/gpl-2.0.html GNU General Public License, version 2
 */
class BasePage extends Page
{
    /**
     * It provides the html for the page header
     *
     * @param array $params the parameters for generating the header
     *
     * @return string $header_html the html for the header
     */
    protected function GetHeader(?array $params = null) : string
    {
        /** The current url */
		$current_url  = Config::$config["general"]["request_uri"];
		
		/** The template tag values */
		$tag_values   = array(
		                    "title" => "",
		                    "holy-quran-active" => "",
		                    "hadith-active" => "",
		                    "subscription-active" => "",
		                    "contact-active" => ""
		                );

		/** If the request url is '/holy-quran' */
		if ($current_url == '/holy-quran') {
		    /** The page title */
		    $tag_values['title']                = "Holy Quran";
		    /** The menu is marked as active */
		    $tag_values['holy-quran-active']    = "active";
		}
		/** If the request url is '/hadith' */
		else if ($current_url == '/hadith') {
		    /** The page title */
		    $tag_values['title']                = "Hadith";
		    /** The menu is marked as active */
		    $tag_values['hadith-active']        = "active";
		}
        /** If the request url is '/subscribe' */
		else if ($current_url == '/subscribe/form') {
		    /** The page title */
		    $tag_values['title']                = "Islam Companion - Get Holy Quran and Hadith by email";
		    /** The menu is marked as active */
		    $tag_values['subscription-active']  = "active";
        }		    
        /** If the request url is '/contact' */
		else if ($current_url == '/contact/form') {
    		/** The page title */
		    $tag_values['title']                = "Islam Companion - Contact Page";
		    /** The menu is marked as active */
		    $tag_values['contact-active']       = "active";
		}
		/** If the request url is '/hadith-download' */
		else if ($current_url == '/hadith-download') {
		    /** The page title */
		    $tag_values['title']                = "Islam Companion - Download Hadith Database";
		}
		/** If the request url is '/' */
		else if ($current_url == '/') {
		    /** The page title */
		    $tag_values['title']                = "Islam Companion - Learning Islam";
		}
		
		$header_html = Config::GetComponent("templateengine")->Generate("header", $tag_values);
		
		return $header_html;
	}
	
	/**
     * It provides the html for the page footer
     *
     * @param array $params optional the parameters for generating the footer
     *
     * @return string $footer_html the html for the page footer
     */
    protected function GetFooter(?array $params = null) : string
    {         		                
        /** Indicates if website is in dev mode */
        $dev_mode      = Config::$config["general"]["dev_mode"];
        /** The url of the Pak Jiddat website */
        $pakjiddat_url = ($dev_mode) ? "http://dev.pakjiddat.pk" : "https://www.pakjiddat.pk";
        /** The footer parameters */
        $params        = array("pakjiddat-url" => $pakjiddat_url);
        /** The footer html is generated */
        $footer_html   = Config::GetComponent("templateengine")->Generate("footer", $params);
		
		return $footer_html;
    }
    
    /**
     * It provides the title for the current page
     *
     * @return string $title the current page title
     */
    protected function GetTitle() : string
    {
		/** The current url */
		$current_url  = Config::$config["general"]["request_uri"];
		
		/** The required page title */
		$title        = "";

		/** If the request url is '/holy-quran' */
		if ($current_url == '/holy-quran') {
		    /** The page title */
		    $title    = "Holy Quran";
		}
		/** If the request url is '/hadith' */
		else if ($current_url == '/hadith') {
		    /** The page title */
		    $title    = "Hadith";
		}
        /** If the request url is '/subscribe' */
		else if ($current_url == '/subscribe/form') {
		    /** The page title */
		    $title    = "Islam Companion - Get Holy Quran and Hadith by email";
        }		    
        /** If the request url is '/contact' */
		else if ($current_url == '/contact/form') {
    		/** The page title */
		    $title    = "Islam Companion - Contact Page";
		}
		/** If the request url is '/hadith-download' */
		else if ($current_url == '/hadith-download') {
		    /** The page title */
		    $title    = "Islam Companion - Download Hadith Database";
		}
		/** If the request url is '/' */
		else if ($current_url == '/') {
		    /** The page title */
		    $title    = "Islam Companion - Learning Islam";
		}
		
		return $title;
	}
	
    /**
     * It sets the custom font list to application configuration
     */
    protected function SetCustomFontList() : void
    {
		/** The current url */
		$current_url                    = Config::$config["general"]["request_uri"];    
        /** The updated list of font files */
        $updated_font_list              = array();
        /** The current language */
        $language                       = Config::$config["general"]["language"];
        /** The custom font files */
        $custom_font_files              = Config::$config["general"]["font_list"];
        /** Each custom font file is checked */
        foreach ($custom_font_files as $languages => $font_file_details) {
            /** The language list is converted to array */
            $languages                  = explode(",", $languages);
            
            /** If the current page is Hadith and the font language does not include the Navigator language */
            if ($current_url == "/hadith" && !in_array("Arabic", $languages) && !in_array($language, $languages)) 
                continue;
            /** If the current page is Holy Quran and the font language does not include Arabic and the Navigator language */
            if ($current_url == "/holy-quran" && !in_array("Arabic", $languages) && !in_array($language, $languages))
                continue;
                            
            /** The font list is updated */
            $updated_font_list          []= $font_file_details;
        }
        /** The updated font list is set to application configuration */
        Config::$config["general"]["custom_font_files"] = $updated_font_list;
    }
   
    /**
     * It generates the html for the page
     *
     * @return string $page_html the html for the page
     */
    public function Generate() : string
    {
        /** The current page title */
        $title                = $this->GetTitle();
        /** The footer contents are fetched */
		$footer_html          = $this->GetFooter();        
        /** The header contents are fetched */
		$header_html          = $this->GetHeader();
        /** The html for the page body */
        $body_html            = $this->GetBody();
        
        /** The custom JavaScript, CSS and Font files are updated */
        $this->UpdateHeaderTags();
        /** The JavaScript, CSS and Font tags are generated */
        $header_tags          = $this->GetHeaderTags();

        /** If the website is in production mode */
        if (!Config::$config["general"]["dev_mode"]) {
            /** The path to the Google Analytics tracking code file */
            $file_path        = Config::$config["path"]["app_template_path"] . DIRECTORY_SEPARATOR . "base";
            $file_path        .= DIRECTORY_SEPARATOR . "ga_tracking.html";
            /** The google analytics tracking code is read */
            $ga_tracking_code = UtilitiesFramework::Factory("filemanager", array())->ReadLocalFile($file_path);
        }
        /** If the website is in development mode, then tracking code is set to empty */
        else $ga_tracking_code = "";
        
        /** The template parameters for the table template */
        $tag_values            = array(
								    "title" => $title,
								    "header" => $header_html,
								    "body" => $body_html,
								    "footer" => $footer_html,
								    "css_tags" => $header_tags['css'],
									"js_tags" => $header_tags['javascript'],
									"font_tags" => $header_tags['fonts'],
									"ga_code" => $ga_tracking_code
							    );
        /** The html for the page */
        $page_html             = Config::GetComponent("templateengine")->Generate("page", $tag_values);

        return $page_html;  
    }
}
