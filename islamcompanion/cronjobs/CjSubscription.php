<?php

declare(strict_types=1);

namespace IslamCompanion\CronJobs;

use \Framework\Config\Config as Config;
use \Framework\Utilities\UtilitiesFramework as UtilitiesFramework;

/**
 * This class provides functions for sending subscription emails
 *
 * @category   Library
 * @author     Nadir Latif <nadir@pakjiddat.pk>
 * @license    https://www.gnu.org/licenses/gpl-2.0.html GNU General Public License, version 2
 */
class CjSubscription
{       
    /**
     * It sends emails to all subscribers registered in database
     * The email contains Holy Quran and Hadith text
     *
     * @return json $response the function response
     *    message => string the response message
     *    result => string [success,error] the result of the function
     */
    public function EmailSubscribers() : string
    {
        /** The function response */
        $response                   = array("message" => "Emails were successfully sent", "result" => "success");
        /** The Database object is fetched */
        $database                   = Config::GetComponent("dbinit")->GetDbManagerClassObj("Database");            
        /** The subscription table name */
        $table_name                 = Config::$config["general"]["mysql_table_names"]["subscription"];
        /** The from email address */
        $email_from                 = Config::$config["custom"]["subscription_config"]["email_from"];
                
        /** The SQL query */
        $sql                        = "SELECT * FROM " . $table_name;
        /** All rows are fetched */
        $data                       = $database->AllRows($sql);

        /** If no data was found */
        if (!is_array($data)) {
            /** The response is set */
            $response               = array("message" => "No subscribers were found", "result" => "success");
            /** The response is json encoded and returned */
            return json_encode($response);
        }
        
        /** Each subscribers data is checked */
        for ($count = 0; $count < count($data); $count++) {
            /** The type of email to send */
            $type      = $data[$count]['type'];
            /** The email address */
            $email     = $data[$count]['email'];
            /** The extra data is json decoded */
            $extra     = json_decode($data[$count]['extra'], true);
            /** If the type is Holy Quran */
            if ($type == 'Holy Quran') {
                /** The narrator */
                $narrator    = $extra["narrator"];
                /** The language */
                $language    = $extra["language"];
                /** Indicates if language is rtl */
                $is_rtl      = $extra["is_rtl"];
                /** The email contents are fetched */
                $contents    = Config::GetComponent("subscriptionemail")->GetHolyQuranEmailText(
                                   $email,
                                   $language,
                                   $narrator,
                                   $is_rtl
                               );
                /** The email subject is set */
                $subject     = Config::$config["custom"]["subscription_config"]["quran_email_subject"];
            }
            /** If the type is Hadith */
            else if ($type == 'Hadith') {
                /** The language */
                $language    = $extra["language"];
                /** Indicates if language is rtl */
                $is_rtl      = $extra["is_rtl"];
                /** The email contents are fetched */
                $contents    = Config::GetComponent("subscriptionemail")->GetHadithEmailText(
                                   $email,
                                   $language,
                                   $is_rtl
                               );
                /** The email subject is set */
                $subject  = Config::$config["custom"]["subscription_config"]["hadith_email_subject"];                
            }
            
            /** The parameters for the email object */
            $params    = array("params" => array(), "backend" => "mail");
            /** The email is sent */
            UtilitiesFramework::Factory("email", $params)->SendEmail(
                $email_from,
                $email,
                $subject,
                $contents
            );
        }
        
        /** The response is json encoded and returned */
        return json_encode($response);
    }
}
