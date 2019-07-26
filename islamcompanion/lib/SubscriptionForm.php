<?php

declare(strict_types=1);

namespace IslamCompanion\Lib;

use \Framework\Config\Config as Config;
use \Framework\Utilities\UtilitiesFramework as UtilitiesFramework;

/**
 * This class provides functions for the subscription form
 * It provides functions for adding and removing subscribers
 *
 * @category   Library
 * @author     Nadir Latif <nadir@pakjiddat.pk>
 * @license    https://www.gnu.org/licenses/gpl-2.0.html GNU General Public License, version 2
 */
class SubscriptionForm
{
    /**
     * It adds an email subscriber to database
     *
     * @param string $email email the email address to add
     * @param json $extra the narrator and language encoded as json string     
     * @param string $type list [Holy Quran,Hadith] the type of subscription
     *
     * @return json $response the function response
     *    message => string the response message
     *    result => string [success,error] the result of the function
     */
    public function AddSubscriber(string $email, string $extra, string $type) : string
	{
        /** The function response */
        $response           = array("message" => "Email succesfully added !", "result" => "success");
        /** The Database object is fetched */
        $database           = Config::GetComponent("dbinit")->GetDbManagerClassObj("Database");            
        /** The subscription table name */
        $table_name         = Config::$config["general"]["mysql_table_names"]["subscription"];
        /** The from email address */
        $email_from         = Config::$config["custom"]["subscription_config"]["email_from"];        
        /** The to email address */
        $email_to           = Config::$config["custom"]["subscription_config"]["email_to"];
        /** The subject of notification email sent to admin */
        $subject            = Config::$config["custom"]["subscription_config"]["subscribe_subject"];
        
        /** The sql query for checking if email exists */
        $sql                = "SELECT count(*) as total from " . $table_name . " WHERE email=? AND type=?";
        /** The query parameters */
        $query_params       = array($email, $type);
        /** The first row is fetched */
        $row                = $database->FirstRow($sql, $query_params);
        /** If the email exists */
        if ($row['total'] >= 1) {
            /** The sql query for adding subscriber */       
            $sql            = "UPDATE " . $table_name . " SET extra=?, updated_on=? WHERE email=? AND type=?";
            /** The query parameters */
            $query_params   = array($extra, time(), $email, $type);
        }
        /** If the email does not exist */
        else {
            /** The sql query for adding subscriber */       
            $sql            = "INSERT INTO " . $table_name . " (type, email, extra, updated_on) VALUES(?,?,?,?)";
            /** The query parameters */
            $query_params   = array($type, $email, $extra, time());
        }      
        
        /** The row is added */
        $is_run             = $database->Execute($sql, $query_params);
        /** If the sql query could not be run */
        if (!$is_run) {
            /** The function response */
            $response  = array(
                             "message" => "Subscriber could not be added. Please send an email to " . $admin_email,
                             "result" => "error"
                         );
            /** The response is json encoded and sent */
            return json_encode($response);
        }
        
        
        /** The email text */
        $text          = <<< EOT
        
        
    Hello Admin!.
    
    A new subscriber has registered for $type emails with email address: $email
EOT;
        
        /** The parameters for the email object */
        $params                 = array("params" => array(), "backend" => "mail");
        /** Notification email is sent to the admin */
        UtilitiesFramework::Factory("email", $params)->SendEmail($email_from, $email_to, $subject, $text);
        
        /** The response is json encoded */
        $response              = json_encode($response);
        
        return $response;
	}		
    
    /**
     * It removes the given subscriber from database
     *
     * @param string $subscribers_email email the email address to add
     * @param string $subscription_type list [Holy Quran,Hadith] the type of subscription
     *
     * @return string $response the function response
     */
    public function RemoveSubscriber(string $subscribers_email, string $subscription_type) : string
    {
        /** The function response */
        $response           = "Email succesfully removed !";
        /** The Database object is fetched */
        $database           = Config::GetComponent("dbinit")->GetDbManagerClassObj("Database");            
        /** The subscription table name */
        $table_name         = Config::$config["general"]["mysql_table_names"]["subscription"];
        /** The from email address */
        $email_from         = Config::$config["custom"]["subscription_config"]["email_from"];        
        /** The to email address */
        $email_to           = Config::$config["custom"]["subscription_config"]["email_to"];
        /** The subject of notification email sent to admin */
        $subject            = Config::$config["custom"]["subscription_config"]["unsubscribe_subject"];
        
        /** The sql query for checking if email exists */
        $sql                = "SELECT count(*) as total from " . $table_name . " WHERE email=? AND type=?";
        /** The query parameters */
        $query_params       = array($subscribers_email, $subscription_type);
        /** The first row is fetched */
        $row                = $database->FirstRow($sql, $query_params);
        /** If the email does not exist */
        if ($row['total'] == 0) {
            /** The function response */
            $response       = "Email not found";
        }
        else {
            /** The sql query for removing subscriber */       
            $sql            = "DELETE FROM " . $table_name . " WHERE type=? AND email=?";
            /** The query parameters */
            $query_params   = array($subscription_type, $subscribers_email);
            /** The row is removed */
            $is_run         = $database->Execute($sql, $query_params);
            
            /** If the sql query could not be run */
            if (!$is_run) {
                /** The function response */
                $response  = "Subscriber could not be removed. Please send an email to " . $admin_email;
            }
            
            
            /** The email text */
            $text          = <<< EOT
            
            
        Hello Admin!.
        
        The subscriber with email address: $subscribers_email and subscription type: $subscription_type has unsubscribed
EOT;
            
            /** The parameters for the email object */
            $params        = array("params" => array(), "backend" => "mail");
            /** Notification email is sent to the admin */
            UtilitiesFramework::Factory("email", $params)->SendEmail($email_from, $email_to, $subject, $text);
        }
        
        /** The response in enclosed in alert message */
        $response          = "<script>alert('" . $response . "'); location.href='/';</script>";
        
        return $response;
    }
}
