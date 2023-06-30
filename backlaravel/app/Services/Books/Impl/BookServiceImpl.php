<?php

namespace App\Services\Books\Impl;

use App\Models\Book;
use App\Services\Books\BookService;
use Illuminate\Support\Collection;

class BookServiceImpl implements BookService
{
    /**
     * @return Collection
     */
    public function index(): Collection
    {
        return Book::orderBy('id', 'desc')->get();
    }
}
