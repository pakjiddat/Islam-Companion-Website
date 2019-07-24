<?php

declare(strict_types=1);

namespace IslamCompanion\Ui\Pages;

use \Framework\Config\Config as Config;

/** 
 * This class provides functions that generate the frontend for the Hadith Navigator
 *
 * @category   Pages
 * @author     Nadir Latif <nadir@pakjiddat.pk>
 * @license    https://www.gnu.org/licenses/gpl-2.0.html GNU General Public License, version 2
 */
class Hadith extends BasePage
{   
    /**
     * It sets the custom JavaScript, CSS and Font files to application configuration
     */
    public function UpdateHeaderTags() : void
    {
        /** The custom JavaScript files are fetched */
        $custom_javascript                              = Config::$config["general"]["custom_js_files"];
        /** The custom CSS files are fetched */
        $custom_css                                     = Config::$config["general"]["custom_css_files"];
                
        /** The hadith JavaScript files are fetched */
        $hadith_javascript                              = Config::$config["general"]["hadith_js_files"];
        /** The Hadith JavaScript files are merged with the custom JavaScript files */
        $custom_javascript                              = array_merge($custom_javascript, $hadith_javascript);
        /** The custom JavaScript files are updated */
        Config::$config["general"]["custom_js_files"]   = $custom_javascript;
            
        /** The Hadith CSS files are fetched */
        $hadith_css                                     = Config::$config["general"]["hadith_css_files"];
        /** The Hadith CSS files are merged with the custom CSS files */
        $custom_css                                     = array_merge($custom_css, $hadith_css);
        /** The custom CSS files are updated */
        Config::$config["general"]["custom_css_files"]  = $custom_css;
                        
        /** The custom font list is set */
        $this->SetCustomFontList();
    }
    
    /**
     * It provides the html for the page body
     *
     * @param array $params the parameters for generating the body
     *
     * @return string $body_html the html for the body
     */
    protected function GetBody(?array $params = null) : string
    {
        /** The html for the navigation tab of the hadith page is generated */
    	$navigation_html = Config::GetComponent("templateengine")->Generate("body/hadith/navigation", array());
        /** The html for the settings tab of the hadith page is generated */
    	$settings_html   = Config::GetComponent("templateengine")->Generate("body/hadith/settings", array());
        /** The html for the search tab of the hadith page is generated */
    	$search_html     = Config::GetComponent("templateengine")->Generate("body/common/search_tab", array());    	
        /** The scroll top html */
        $scroll_top_html = Config::GetComponent("widgetmanager")->Generate("scrolltop");
        
        /** The parameters for the email tab template */
        $params          = array("info" => "Get Hadith by email");
        /** The email tab html */
        $email_html      = Config::GetComponent("templateengine")->Generate("body/common/email", $params);
        
    	/** The search template html */
        $stemplate_html  = Config::GetComponent("templateengine")->Generate("body/common/search_template", array());
        /** The parameters for the html templates */
        $params          = array("search_template" => $stemplate_html);
        /** The templates html */
        $templates_html  = Config::GetComponent("templateengine")->Generate("body/hadith/templates", $params);
        
    	/** The parameters used to generate the tabs template */
        $params          = array(
                               "navigation" => $navigation_html,
                               "settings" => $settings_html,
                               "search" => $search_html,
                               "email" => $email_html
                            );
        /** The tabs html */
        $tabs_html       = Config::GetComponent("templateengine")->Generate("body/hadith/tabs", $params);
        
        /** The parameters used to generate the quran navigator */
        $params          = array(
                               "item_name" => "Hadith",                               
                               "tabs" => $tabs_html,
                               "scroll" => $scroll_top_html,
                               "templates" => $templates_html                               
                            );
        /** The html for the body of the hadith page is generated */
    	$body_html       = Config::GetComponent("templateengine")->Generate("body/common/nav_base.html", $params);
    	
    	return $body_html;
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
        $footer_html   = Config::GetComponent("templateengine")->Generate("body/common/footer", $params);
		
		return $footer_html;
    }
}
