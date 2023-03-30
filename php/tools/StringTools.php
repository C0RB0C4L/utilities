<?php

namespace App\Tools;

final class StringTools
{
    /**
     * Gets the nth index (starting at 0) of a char in a given string.
     * 
     * @param string $char
     * @param int $position
     * @param string $subject
     * 
     * @return int|null the index | null if error or not found
     */
    public static function getNthCharacterIndex(string $char, string $subject, int $position)
    {
        if (is_string($char) && mb_strlen($char) <= 1 && is_int($position) && is_string($subject)) {
            preg_match_all("/$char/", $subject, $matches, PREG_OFFSET_CAPTURE);

            return array_key_exists($position - 1, $matches[0]) ? $matches[0][$position - 1][1] : null;
        }
    }


    /**
     * Capitalizes the first letter in a multibyte string.
     * 
     * @param string $string The subject
     * 
     * @return string
     * 
     */
    public static function mb_ucfirst(string $string)
    {
        return mb_strtoupper(mb_substr($string, 0, 1)) . mb_substr($string, 1);
    }


    /**
     * Converts all accentuated characters with the non-accuented version.
     * 
     * @param string $string The subject
     * 
     * @return string
     */
    public static function convertAccents(string $string)
    {
        return transliterator_transliterate("NFD; [:Nonspacing Mark:] Remove; NFC", $string);
    }


    /**
     * Converts a string into a "slug" version, i.e without accents and dashes instead of spaces.
     * 
     * @param string $subject
     * 
     * @return string
     */
    public static function mb_slugify(string $subject)
    {
        $subject = str_replace(["\xc2\xa0", " ", "&nbsp;"], "-", $subject);
        $subject = transliterator_transliterate('Any-Latin; Latin-ASCII; [^A-Za-z0-9-] remove; lower()', $subject);

        return $subject;
    }
}
