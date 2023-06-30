<?php

namespace App\Services\Barbershops\Impl;

use App\Models\Barbershop;
use App\Services\Barbershops\BarbershopService;
use Illuminate\Support\Collection;

class BarbershopServiceImpl implements BarbershopService
{
    /**
     * @return Collection
     */
    public function index(): Collection
    {
        return Barbershop::orderBy('id', 'desc')->get();
    }
}
