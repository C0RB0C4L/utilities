<?php

namespace App\Helper;

use Symfony\Component\Finder\Exception\DirectoryNotFoundException;
use Symfony\Component\Finder\Finder;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\File\UploadedFile;

/**
 * Methods and functions to manipulate files (saving, finding...)
 */
trait FileHandlerHelper
{
    /**
     * Handles all the routine to save an uploaded file from a form.
     * 
     * @param UploadedFile $file Instance of the uploaded file to save.
     * @param string $directory The directory where to save the file (__with__ the trailing `/`)
     * @param string $filename __[optional]__ Will be set as the filename instead of the client original name.
     * @param bool $appendDate  __[optional]__ Will append the datetime (_Ymd_His) at the end of the filename.
     * @param string $extension __[optional]__ Will force the file extension.\
     * Otherwise, will use the original extension from the client.
     * 
     * @return string|false the full path to the file on success. | __false__ if the file couldn't be saved 
     */
    public function saveSingleUploadedFile($file, $directory, $filename = "", $appendDate = false)
    {
        if (!$file instanceof UploadedFile && !$this->createDirectory($directory)) {

            return false;
        }

        if (!$filename) {
            $filename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        }
        $filename = $this->prepareFilename($filename);

        if ($appendDate) {
            $filename = $this->appendDateTime($filename);
        }

        $nativeExtension = $file->guessExtension();

        $i = 0;
        while (is_file($directory . $filename . "." . $nativeExtension)) {
            $i++;
            if ($i < 2) {
                $filename .= "_" . $i;
            } else {
                $filename = mb_substr($filename, 0, mb_strrpos($filename, "_") + 1) . $i;
            }
        }

        try {
            $file->move($directory, $filename);
        } catch (FileException $e) {

            return false;
        }

        return $directory . $filename . $nativeExtension;
    }


    /**
     * Handles all the routine to safely save multiple uploaded files from a form.
     * 
     * @param array $files Array contaning the UploadedFile instances to save
     * @param string $directory The directory where to save the file.
     * @param bool $appendDate  __[optional]__ Will append the datetime (_Ymd_His) at the end of the filename.
     * @param string $extension __[optional]__ WITHOUT THE DOT. Will set this extension.\
     * Otherwise, will use the original extension from the client.
     * 
     * @return array An empty array is all files could be saved | an array containing the file names that could not.
     */
    public function saveMultipleUploadedFiles($files, $directory, $appendDate = false)
    {
        $error = [];

        foreach ($files as $file) {
            $uploadResult = $this->saveSingleUploadedFile($file, $directory, null, $appendDate);

            if (!$uploadResult) {
                $error[] = $file->getClientOriginalName();
            }
        }

        return $error;
    }


    /**
     * Recovers all the file(names) from a desired directory.
     * 
     * @param string $directory The directory where the files are located.
     * @param bool $sortAlphabetically To sort the filenames
     * 
     * @return array The filenames
     */
    public function getSimpleFilenameArray($directory, $sortAlphabetically = true)
    {
        $finder = new Finder();
        $array = [];

        try {
            $files = $finder->in($directory)->depth('== 0')->files();

            foreach ($files as $file) {
                $array[] = $file->getFilename();
            }

            $sortAlphabetically ? sort($array) : null;
        } catch (DirectoryNotFoundException $e) {
        }

        return $array;
    }


    /**
     * @param string $filepath The full path to the file
     * @param string $filename The name the file should have in the download prompt, __without the extension__ (__32 char max__).
     * 
     * @return false|StreamedResponse __false__ is the file does not exist
     */
    public function streamFileToResponse(string $filePath, string $filename)
    {
        $response = false;
        if (!is_file($filePath)) {

            return $response;
        }

        $extension = mb_substr($filePath, mb_strrpos($filePath, "."));
        $filename = mb_substr($filename, 0, 32);

        $response = new StreamedResponse(function () use ($filePath) {
            $fileStream = fopen($filePath, 'r');
            $outputStream = fopen('php://output', 'wb');
            stream_copy_to_stream($fileStream, $outputStream);
        });

        $response->headers->set('Content-Type', mime_content_type($filePath));
        $response->headers->set('Content-Disposition', "attachment; filename=$filename" . "$extension");

        return $response;
    }


    private function prepareFilename(string $string)
    {
        $string = str_replace(["\xc2\xa0", " ", "&nbsp;"], "-", $string);
        $string = transliterator_transliterate('Any-Latin; Latin-ASCII; [^A-Za-z0-9-] remove; lower()', $string);

        return $string;
    }


    private function appendDateTime(string $string, string $format = "Ymd_His")
    {
        return $string . date($format);
    }


    private function createDirectory(string $path, int $permission = 0755)
    {
        return !is_dir($path) ? mkdir($path, $permission, true) : null;
    }
}
