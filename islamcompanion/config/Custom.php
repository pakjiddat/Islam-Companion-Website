<?php

declare(strict_types=1);

namespace IslamCompanion\Config;

/**
 * This class provides custom application configuration
 *
 * @category   Config
 * @author     Nadir Latif <nadir@pakjiddat.pk>
 * @license    https://www.gnu.org/licenses/gpl-2.0.html GNU General Public License, version 2
 */
final class Custom
{
    /**
     * It returns an array containing general configuration data
     *
     * @param array $parameters the application parameters
     *
     * @return array $configuration the custom configuration
     */
    public function GetConfig(array $parameters) : array
    {
      	/** The required application configuration */
    	$config                               = array();                                                           
    	/** The configuration for subscription emails */
    	$config['subscription_config']        = array(
    	                                            "quran_email_narrator" => "Abul A'ala Maududi",
    	                                            "quran_email_language" => "Urdu",
    	                                            "hadith_email_language" => "Urdu",
    	                                            "subscribe_subject" => "Subscription request received",
    	                                            "unsubscribe_subject" => "A user has unsubscribed",
    	                                            "quran_email_subject" => "Holy Quran",
    	                                            "hadith_email_subject" => "Hadith",
    	                                            "hadith_count" => 5,
    	                                            "email_from" => "nadir@pakjiddat.pk",
                	                                "email_to" => "nadir@pakjiddat.pk"
    	                                        );
    	 
        /** The configuration for contact form */
    	$config['contact_config']             = array(
                	                                "email_subject" => "Contact request sent from Islam Companion website",
                	                                "email_from" => "nadir@pakjiddat.pk",
                	                                "email_to" => "nadir@pakjiddat.pk"
                	                            );
                	                            
        /** The configuration for hadith download form */
    	$config['hadithdownload_config']      = array(
                	                                "email_subject" => "Islam Companion - Hadith Database",
                	                                "email_from" => "nadir@pakjiddat.pk"
                	                            );
               	                                            	                                                                   
        /** If the application is in development mode */
        if ($parameters['dev_mode']) {
        	/** The email address from which to send the email */
        	$config['subscription_config']['email_from'] = "nadir@dev.pakjiddat.pk";
            /** The email address to which email should be sent, notifying of new subscriber */
        	$config['subscription_config']['email_to']   = "nadir@dev.pakjiddat.pk";
        	/** The email address from which to send the email */
        	$config['contact_config']['email_from']      = "nadir@dev.pakjiddat.pk";
            /** The email address to which email should be sent, notifying of new subscriber */
        	$config['contact_config']['email_to']        = "nadir@dev.pakjiddat.pk";  
        	/** The email address to which email should be sent, notifying of new subscriber */
        	$config['downloadfile_config']['email_to']   = "nadir@dev.pakjiddat.pk";  
        	/** The api url */
        	$config['api_url']                           = "http://dev.islamcompanion.pakjiddat.pk/api/";        	
            /** The file path */
            $file_path                                   = "/var/www/html/pakjiddat/islamcompanion/";
            $file_path                                   .= "islamcompanion/data/hadith.sql.tar.bz2";
    	}
    	/** If the application is in production mode */
        else {    	
        	/** The api url */
           	$config['api_url']                           = "https://islamcompanion.pakjiddat.pk/api/";
            /** The file path */
            $file_path                                   = "/home/pakjidda/subdomains/islamcompanion.pakjiddat.pk/islamcompanion/data/";
            $file_path                                   .= "hadith.sql.tar.bz2";        	
    	}   	    	
    	
        /** The configuration for hadith download file */
    	$config['downloadfile_config']        = array(
                	                                "email_subject" => "Hadith database downloaded by user",
                	                                "email_from" => "nadir@pakjiddat.pk",
                	                                "email_to" => "nadir@pakjiddat.pk",
                	                                "file_path" => $file_path
                	                            ); 
                	                            
        return $config;
    }
}
