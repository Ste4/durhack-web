<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Venue;
use App\Entry;
use App\Leave;

class VenueController extends Controller
{
    public function show(Venue $venue)
    {
    	dd($venue, $venue->evenings);
    	return response()->json($venue);
    	
    }

    public function all()
    {
    	return response()->json(Venue::all());
    }

    public function entry(Venue $venue)
    {
    	$evening = $venue->evenings[0];

    	$entry = new Entry;
    	$entry->evening()->associate($evening);
    	$entry->save();
    }

    public function leave(Venue $venue)
    {
    	$evening = $venue->evenings[0];

    	$leave = new Leave;
    	$leave->evening()->associate($evening);
    	$leave->save();
    }
}
