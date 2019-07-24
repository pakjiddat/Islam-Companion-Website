<?php

declare(strict_types=1);

namespace IslamCompanion\Config;

/**
 * This class provides path application configuration
 *
 * @category   Config
 * @author     Nadir Latif <nadir@pakjiddat.pk>
 * @license    https://www.gnu.org/licenses/gpl-2.0.html GNU General Public License, version 2
 */
final class Path
{
    /**
     * It returns an array containing path configuration data
     *
     * @param array $parameters the application parameters
     *
     * @return array $config the custom configuration
     */
    public function GetConfig(array $parameters) : array
    {
      	/** The required application configuration */
    	$config                                       = array();
    
        /** If the application is in development mode */
        if ($parameters['dev_mode']) {
            /** The path to the pear folder */
            $config['pear_folder_path']              = "/usr/share/php";
        }
        /** If the application is in production mode */
        else {
            /** The path to the pear folder */
            $config['pear_folder_path']              = "/home4/pakjidda/php";
        }
        
        /** The files to include for all application requests */
		$config['include_files'] 					 = array("pear" => array("Mail/mime.php", "Mail.php"));
		/** If the application is being run from command line */
		if (php_sapi_name() == "cli") {
		    /** The cloudinary sdk autoload file */
		    $config['include_files']["vendors"] = array("cloudinary/autoload.php");
        }		                                                   

        return $config;
    }

}
