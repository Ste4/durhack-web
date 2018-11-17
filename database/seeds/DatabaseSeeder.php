<?php

use Illuminate\Database\Seeder;
use App\Venue;
use App\Evening;
use App\Entry;
use App\Leave;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        //Create Klute
        $klute = Venue::create([
        	'name' => 'Klute',
        	'capacity' => 400,
        	'latitude' => 54.7759970,
        	'longitude' => -1.5740014,
        ]);

        //Create Jimmys
        $jimmys = Venue::create([
            'name' => 'Jimmy Allens',
            'capacity' => 350,
            'latitude' => 54.776086,
            'longitude' => -1.5740605,
        ]);

        //Create Lloyds
        $lloyds = Venue::create([
            'name' => 'The Bishops\' Mill',
            'capacity' => 500,
            'latitude' => 54.778239,
            'longitude' => -1.575739,
        ]);

        //Create the evenings for klute
        $evk1 = factory(App\Evening::class)->create([
            'venue_id' => $klute->id,
        ]);
        $evk2 = factory(App\Evening::class)->create([
            'venue_id' => $klute->id,
        ]);
        $evk3 = factory(App\Evening::class)->create([
            'venue_id' => $klute->id,
        ]);

        //Create the evenings for jimmys
        $evj1 = factory(App\Evening::class)->create([
            'venue_id' => $jimmys->id,
        ]);
        $evj2 = factory(App\Evening::class)->create([
            'venue_id' => $jimmys->id,
        ]);
        $evj3 = factory(App\Evening::class)->create([
            'venue_id' => $jimmys->id,
        ]);

        for ($i=0; $i < 200; $i++) { 
            $evj = App\Entry::create([
                'evening_id' => $evj1->id,
            ]);
        }

        //Create the evenings for lloyds
        $evl1 = factory(App\Evening::class)->create([
            'venue_id' => $lloyds->id,
        ]);
        $evl2 = factory(App\Evening::class)->create([
            'venue_id' => $lloyds->id,
        ]);
        $evl3 = factory(App\Evening::class)->create([
            'venue_id' => $lloyds->id,
        ]);

    }
}
