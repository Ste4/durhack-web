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

Route::post('/entry/{venue}', 'VenueController@entry');
Route::post('/leave/{venue}', 'VenueController@leave');

Route::post('/venue', 'VenueController@select');
Route::get('/venue/{venue}', 'VenueController@display');

Route::get('/admin/new', 'VenueController@new');

Route::get('/{venue}', 'VenueController@show');



