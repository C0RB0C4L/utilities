<?php

namespace App\Tools;

final class FileTools
{
    /**
     * Deletes a file
     * 
     * @param string $path the full path to the file
     * 
     * @return bool|null __true__ if the file could be deleted | __false__ if not | null if it does not exist
     */
    public static function deleteFile($path)
    {
        return (is_file($path) ? unlink($path) : null);
    }


    /**
     * Deletes a directory and all of its content __recursively__
     * 
     * @param string $path the full path to the file
     * 
     * @return bool|null __true__ if the directory could be totally deleted | __false__ otherwise | __null__ if it does not exist.
     */
    public static function deleteDirectory($path)
    {
        if (!is_dir($path)) {

            return;
        }

        $files = array_diff(scandir($path), array('.', '..'));

        foreach ($files as $file) {
            (is_dir("$path/$file")) ? self::deleteDirectory("$path/$file") : unlink("$path/$file");
        }

        return rmdir($path);
    }


    /**
     * Creates a directory 
     * 
     * @param string $path
     * 
     * @return bool|null __true__ if the directory could be created | __false__ otherwise | __null__ if it exists.
     */
    public static function createDirectory(string $path, int $permission = 0755)
    {
        return !is_dir($path) ? mkdir($path, $permission, true) : null;
    }
}
