<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Venue;

class VenueController extends Controller
{
    public function show(Venue $venue)
    {
    	dd($venue, $venue->entries);
    }
}
