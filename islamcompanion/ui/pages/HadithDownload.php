<?php

declare(strict_types=1);

namespace IslamCompanion\Ui\Pages;

use \Framework\Config\Config as Config;
use \Framework\Utilities\UtilitiesFramework as UtilitiesFramework;

/**
 * This class provides functions for generating the Hadith download page
 *
 * @category   Pages
 * @author     Nadir Latif <nadir@pakjiddat.pk>
 * @license    https://www.gnu.org/licenses/gpl-2.0.html GNU General Public License, version 2
 */
class HadithDownload extends BasePage
{
	/**
     * It sets the custom JavaScript, CSS and Font files to application configuration
     */
    public function UpdateHeaderTags() : void
    {
        /** The custom JavaScript files are fetched */
        $custom_javascript                              = Config::$config["general"]["custom_js_files"];
        /** The HadithDownload page JavaScript files are fetched */
        $hadithdownload_javascript                      = Config::$config["general"]["hadithdownload_js_files"];
        /** The HadithDownload JavaScript files are merged with the custom JavaScript files */
        $custom_javascript                              = array_merge($custom_javascript, $hadithdownload_javascript);
        /** The custom JavaScript files are updated */
        Config::$config["general"]["custom_js_files"]   = $custom_javascript;
        /** The custom font file list is set to empty */
        Config::$config["general"]["custom_font_files"] = array();       
    }
    
    /**
     * It emails a download link to the given email address
     *
	 * @param string $email the email address of the user
	 *
     * @return json $response the function response
     *    message => string the response message
     *    result => string [success,error] the result of the function
     */
    public function EmailDownloadLink(string $email) : string
    {
        /** The function response */
        $response           = array(
                                  "message" => "Download link was successfully sent to the provided email address !",
                                  "result" => "success"
                              );
        /** The from email address */
        $email_from         = Config::$config["custom"]["hadithdownload_config"]["email_from"];        
        /** The to email address */
        $email_to           = $email;
        /** The subject of email sent to user */
        $subject            = Config::$config["custom"]["hadithdownload_config"]["email_subject"];
        /** The site url */
        $site_url           = Config::$config["general"]["site_url"];
        /** The download link */
        $download_link      = $site_url . "/download-file/?t=" . time() . "&email=" . urlencode($email_to);
        /** The email text */
        $text          = <<< EOT
        
        
        Please click <a href='$download_link'>here</a> to download the Hadith database.
        
        The download link will expire after 1 hour.
EOT;
        
        /** The parameters for the email object */
        $params                 = array("params" => array(), "backend" => "mail");
        /** Notification email is sent to the admin */
        $is_sent                = UtilitiesFramework::Factory("email", $params)->SendEmail(
                                      $email_from,
                                      $email_to,
                                      $subject,
                                      $text
                                  );
        
        /** If the email could not be sent */
        if (!$is_sent) {
            /** The function response */
            $response     = array(
                                "message" => "Download link could not be sent. Please send an email to " . $email_from,
                                "result" => "error"
                            );
        }
        
        /** The response is json encoded */
        $response              = json_encode($response);
        
        return $response;
    }
    
    /**
     * It saves the email address to database and starts the file download
     * If the download link is expired, then an error message is shown to the user
     *
	 * @param string $email the email address of the user
	 * @param string $t the unix timestamp at which the download email was sent to the user
	 *
     * @return string $response the function response. it may be the downloaded file or a JavaScript alert message
     */
    public function DownloadFile(string $email, string $t) : string
    {
        /** If the current time stamp is over 30 minutes past the given timestamp */
        if ((time() - $t) > (30 * 60)) {
            /** The error response */
            $response = "<script>alert('Your download link has expired. Please request another download link');";
            $response .= "location.href='/hadith-download';</script>";
            /** The error message is returned */
            return $response;         
        }
       
        /** The Database object is fetched */
        $database         = Config::GetComponent("dbinit")->GetDbManagerClassObj("Database");            
        /** The subscription table name */
        $table_name       = Config::$config["general"]["mysql_table_names"]["hadith_download"];
        
        /** The from email address */
        $email_from       = Config::$config["custom"]["downloadfile_config"]["email_from"];
        /** The admin email address */
        $email_to         = Config::$config["custom"]["downloadfile_config"]["email_to"];
        /** The subject of contact email */
        $subject          = Config::$config["custom"]["downloadfile_config"]["email_subject"];            
        
        /** The sql query for adding subscriber */       
        $sql              = "INSERT INTO " . $table_name . " (email, created_on) VALUES(?,?)";
        /** The query parameters */
        $query_params     = array($email, time());
        /** The row is added */
        $is_run           = $database->Execute($sql, $query_params);
        
        /** The email text */
        $text             = <<< EOT
        
        
    Hello Admin !. A user with email address: $email has downloaded the hadith database.
    
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
        
        /** The location of the download file */
        $file_path        = Config::$config["custom"]["downloadfile_config"]["file_path"];
        /** The http headers for downloading the file */
        header('Content-Type: application/octet-stream');
        header('Content-Disposition: attachment; filename="islamcompanion.sql.tar.bz2"');
        /** The sql file is read */
        readfile($file_path);
        /** Script execution ends */
        die();
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
        /** The html for the body of the hadith download page is generated */
    	$body_html  = Config::GetComponent("templateengine")->Generate("body/hadith-download/main", array());
    	
    	return $body_html;
    }
}
