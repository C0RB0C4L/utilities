<?php

namespace App\Entity\Traits\Admin;

trait TimestampBaseTrait
{
    /**
     * @ORM\Column(type="datetime_immutable", nullable=true))
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime_immutable", nullable=true))
     */
    private $lastModifiedAt;


    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(?\DateTimeImmutable $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }


    public function getLastModifiedAt(): ?\DateTimeImmutable
    {
        return $this->lastModifiedAt;
    }

    public function setLastModifiedAt(?\DateTimeImmutable $lastModifiedAt): self
    {
        $this->lastModifiedAt = $lastModifiedAt;

        return $this;
    }
}
