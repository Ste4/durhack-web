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

        //Create this evening for klute
        $kluteEvening = Evening::make([
            'date' => '17/11/2018',
            'open' => '10:30',
            'close' => '02:00',
        ]);
        $kluteEvening->venue()->associate($klute);
        $kluteEvening->save();

        //Create klute entry
        $kluteEntry = Entry::make();
        $kluteEntry->evening()->associate($kluteEvening);
        $kluteEntry->save();

        $kluteEntry2 = Entry::make();
        $kluteEntry2->evening()->associate($kluteEvening);
        $kluteEntry2->save();

        //Create klute leave
        $kluteLeave = Leave::make();
        $kluteLeave->evening()->associate($kluteEvening);
        $kluteLeave->save();

    }
}
