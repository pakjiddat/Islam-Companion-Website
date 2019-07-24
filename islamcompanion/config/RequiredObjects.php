<?php

declare(strict_types=1);

namespace IslamCompanion\Config;

/**
 * This class provides required objects application configuration
 *
 * @category   Config
 * @author     Nadir Latif <nadir@pakjiddat.pk>
 * @license    https://www.gnu.org/licenses/gpl-2.0.html GNU General Public License, version 2
 */
final class RequiredObjects
{
    /**
     * It returns an array containing requiredobjects configuration data
     *
     * @param array $parameters the application parameters
     *
     * @return array $config the custom configuration
     */
    public function GetConfig(array $parameters) : array
    {
      	/** The required application configuration */
    	$config                                    = array();

        /** If the application is in development mode */
        if ($parameters['dev_mode']) {
            /** The database name */
            $db                                       = "dev-db-name";
            /** The dsn value */
            $dsn                                      = "mysql:host=localhost;dbname=" . $db . ";charset=utf8";
        	/** The database parameters */
        	$dbparams                                 = array(
		                                                    "dsn" => $dsn,
				                                            "user_name" => "user-name",
				                                            "password" => "password",
				                                            "use_cache" => false,
				                                            "debug" => 2,
				                                            "app_name" => "Islam Companion Api"
	                                                    );
            /** The framework database parameters */
            $fwdbparams                               = $dbparams;
        }
        /** If the application is in production mode */
        else {
            /** The dsn value */
            $dsn                                 = "mysql:host=localhost;dbname=prod-db-name;charset=utf8";
            /** The database parameters */
            $dbparams                            = array(
                                                       "dsn" => $dsn,
				                                       "user_name" => "user-name",
				                                       "password" => "password",
				                                       "debug" => 2,
				                                       "use_cache" => false,
				                                       "app_name" => "Islam Companion Api"
                                                   );
            /** The framework database parameters */
            $fwdbparams                               = $dbparams;
        }									          
																
    	$config['holyquranpage']['class_name']         = '\IslamCompanion\Ui\Pages\HolyQuran';
    	$config['hadithpage']['class_name']            = '\IslamCompanion\Ui\Pages\Hadith';
	   	$config['homepage']['class_name']              = '\IslamCompanion\Ui\Pages\Home';
	   	$config['subscriptionpage']['class_name']      = '\IslamCompanion\Ui\Pages\Subscription';
	   	$config['contactpage']['class_name']           = '\IslamCompanion\Ui\Pages\Contact';
	   	
	   	$config['hadithdownloadpage']['class_name']    = '\IslamCompanion\Ui\Pages\HadithDownload';
	   		   	
	    $config['subscriptionemail']['class_name']     = '\IslamCompanion\Lib\SubscriptionEmail';
	    $config['subscriptionform']['class_name']      = '\IslamCompanion\Lib\SubscriptionForm';
	    $config['subscriptioncronjob']['class_name']   = '\IslamCompanion\CronJobs\CjSubscription';
	    
	    $config['websitetools']['class_name']          = '\IslamCompanion\Scripts\WebsiteTools';
	    
	   	$config['application']['class_name']           = '\IslamCompanion\Ui\Pages\Home';
        $config['cliapplication']['class_name']        = '\IslamCompanion\Scripts\WebsiteTools';	    
	   	
	   	/** The framework database object parameters */
        $config['dbinit']['parameters']                = $dbparams;		
        /** The mysql database access class is specified with parameters for the pakjiddat_com database */
        $config['frameworkdbinit']['parameters']       = $fwdbparams;

        return $config;
    }

}
