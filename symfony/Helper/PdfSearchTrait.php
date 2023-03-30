<?php

namespace App\Helper;

use Symfony\Component\Finder\Finder;

/**
 * Methos and functions to search through pdf files
 * 
 * Requires smalot/pdfparser library
 */
trait PdfSearchTrait
{
    /**
     * Searches for a string through .pdf files in the specified directory.
     * 
     * @param string $directory The directory containing the files you want to search into.
     * @param string $needle The string you want to find.
     * 
     * @return string[] Array containing the files where the needle was found in.
     */
    public function searchStringInPdf($directory, $needle): array
    {
        $pfdParser = new Parser();
        $finder = new Finder();

        $files = $finder->in($directory)->depth('== 0')->files()->name('*.pdf');
        $result = [];

        foreach ($files as $file) {
            $currentPdf = $pfdParser->parseFile($file);
            $currentPdfString = str_replace(["\n", "\r", "\t", "\b", "\f", "\v", " "], "", $currentPdf->getText());
            $needlePosition = strpos($currentPdfString, $needle);
            if ($needlePosition !== false) {
                $result[] = $file->getFilename();
            }
        }
        return $result;
    }
}
