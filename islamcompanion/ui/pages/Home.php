<?php

declare(strict_types=1);

namespace IslamCompanion\Ui\Pages;

use \Framework\Config\Config as Config;

/**
 * This class provides functions that generate the Home page
 *
 * @category   Pages
 * @author     Nadir Latif <nadir@pakjiddat.pk>
 * @license    https://www.gnu.org/licenses/gpl-2.0.html GNU General Public License, version 2
 */
class Home extends BasePage
{	
	/**
     * It sets the custom JavaScript, CSS and Font files to application configuration
     */
    public function UpdateHeaderTags() : void
    {                
        /** The custom font file list is set to empty */
        Config::$config["general"]["custom_font_files"] = array();
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
        /** The html for the home page body is generated */
    	$body_html  = Config::GetComponent("templateengine")->Generate("home", array());
    	
    	return $body_html;
    }
}
