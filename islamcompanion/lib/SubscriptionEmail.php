<?php

declare(strict_types=1);

namespace IslamCompanion\Lib;

use \Framework\Config\Config as Config;
use \Framework\Utilities\UtilitiesFramework as UtilitiesFramework;

/**
 * This class provides functions for sending subscription emails
 *
 * @category   Library
 * @author     Nadir Latif <nadir@pakjiddat.pk>
 * @license    https://www.gnu.org/licenses/gpl-2.0.html GNU General Public License, version 2
 */
class SubscriptionEmail
{   
  	/**
     * It generates the text of email to be sent to Holy Quran subscribers
     * It generates the Holy Quran verses randomly
     *
     * @param string $email the email address at which the email will be sent
     * @param string $language the language for the verse text
     * @param string $narrator the narrator for the verse text
     * @param string $is_rtl [yes,no] indicates if language is rtl
     *
     * @return string $email_text the text of the Holy Quran subscription email
     */
    public function GetHolyQuranEmailText(string $email, string $language, string $narrator, string $is_rtl) : string
	{
	    /** The url for fetching the random verses */
	    $url                 = Config::$config["custom"]["api_url"] . "get_random_verses";
	    /** The userinterface folder url */
        $ui_folder_url       = Config::$config["path"]["app_ui_url"];
        /** The site url */
        $site_url            = Config::$config["general"]["site_url"];
        /** The unsubscribe link */
        $unsubscribe_link    = $site_url . "/subscribe/remove/?email=" . urlencode($email);
        $unsubscribe_link    .= "&type=" . urlencode("Holy Quran");

	    /** The parameters for the request */
	    $parameters          = array(
	                               "language" => $language,
                                   "narrator" => $narrator
                                );
        /** The parameters are json encoded */
        $parameters          = json_encode($parameters);                            
        /** The Holy Quran data is fetched */
        $data                = UtilitiesFramework::Factory("urlmanager")->GetFileContent($url, "POST", $parameters);
        /** The data is json decoded */
        $data                = json_decode($data, true);
        /** The font tags are fetched */
        $font_tags           = Config::GetComponent("subscriptionpage")->GetFontTagsForEmail($language);
 
        /** The sura name is parsed */
        $temp_arr            = explode(" (", $data['meta_data']["sura"]);
        /** The short sura name */
        $short_sura_name     = $temp_arr[0];
        
        /** The formatted ayat list */
        $ayat_list           = array();
        /** Each verse is checked */
        for ($count = 0; $count < count($data['translation']); $count++) {
            /** The sura ayat */
            $sura_ayat                    = ($data['meta_data']["start_ayat"] + $count + 1);
            /** The verse meta data */
            $verse_meta_data              = "<span class='verse-meta-data'>(" . $short_sura_name . " ";
            $verse_meta_data             .= $data['meta_data']["sura_id"] . ":" . $sura_ayat . ")</span>";
            /** The verse text is sanitized */
            $data['translation'][$count] = strip_tags($data['translation'][$count]);
            /** The verse meta data is appended to the ayat text */
            $ayat_text                   = $data['translation'][$count] . "&nbsp;&nbsp;" .$verse_meta_data;
            /** The ayat text is enclosed in list item tags */
            $ayat_text                   = "<li>" . $ayat_text . "</li>\n";
            /** The ayat list is updated */
            $ayat_list                   []= $ayat_text;
        }
        
        /** The ayat list is formatted */
        $ayat_text           = implode("", $ayat_list);
        
        /** The css classes */
        $css_classes         = ($is_rtl == "yes") ? "rtl-list rtl-text" : "ltr-text";
        /** The template parameters */
        $params              = array(
                                   "title" => "Holy Quran",
                                   "font_tags" => $font_tags,
                                   "narrator" => $narrator,
                                   "sura" => $data['meta_data']["sura"],
                                   "language" => $language,
                                   "start_ayat" => $data['meta_data']["start_ayat"],
                                   "end_ayat" => $data['meta_data']["end_ayat"],
                                   "body" => $ayat_text,
                                   "unsubscribe_link" => $unsubscribe_link,
                                   "css_classes" => $css_classes
                               );
	                            
        $email_text          = Config::GetComponent("templateengine")->Generate(
	                               "quran-email.html",
	                               $params
	                           );
	          
        return $email_text;	                                        
	}
	
	/**
     * It generates the text of email to be sent to Hadith subscribers
     * It generates the Hadith text randomly
     *
     * @param string $email the email address at which the email will be sent
     * @param string $language the language for the verse text
     * @param string $narrator the narrator for the verse text
     * @param string $is_rtl [yes,no] indicates if language is rtl
     *
     * @return string $email_text the text of the Hadith subscription email
     */
    public function GetHadithEmailText(string $email, string $language, string $is_rtl) : string
	{
        /** The url for fetching the random hadith text */
	    $url                 = Config::$config["custom"]["api_url"] . "get_random_hadith";
	    /** The number of hadith to fetch */
	    $hadith_count        = Config::$config["custom"]["subscription_config"]["hadith_count"];
	    /** The language for the hadith email */
	    $hadith_language     = $language;
	    /** The parameters for the request */
	    $parameters          = array(
	                               "hadith_count" => $hadith_count,
	                               "language" => $hadith_language
                               );
        /** The parameters are json encoded */
        $parameters          = json_encode($parameters);                            
        /** The Holy Quran data is fetched */
        $data                = UtilitiesFramework::Factory("urlmanager")->GetFileContent($url, "POST", $parameters);
        /** The data is json decoded */
        $data                = json_decode($data, true);
        /** The font tags are fetched */
        $font_tags           = Config::GetComponent("subscriptionpage")->GetFontTagsForEmail($hadith_language);
	    /** The userinterface folder url */
        $ui_folder_url       = Config::$config["path"]["app_ui_url"];
        /** The site url */
        $site_url            = Config::$config["general"]["site_url"];
        /** The unsubscribe link */
        $unsubscribe_link    = $site_url . "/subscribe/remove/?email=" . urlencode($email) . "&type=Hadith";
        
        /** The formatted hadith list */
        $hadith_list         = array();
        /** Each hadith text is checked */
        for ($count = 0; $count < count($data); $count++) {
            /** The hadith book */
            $book      = $data[$count]['book'];
            /** The hadith source */
            $source    = $data[$count]['source'];
            /** The hadith number */
            $number    = $data[$count]['hadith_number'];
            /** The hadith text */
            $text      = $data[$count]['hadith_text'];
            /** The hadith text is sanitized */
            $text      = strip_tags($text);
                        
            /** The hadith meta data */
            $meta_data = "<div><i><span class='hadith-meta-data rtl-text'>" . $source . " - " . $book;
            /** If the number is ltr */
            if ($is_rtl == "no")
                /** The meta data for the hadith */
                $meta_data .= " - #" . $number . " </span></i></div>";
            /** If the number is rtl */
            else if ($is_rtl == "yes")
                /** The meta data for the hadith */
                $meta_data .= " - " . $number . "#</span></i></p>";

            /** The meta data is appended to the hadith text */
            $hadith_text     = $text . $meta_data;
            /** The ayat text is enclosed in list item tags */
            $hadith_text     = "<li>" . $hadith_text . "</li>\n";
            /** The ayat list is updated */
            $hadith_list    []= $hadith_text;
        }
        
        /** The ayat list is formatted */
        $hadith_text          = implode("", $hadith_list);
        
        /** The css classes */
        $css_classes          = ($is_rtl == "yes") ? "rtl-list rtl-text" : "ltr-text";        
        /** The template parameters */
        $params               = array(
                                   "title" => "Hadith",
                                   "font_tags" => $font_tags,
                                   "body" => $hadith_text,
                                   "unsubscribe_link" => $unsubscribe_link,
                                   "css_classes" => $css_classes
                                );
	                            
        $email_text           = Config::GetComponent("templateengine")->Generate(
	                               "hadith-email.html",
	                               $params
	                            );
	               
        return $email_text;
	}
}
