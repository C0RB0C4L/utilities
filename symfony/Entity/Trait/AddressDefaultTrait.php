<?php

namespace App\Entity\Traits;

trait AddressDefaultTrait
{
	/**
	 * @ORM\Column(type="string", length=255, nullable=true)
	 */
	private $address1;

	/**
	 * @ORM\Column(type="string", length=255, nullable=true)
	 */
	private $address2;

	/**
	 * @ORM\Column(type="string", length=20, nullable=true)
	 */
	private $zipCode;

	/**
	 * @ORM\Column(type="string", length=255, nullable=true)
	 */
	private $city;

	/**
	 * @ORM\Column(type="string", length=255, nullable=true)
	 */
	private $state;

	/**
	 * @ORM\Column(type="string", length=255, nullable=true)
	 */
	private $country;


	public function getAddress1(): ?string
	{
		return $this->address1;
	}

	public function setAddress1(?string $address1): self
	{
		$this->address1 = $address1;

		return $this;
	}


	public function getAddress2(): ?string
	{
		return $this->address2;
	}

	public function setAddress2(?string $address2): self
	{
		$this->address2 = $address2;

		return $this;
	}


	public function getZipCode(): ?string
	{
		return $this->zipCode;
	}

	public function setZipCode(?string $zipCode): self
	{
		$this->zipCode = $zipCode;

		return $this;
	}


	public function getCity(): ?string
	{
		return $this->city;
	}

	public function setCity(?string $city): self
	{
		$this->city = $city;

		return $this;
	}


	public function getState(): ?string
	{
		return $this->state;
	}

	public function setState(?string $state): self
	{
		$this->state = $state;

		return $this;
	}


	public function getCountry(): ?string
	{
		return $this->country;
	}

	public function setCountry(?string $country): self
	{
		$this->country = $country;

		return $this;
	}
}
