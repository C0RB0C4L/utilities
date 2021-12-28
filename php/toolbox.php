<?php


/**
 * Converts a .csv into an array where each row is an associative array with the key equals to the column name.\
 * The first row (the names) is removed from the result.
 * It will work properly only if the first line of the .csv file contains names of labels
 * @param string $filepath The path to the desired file.
 * @param string $seperator The field delimiter (';' by default).
 * @return array
 */
function convertCsvToArray($filePath, $separator)
{
  if (is_file($filePath)) {
    $data = array_map(function ($v) use ($separator) {
      return str_getcsv($v, $separator = ";");
    }, file($filePath));
    $array = array();
    foreach ($data as $data_row) {
      $row = array();
      for ($i = 0; $i < count($data[0]); $i++) {
        $row[$data[0][$i]] = $data_row[$i];
      }
      array_push($array, $row);
    }
    array_shift($array);
    return $array;
  } else {
    return array();
  }
}


/**
 * Requires smalot pdfparser.\
 * Searches for files in the desired directory and returns an array of the filenames containing the desired string.
 * @param string $directory the directory containing the files you want to search into
 * @param string $needle the string you want to find
 * @return array
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
    $currentPdfString = str_replace("\n", '', $currentPdfString);
    $currentPdfString = str_replace("\r", '', $currentPdfString);
    $currentPdfString = str_replace("\t", '', $currentPdfString);
    $currentPdfString = str_replace("\b", '', $currentPdfString);
    $currentPdfString = str_replace("\f", '', $currentPdfString);
    $currentPdfString = str_replace("\v", '', $currentPdfString);
    $currentPdfString = str_replace(" ", '', $currentPdfString);

    $needlePosition = strpos($currentPdfString, $needle);

    if ($needlePosition !== false /* && $needlePosition != 0 */) {
      $result[] = $file->getFilename();
    }
  }
  return $result;
}
