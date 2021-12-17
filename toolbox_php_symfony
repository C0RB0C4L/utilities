<?php

namespace App\Service;

use Smalot\PdfParser\Parser;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Finder\Finder;

class ToolboxService extends AbstractController
{


	public function __construct()
	{
	}




	public function convertCsvToArray($filePath)
	{
		if (is_file($filePath)) {
			$data = array_map(function ($v) {
				return str_getcsv($v, ";");
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
 * @param 
 * @return 
 */
	public function searchStringInPdf($fileDirectory, $needle) {
		$pfdParser = new Parser();
		$finder = new Finder();
		$files = $finder->in($fileDirectory)->depth('== 0')->files();
		$result = array();

		foreach($files as $file) {
			$currentPdf = $pfdParser->parseFile($file);
			$currentPdfString = $currentPdf->getText();
			$currentPdfString = str_replace("\n",'', $currentPdfString);
			$currentPdfString = str_replace("\r",'', $currentPdfString);
			$currentPdfString = str_replace("\t",'', $currentPdfString);
			$currentPdfString = str_replace("\b",'', $currentPdfString);
			$currentPdfString = str_replace("\f",'', $currentPdfString);
			$currentPdfString = str_replace("\v",'', $currentPdfString);
			$currentPdfString = str_replace(" ",'', $currentPdfString);

			$needlePosition = strpos($currentPdfString, $needle);

			if($needlePosition != false && $needlePosition != 0) {
				$result[] = $file->getFilename();
			}
			
		}
		return $result;
	}



}
