<?php

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