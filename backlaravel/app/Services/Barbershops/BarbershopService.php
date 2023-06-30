<?php

namespace App\Services\Barbershops;

use Illuminate\Support\Collection;

interface BarbershopService
{
    /**
     * @return Collection
     */
    public function index(): Collection;
}
