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

Route::get('/', 'VenueController@index');

Route::get('/all', 'VenueController@all');

Route::get('/count/{venue}', 'VenueController@count');

Route::get('/{venue}', 'VenueController@show');



Route::post('/entry/{venue}', 'VenueController@entry');

Route::post('/leave/{venue}', 'VenueController@leave');