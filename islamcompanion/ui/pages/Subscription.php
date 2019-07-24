<?php

declare(strict_types=1);

namespace IslamCompanion\Ui\Pages;

use \Framework\Config\Config as Config;
use \Framework\Utilities\UtilitiesFramework as UtilitiesFramework;

/**
 * This class provides functions for generating the Subscription page
 *
 * @category   Pages
 * @author     Nadir Latif <nadir@pakjiddat.pk>
 * @license    https://www.gnu.org/licenses/gpl-2.0.html GNU General Public License, version 2
 */
class Subscription extends BasePage
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
                
        /** The Subscription JavaScript files are fetched */
        $subscribe_javascript                           = Config::$config["general"]["subscribe_js_files"];
        /** The Subscription JavaScript files are merged with the custom JavaScript files */
        $custom_javascript                              = array_merge($custom_javascript, $subscribe_javascript);
        /** The custom JavaScript files are updated */
        Config::$config["general"]["custom_js_files"]   = $custom_javascript;
    }
    
    /**
     * It returns the font tags for the current language     
     *
     * @return string $font_tags the required font tags
     */
    public function GetFontTagsForEmail($language) : string
    {
        /** The required font tags */
        $font_tags        = "";
        /** The custom font files */
        $font_files       = Config::$config["general"]["font_list"];
        /** The userinterface folder url */
        $ui_folder_url    = Config::$config["path"]["app_ui_url"];
	    /** The language for Holy Quran email */
	    $language         = Config::$config["custom"]["subscription_config"]["quran_email_language"];        
        /** Each custom font file is checked */
        foreach ($font_files as $languages => $font_file_details) {
            /** The language list is converted to array */
            $languages    = explode(",", $languages);
            
            /** If the font language includes the Navigator language */
            if (in_array($language, $languages)) {
                /** The url is updated */
                $font_file_details["url"] = str_replace("{app_ui}", $ui_folder_url, $font_file_details["url"]);
                /** The fonts template file is rendered */
        	    $font_tags                = Config::GetComponent("templateengine")->Generate(
	                                            "font_tags.html",
	                                            $font_file_details
	                                        );
	            /** The loop ends */
	            break;
            }
        }
        
        return $font_tags;
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
        /** The html for the body of the hadith page is generated */
    	$body_html  = Config::GetComponent("templateengine")->Generate("body/subscribe/main", array());
    	
    	return $body_html;
    }
}
