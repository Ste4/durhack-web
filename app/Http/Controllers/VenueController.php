<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Venue;
use App\Entry;
use App\Leave;

class VenueController extends Controller
{
    public function index()
    {
        return view('welcome');
    }

    public function show(Venue $venue)
    {
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

    public function count(Venue $venue)
    {
        $entries = count($venue->evenings[0]->entries);
        $leaves = count($venue->evenings[0]->leaves);

        $current = $entries - $leaves;

        return $current;
    }
}
