<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return response()->json([
    	'name' => 'Klute',
    	'count' => 4,
    ]);
});

Route::get('/all', 'VenueController@all');

Route::get('/{venue}', 'VenueController@show');



Route::post('/entry/{venue}', 'VenueController@entry');

Route::post('/leave/{venue}', 'VenueController@leave');