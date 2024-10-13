<?php

use Illuminate\Routing\Route;
use Illuminate\Support\Facades\Route as FacadesRoute;

FacadesRoute::get('/login', function () {
    return abort(404, 'Page not found');
})->name('login');