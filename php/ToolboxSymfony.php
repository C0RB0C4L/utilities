<?php

/**
 * ==================================================================\
 * /!\ Requires smalot pdfparser ($ sudo composer req smalot\pdfparser).\
 * ==================================================================\
 * Searches for a string through .pdf files in the specified directory.\
 * @param string $directory 
 * The directory containing the files you want to search into.
 * @param string $needle The string you want to find.
 * @return string[] Array containing the filenames in where the needle was found.
 */
function searchStringInPdf($directory, $needle)
{
  $pfdParser = new Parser();
  $finder = new Finder();
  $files = $finder->in($directory)->depth('== 0')->files()->name('*.pdf');
  $result = array();

  foreach ($files as $file) {
    $currentPdf = $pfdParser->parseFile($file);
    $currentPdfString = $currentPdf->getText();
    $currentPdfString = str_replace(["\n", "\r", "\t", "\b", "\f", "\v", " "], "", $currentPdfString);
    $needlePosition = strpos($currentPdfString, $needle);
    if ($needlePosition !== false) {
      $result[] = $file->getFilename();
    }
  }
  return $result;
}