<?php

declare(strict_types=1);

namespace IslamCompanion\Config;

/**
 * This class general application configuration
 *
 * @category   Config
 * @author     Nadir Latif <nadir@pakjiddat.pk>
 * @license    https://www.gnu.org/licenses/gpl-2.0.html GNU General Public License, version 2
 */
final class General
{
    /**
     * It returns an array containing general configuration data
     *
     * @param array $parameters the application parameters
     *
     * @return array $config the custom configuration
     */
    public function GetConfig(array $parameters) : array
    {
      	/** The required application configuration */
    	$config                       = array();

        /** The path to the pear folder */
        $config['app_name']           = "Islam Companion";
        /** The name of the template to use */
        $config['ui_framework']       = "bootstrap";        
        /** The language used by the navigators */
        $config['language']           = "Urdu";       
        /** Indicates if application is in development mode */
        $config['dev_mode']           = true;        
        /** Indicates that user access should be logged */
        $config['log_user_access']    = true;
        /** The custom commands */
        $config['commands']           = array("Upload Audio Files (uploads audio files to Cloudinary CDN)");
                
        /** If the application is in development mode */
        if ($config['dev_mode']) {
            /** The website url */        
            $config['site_url']       = "http://dev.islamcompanion.pakjiddat.pk";
        }
        /** If the application is in production mode */
        else {
            /** The website url */        
            $config['site_url']       = "https://islamcompanion.pakjiddat.pk";
        }
        
        
        /** The custom JavaScript file urls */
        $custom_url[0]                = "{fw_vendors}/jquery/js/jquery-3.3.1.min.js";
        $custom_url[1]                = "{fw_vendors}/bootstrap/js/bootstrap.bundle.min.js";
        
		/** The list of custom JavaScript files */
        $config['custom_js_files'][0] = array("url" => $custom_url[0], "type" => "text/javascript");
        $config['custom_js_files'][1] = array("url" => $custom_url[1], "type" => "text/javascript");
                                                               
        /** The custom Holy Quran JavaScript file urls */
        $custom_url[0]                = "{app_ui}/js/holy-quran/main.js"; 
        /** The list of custom JavaScript files used by Holy Quran navigator */
        $config['holyquran_js_files'] = array(                                                                  
                                            array("url" => $custom_url[0], "type" => "module")
                                        );

        /** The custom Hadith JavaScript file urls */
        $custom_url[0]                = "{app_ui}/js/hadith/main.js";
        /** The list of custom JavaScript files used by Hadith navigator */
        $config['hadith_js_files']    = array(                                                                  
                                            array("url" => $custom_url[0], "type" => "module")
                                        );
        
        /** The custom Subscription page JavaScript file urls */                                        
        $custom_url[0]                = "{app_ui}/js/subscribe/main.js";
        /** The list of custom JavaScript files used by Subscription form */
        $config['subscribe_js_files'] = array(                                                                  
                                               array("url" => $custom_url[0], "type" => "module")
                                           );
                                           
        /** The custom Contact page JavaScript file urls */                                        
        $custom_url[0]                = "{app_ui}/js/contact/main.js";
        /** The list of custom JavaScript files used by Contact form */
        $config['contact_js_files']   = array(                                                                  
                                            array("url" => $custom_url[0], "type" => "module")                     
                                        );
                                           
        /** The custom HadithDownload page JavaScript file urls */                                        
        $custom_url[0]                = "{app_ui}/js/hadith-download/main.js";
        /** The list of custom JavaScript files used by hadith download form */
        $config['hadithdownload_js_files'] = array(                                                                  
                                                 array("url" => $custom_url[0], "type" => "module")
                                             );                                                                                                                              
                                          
		/** The list of custom css files */
        $config['custom_css_files']   = array(
                                            array("url" => "{app_ui}/css/page.css"),
                                            array("url" => "{fw_vendors}/bootstrap/css/bootstrap.min.css"),
                                            array("url" => "{fw_vendors}/bootstrap/css/bootstrap-grid.min.css"),
                                            array("url" => "{fw_vendors}/fontawesome/css/all.min.css")
                                        );
                                                               
        /** The list of custom CSS files used by Holy Quran navigator */
        $config['holyquran_css_files'] = array(
                                             array("url" => "{app_ui}/css/navigator.css"),
                                             array("url" => "{app_ui}/css/quran-nav.css")
                                         );
        /** The list of custom CSS files used by Hadith navigator */
        $config['hadith_css_files']    = array(
                                             array("url" => "{app_ui}/css/navigator.css"),
                                             array("url" => "{app_ui}/css/hadith-nav.css")
                                         );
        /** The list of custom CSS files used by Holy Quran subscription email */
        $config['hq_email_css_files']  = array(array("url" => "{app_ui}/css/quran-email.css"));
        /** The list of custom CSS files used by Holy Quran subscription email */
        $config['ha_email_css_files']  = array(array("url" => "{app_ui}/css/hadith-email.css"));
        
        /** The font file base url */
        $font_base_url                 = "{app_ui}/font/";
        /** The urdu font info */
        $urdu_font                     = array(
                                            "url" => $font_base_url . "NafeesWeb.ttf", 
                                            "font_family" => "NafeesWeb"
                                         );
        /** The arabic font info */
        $arabic_font                   = array(
                                            "url" => $font_base_url . "amiri-quran.ttf", 
                                            "font_family" => "amiri-quran"
                                         );
                                                        
        /** The bengali font info */
        $bengali_font                   = array(
                                            "url" => $font_base_url . "HindSiliguri-Regular.ttf", 
                                            "font_family" => "hind-siliguri"
                                          );
        /** The devehi font info */
        $devehi_font                    = array(
                                            "url" => $font_base_url . "devehi.ttf", 
                                            "font_family" => "devehi"
                                          );
        /** The hindi font info */
        $hindi_font                     = array(
                                             "url" => $font_base_url . "hindi.ttf", 
                                             "font_family" => "hindi"
                                          );
        /** The korean font info */
        $korean_font                    = array(
                                              "url" => $font_base_url . "NanumPenScript-Regular.ttf", 
                                              "font_family" => "korean"
                                          );
        /** The malayalam font info */
        $malayalam_font                 = array(
                                              "url" => $font_base_url . "NotoSansMalayalam-Regular.ttf", 
                                              "font_family" => "malayalam"
                                          );                                               
        /** The tamil font info */
        $tamil_font                     = array(
                                              "url" => $font_base_url . "NotoSansTamil-Regular.ttf", 
                                              "font_family" => "tamil"
                                          );
        /** The persian font info */
        $persian_font                   = array(
                                              "url" => $font_base_url . "Samim.ttf", 
                                              "font_family" => "Samim"
                                          );
                
        /** The thai font info */
        $thai_font                      = array(
                                              "url" => $font_base_url . "NotoSansThaiUI-Regular.ttf", 
                                              "font_family" => "thai"
                                          );                                                                                                                                                                                                
        /** The font list */
        $config['font_list'] 	        = array(
										      "Urdu" => $urdu_font,
											  "Arabic" => $arabic_font,
											  "Bengali,Malayalam,Tamil" => $bengali_font,
											  "Devehi" => $devehi_font,
											  "Hindi" => $hindi_font,
											  "Korean" => $korean_font,
											  "Malayalam" => $malayalam_font,
											  "Tamil" => $tamil_font,
											  "Persian" => $persian_font,
											  "Thai" => $thai_font
									       );


        /** The mysql table names */
        $config['mysql_table_names']    = array(
                                              "subscription" => "ic_subscription",
                                              "contact" => "ic_contact",
                                              "hadith_download" => "ic_hadith_download"
                                          );
																																
        return $config;
    }
}
