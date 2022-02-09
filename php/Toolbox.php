<?php

class ToolBox
{
	/**
	 * Converts a .csv file into an array.\
	 * Each row is an associative where values are indexed with the corresponding column label.\
	 * The first row (the labels) is removed from the resulting array.\
	 * Will only work if the first row contains the labels.
	 * @param string $filePath The path to the desired file.
	 * @param string $separator The field delimiter.
	 * @return array
	 */
	function convertCsvToArray($filePath, $separator = ";")
	{
		if (is_file($filePath)) {
			$data = array_map(function ($v) use ($separator) {
				return str_getcsv($v, $separator);
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
	 * Generates a pseudo-random password of the specified length.\
	 * @param string $length How long the password will be.\
	 * MIN = 12 MAX = 36.
	 * @param bool $allowsSpecialChars Sets if the password will contain non-alphanumeric characters.
	 * @return string The password.
	 */
	function generateRandomPassword($length = 12, $allowsSpecialChars = false)
	{
		$length < 12 ? $length = 12 : $length;
		$length > 36 ? $length = 36 : $length;
		$poolLower = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
		$poolUpper = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
		$poolNumber = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
		$poolGlobal = array($poolLower, $poolUpper, $poolNumber);
		if ($allowsSpecialChars) {
			$poolSpecial = [';', '!', ':', '?'];
			array_push($poolGlobal, $poolSpecial);
		}
		$placeholder = array();
		for ($i = 0; $i < $length; $i++) {
			$placeholder[] = 'a';
		}
		foreach ($placeholder as $key => $char) {
			$globalIndexToPick = random_int(0, count($poolGlobal) - 1);
			$localIndexToPick = random_int(0, count($poolGlobal[$globalIndexToPick]) - 1);
			$placeholder[$key] = $poolGlobal[$globalIndexToPick][$localIndexToPick];
		}
		return implode($placeholder);
	}
}
