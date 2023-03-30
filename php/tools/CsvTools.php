<?php

namespace App\Tools;

final class CsvTools
{
    /**
     * Converts a .csv file into an array of associative arrays.\
     * __Works only if the .csv first row contains the column's label/name.__ \
     * The values from each columns are indexed with the corresponding "label" from the first row.
     * 
     * @param string $path The path to the desired .csv file.
     * @param string $separator The .csv field delimiter.\
     * `;` (semicolon) by default.
     * 
     * @return array
     */
    public static function getArrayFromFile(string $path, string $separator = ";"): array
    {
        if (is_file($path)) {

            $result = [];

            $data = array_map(
                function ($v) use ($separator) {
                    
                    return str_getcsv($v, $separator);
                },
                file($path)
            );

            foreach ($data as $data_row) {
                $row = [];
                for ($i = 0; $i < count($data[0]); $i++) {
                    $row[$data[0][$i]] = $data_row[$i];
                }
                $result[] = $row;
            }

            array_shift($result);

            return $result;
        }
    }
}
