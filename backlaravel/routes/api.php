<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookController;
use App\Http\Controllers\BarbershopController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('books', [BookController::class, 'index']);
Route::get('books/{id}', [BookController::class, 'show']);
Route::delete('books/{id}', [BookController::class, 'destroy']);
Route::post('books', [BookController::class, 'store']);
Route::put('books/{id}', [BookController::class, 'update']);
Route::get('/barbershops', [BarbershopController::class, 'index']);
Route::get('barbershops/{id}', [BarbershopController::class, 'show']);
Route::delete('barbershops/{id}', [BarbershopController::class, 'destroy']);
Route::post('barbershops', [BarbershopController::class, 'store']);
Route::put('barbershops/{id}', [BarbershopController::class, 'update']);

/*Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});*/
