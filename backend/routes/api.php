<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\UserController;


Route::middleware(['cors'])->group(function () {
    Route::post('/register', [UserController::class, 'register']);
    Route::post('/login', [UserController::class, 'login']);

    // Passport-protected routes
    Route::middleware('auth:api')->group(function () {
        Route::get('/profile', [UserController::class, 'profile']);
        Route::post('/upload-photo', [UserController::class, 'uploadPhoto']);
    });
});

Route::options('/{any}', function (Request $request) {
    return response()->json([], 204)
        ->header('Access-Control-Allow-Origin', 'http://localhost:3000')
        ->header('Access-Control-Allow-Credentials', 'true')
        ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        ->header('Access-Control-Allow-Headers', 'Authorization, Content-Type');
})->where('any', '.*');