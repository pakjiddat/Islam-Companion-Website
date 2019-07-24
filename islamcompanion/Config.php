<?php

declare(strict_types=1);

namespace IslamCompanion;

ini_set("include_path", '/home/pakjidda/php:' . ini_get("include_path") );

/**
 * Application configuration class
 *
 * @category   Config
 * @author     Nadir Latif <nadir@pakjiddat.pk>
 * @license    https://www.gnu.org/licenses/gpl-2.0.html GNU General Public License, version 2
 */
final class Config extends \Framework\Config\Config
{
    /**
     * Used to determine if the application request should be handled by the current module
     *
     * It returns true if the host name contains islamcompanion.pk
     * Otherwise it returns false
     *
     * @param array $parameters the application parameters
     *
     * @return boolean $is_valid indicates if the application request is valid
     */
    public static function IsValid(array $parameters) : bool
    {
    	/** The request is marked as not valid by default */
    	$is_valid     = false;
        /** If the host name is islamcompanion.pk and the url contains /api/ */
        if (isset($_SERVER['HTTP_HOST']) && 
            ($_SERVER['HTTP_HOST'] == "islamcompanion.pakjiddat.pk" || 
            $_SERVER['HTTP_HOST'] == "dev.islamcompanion.pakjiddat.pk")
            && strpos($_SERVER['REQUEST_URI'], "/api/") === false) {
        	$is_valid = true;
        }
        /** If the application is being run from command line and the application name is islamcompanion */
        else if (php_sapi_name() == "cli" && $parameters['application'] == "islamcompanion") {
            $is_valid = true;
        }

        return $is_valid;
    }
}
