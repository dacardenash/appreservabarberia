<?php

namespace App\Providers;

use App\Services\Barbershops\BarbershopService;
use App\Services\Barbershops\Impl\BarbershopServiceImpl;
use App\Services\Books\BookService;
use App\Services\Books\Impl\BookServiceImpl;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(BookService::class, BookServiceImpl::class);
        $this->app->bind(BarbershopService::class, BarbershopServiceImpl::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
