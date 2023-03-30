<?php

namespace App\Tools;

final class DateTools
{
	public const SECONDS_IN_HOUR = 3600;
	public const SECONDS_IN_DAY = 86400;
	public const SECONDS_IN_WEEK = 604800;
	public const HOURS_IN_WEEK = 168;


	/**
	 * Returns how many days there are between two timestamps (1 decimal)
	 * 
	 * @param int $timestamp1
	 * @param int $timestamp2
	 * 
	 * @return int|null The number of days between the two timestamps, as an absolute value.
	 */
	public static function getDaysBetweenTimestamps(int $timestamp1, int $timestamp2)
	{
		if (is_int($timestamp1) && is_int($timestamp2)) {

			return round((abs($timestamp1 - $timestamp2) / self::SECONDS_IN_DAY), 1);
		}
	}


	/**
	 * Returns how many hours there are between two timestamps (1 decimal)
	 * 
	 * @param int $timestamp1
	 * @param int $timestamp2
	 * 
	 * @return int|null The number of hours between the two timestamps, as an absolute value.
	 */
	public static function getHoursBetweenTimestamps(int $timestamp1, int $timestamp2)
	{
		if (is_int($timestamp1) && is_int($timestamp2)) {

			return round((abs($timestamp1 - $timestamp2) / self::SECONDS_IN_HOUR), 1);
		}
	}
}
