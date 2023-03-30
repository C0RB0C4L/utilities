<?php

namespace App\Entity\Traits;

/**
 * Timestamped by default. No need to use TimestampBaseTrait.
 * Requires PHP 8.2 or higher.
 */
trait UserBaseTrait
{
	public const ROLE_ADMIN = "ROLE_ADMIN";
	public const ROLE_MODERATOR = "ROLE_MODERATOR";
	public const ROLE_VERIFIED = "ROLE_VERIFIED";
	public const ROLE_USER = "ROLE_USER";

	public static $roleArray = [
		self::ROLE_USER,
		self::ROLE_VERIFIED,
		self::ROLE_MODERATOR,
		self::ROLE_ADMIN
	];

	/**
	 * @ORM\Column(type="boolean", nullable=true))
	 */
	private $isActive;

	/**
	 * @ORM\Column(type="boolean", nullable=true))
	 */
	private $isVerified;

	/**
	 * @ORM\Column(type="datetime_immutable", nullable=true))
	 */
	private $registeredAt;

	/**
	 * @ORM\Column(type="datetime_immutable", nullable=true))
	 */
	private $lastLoginAt;


	public function isActive(): ?bool
	{
		return $this->isActive;
	}

	public function setIsActive(bool $isActive): self
	{
		$this->isActive = $isActive;

		return $this;
	}

	public function isVerified(): ?bool
	{
		return $this->isActive;
	}

	public function setIsVerified(bool $isVerified): self
	{
		$this->isVerified = $isVerified;

		return $this;
	}

	public function getRegisteredAt(): ?\DateTimeImmutable
	{
		return $this->registeredAt;
	}

	public function setRegisteredAt(?\DateTimeImmutable $registeredAt): self
	{
		$this->registeredAt = $registeredAt;

		return $this;
	}

	public function getLastLoginAt(): ?\DateTimeImmutable
	{
		return $this->lastLoginAt;
	}

	public function setLastLoginAt(?\DateTimeImmutable $lastLoginAt): self
	{
		$this->lastLoginAt = $lastLoginAt;

		return $this;
	}
}
