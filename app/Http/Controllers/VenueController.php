<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Venue;
use App\Entry;
use App\Leave;
use Carbon\Carbon;

class VenueController extends Controller
{
    public function index()
    {
        $venues = Venue::all()->pluck('name')->toArray();
        $footfall = Venue::all()->pluck('count')->toArray();

        $colorScheme = [];
        foreach ($venues as $venueName) {
            $colorScheme[] = $this->rand_color();
        }
        //dd($colorScheme);
        
        //Current Numbers
        $chartjs = app()->chartjs
        ->name('popularCurrent')
        ->type('bar')
        ->size(['width' => 400, 'height' => 200])
        ->labels($venues)
        ->datasets([
            [
                'backgroundColor' => /*[
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 206, 86)',
                ]*/$colorScheme,
                'data' => $footfall,
            ]
        ])
        ->optionsRaw([
            'legend' => [
                'display' => false,
                'labels' => [
                    'fontColor' => '#666',
                ],
            ],
            'scales' => [
                'xAxes' => [
                    [
                        'stacked' => true,
                        'gridLines' => [
                            'borderDash' => [8, 4],
                            'color' => 'rgba(255,255,255,0.6)'
                        ]
                    ]
                ],
                'yAxes' => [
                    [
                        'stacked' => true,
                        'gridLines' => [
                            'borderDash' => [8, 4],
                            'color' => 'rgba(255,255,255,0.6)'
                        ]
                    ]
                ]
            ]
        ]);

        //Last hours

        $timeData = [];
        for ($j=1; $j <= count(Venue::all()); $j++) { 
            $venue = Venue::find($j);
            $evening = $venue->currentEvening();
            $entries = $evening->entries;
            
            $timeData[]['label'] = $venue->name;
            $timeData[$j-1]['backgroundColor'] = $colorScheme[$j-1];
            $timeData[$j-1]['borderColor'] = $this->rand_color();
            $timeData[$j-1]['pointBorderColor'] = $this->rand_color();
            $timeData[$j-1]['pointBackgroundColor'] = $this->rand_color();
            $timeData[$j-1]['pointHoverBackgroundColor'] = $this->rand_color();
            $timeData[$j-1]['pointHoverBorderColor'] = $this->rand_color();

            for ($i=0; $i < 5; $i++) {
                $count = $entries->where('created_at', '<', Carbon::now()->addHours(-$i))
                                    ->where('created_at', '>', Carbon::now()->addHours(-$i-1))
                                    ->count();

                $timeData[$j-1]['data'][] = $count;
            }
        }
        //dd($timeData);

        $lastHour = app()->chartjs
        ->name('lastHour')
        ->type('line')
        ->size(['width' => 400, 'height' => 200])
        ->labels([
            Carbon::now()->toTimeString(),
            Carbon::now()->addHours(-1)->toTimeString(),
            Carbon::now()->addHours(-2)->toTimeString(),
            Carbon::now()->addHours(-3)->toTimeString(),
            Carbon::now()->addHours(-4)->toTimeString(),
        ])
        ->datasets($timeData)
        ->options([]);


        return view('welcome')->with('chartjs', $chartjs)
                              ->with('lastHour', $lastHour)
                              ->with('venues', $venues)
                              ->with('footfall', $footfall);
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

    private function rand_color() {
        $rgbColor = array();
 
        foreach(array('r', 'g', 'b') as $color){
            //Generate a random number between 0 and 255.
            $rgbColor[$color] = mt_rand(0, 255);
        }
        $rgbColor[] = 0.55;

        //RGBA
        return 'rgba('.implode(',', $rgbColor).')';
        //Hex
        //return '#' . str_pad(dechex(mt_rand(0, 0xFFF)), 3, '0', STR_PAD_LEFT);
    }
}
