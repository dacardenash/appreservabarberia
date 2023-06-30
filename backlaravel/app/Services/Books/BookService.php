<?php

namespace App\Services\Books;

use Illuminate\Support\Collection;

interface BookService
{
    /**
     * @return Collection
     */
    public function index(): Collection;
}
