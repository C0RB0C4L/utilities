<?php

namespace App\Entity\Traits;

trait FileDefaultTrait
{
    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $filename;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $directory;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $fullPath;


    public function getFilename(): string
    {
        return $this->filename;
    }

    public function setFilename($filename): string
    {
        $this->filename = $filename;

        return $this;
    }

    public function getDirectory(): string
    {
        return $this->directory;
    }

    public function setDirectory($directory): string
    {
        $this->directory = $directory;

        return $this;
    }

    public function getFullPath(): string
    {
        return $this->fullPath;
    }

    public function setFullPath($fullPath): string
    {
        $this->fullPath = $fullPath;

        return $this;
    }
}
