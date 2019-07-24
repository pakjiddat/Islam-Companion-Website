<?php

declare(strict_types=1);

namespace IslamCompanion\Ui\Pages;

use \Framework\Config\Config as Config;
use \Framework\Utilities\UtilitiesFramework as UtilitiesFramework;

/**
 * This class provides functions for generating the Contact page
 *
 * @category   Pages
 * @author     Nadir Latif <nadir@pakjiddat.pk>
 * @license    https://www.gnu.org/licenses/gpl-2.0.html GNU General Public License, version 2
 */
class Contact extends BasePage
{	
	/**
     * It sets the custom JavaScript, CSS and Font files to application configuration depending on the current page
     */
    public function UpdateHeaderTags() : void
    {
        /** The custom JavaScript files are fetched */
        $custom_javascript                              = Config::$config["general"]["custom_js_files"];                
        /** The Contact page JavaScript files are fetched */
        $contact_javascript                             = Config::$config["general"]["contact_js_files"];
        /** The Subscription JavaScript files are merged with the custom JavaScript files */
        $custom_javascript                              = array_merge($custom_javascript, $contact_javascript);
        /** The custom JavaScript files are updated */
        Config::$config["general"]["custom_js_files"]   = $custom_javascript;
        /** The custom font file list is set to empty */
        Config::$config["general"]["custom_font_files"] = array();       
    }
    
    /**
     * It saves the contact message to database
     * It also emails the contact message to the admin
     *
     * @param string $email the users email address
     * @param string $message the message text
     * @param string $name the users name
     *
     * @return json $response the function response
     *    message => string the response message
     *    result => string [success,error] the result of the function
     */
    public function SendContactMessage(string $email, string $message, string $name) : string
	{
        /** The function response */
        $response         = array("message" => "Message succesfully sent !", "result" => "success");
        /** The Database object is fetched */
        $database         = Config::GetComponent("dbinit")->GetDbManagerClassObj("Database");            
        /** The subscription table name */
        $table_name       = Config::$config["general"]["mysql_table_names"]["contact"];
        /** The from email address */
        $email_from       = Config::$config["custom"]["contact_config"]["email_from"];
        /** The admin email address */
        $email_to         = Config::$config["custom"]["contact_config"]["email_to"];
        /** The subject of contact email */
        $subject          = Config::$config["custom"]["contact_config"]["email_subject"];
        
        /** The sql query for adding subscriber */       
        $sql              = "INSERT INTO " . $table_name . " (name, email, message, updated_on) VALUES(?,?,?,?)";
        /** The query parameters */
        $query_params     = array(
                                $name,
                                $email,
                                $message,
                                time()
                            );
        /** The row is added */
        $is_run           = $database->Execute($sql, $query_params);
        
        /** The email text */
        $text             = <<< EOT
        
        
    Hello Admin !. The following contact request was sent from Pak Jiddat website:
        
    Name: $name
    Email: $email
    Message:$message
EOT;

        /** The parameters for the email object */
        $params           = array("params" => array(), "backend" => "mail");      
        /** The email is sent */
        $is_sent          = UtilitiesFramework::Factory("email", $params)->SendEmail(
                                $email_from,
                                $email_to,
                                $subject,
                                $text
                            );
        
        /** If the sql query could not be run or the email could not be sent */
        if (!$is_run || !$is_sent) {
            /** The function response */
            $response     = array(
                                "message" => "Your message could not be sent. Please send an email to " . $email_from,
                                "result" => "error"
                            );
        }
        
        /** The response is json encoded and sent */
        return json_encode($response);
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
        /** The html for the body of the contact page is generated */
    	$body_html  = Config::GetComponent("templateengine")->Generate("body/contact/main", array());
    	
    	return $body_html;
    }
}
