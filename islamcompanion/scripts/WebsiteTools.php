<?php

declare(strict_types=1);

namespace IslamCompanion\Scripts;

use \Framework\Config\Config as Config;
use \Framework\Utilities\UtilitiesFramework as UtilitiesFramework;

/**
 * This class provides functions that implement website tools
 *
 * @category   Scripts
 * @author     Nadir Latif <nadir@pakjiddat.pk>
 * @license    https://www.gnu.org/licenses/gpl-2.0.html GNU General Public License, version 2
 */
class WebsiteTools extends \Framework\Application\CommandLine
{
    /**
     * It uploads all audio files to Cloudinary CDN
     */
    public function UploadAudioFiles() : void
    {
        /** The cloudinary configuration */
        \Cloudinary::config(array(
                                "cloud_name" => "islamcompanion", 
                                "api_key" => "342155712967237", 
                                "api_secret" => "OUDEIrKFAp1DXyCmPSd8biMj3_4", 
                                "secure" => true
                           )
        );
        /** The path to the audio folder */
        $folder_path  = Config::$config["path"]["app_path"] . "/data/audio";
        /** The folder contents are read */
        $file_list    = UtilitiesFramework::Factory("foldermanager")->GetFolderContents($folder_path);
        /** The number of uploaded files */
        $upload_count = 0;
        /** Each audio file is uploaded */
        for ($count = 0; $count < count($file_list); $count++) {
            /** The file path */
            $file_path    = $file_list[$count];
            /** The file path is divided into parts */
            $arr          = explode("/", $file_path);
            /** The short file name */
            $short_name   = "audio/" . str_replace(".mp3", "", $arr[count($arr)-1]);
            /** The file upload options */
            $options      = $options = array("public_id" => $short_name, "resource_type" => "video");
            /** The file is uploaded */
            $result       = \Cloudinary\Uploader::upload($file_path, $options);
            /** If the result is not valid, then exception is thrown */
            if (!isset($result['public_id']) || (isset($result['public_id']) && $result['public_id'] != $short_name))
                throw new \Exception("Audio file: " . $short_name . " could not be uploaded");
            /** If the file was uploaded, then upload count is increased */
            else
                $upload_count++;
        }   
        /** The information message */
        $message = $upload_count . " audio files were successfully uploaded to Cloudinary CDN";
        
        echo "\n\n" . $message . "\n\n";
    }
}
