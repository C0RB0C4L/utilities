<?php

namespace App\Entity\Traits\Admin;

trait SoftDeletableTrait
{
	/**
	 * @ORM\Column(type="boolean", nullable=true))
	 */
	private $isDeleted;

	/**
	 * @ORM\Column(type="datetime_immutable", nullable=true))
	 */
	private $deletedAt;


	public function isDeleted(): ?bool
	{
		return $this->isDeleted;
	}

	public function setIsDeleted(bool $isDeleted): self
	{
		$this->isDeleted = $isDeleted;

		return $this;
	}


	public function setDeletedAt(): ?\DateTimeImmutable
	{
		return $this->deletedAt;
	}

	public function getDeletedAt(?\DateTimeImmutable $deletedAt): self
	{
		$this->deletedAt = $deletedAt;

		return $this;
	}
}
