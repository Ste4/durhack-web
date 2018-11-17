<?php

use Illuminate\Database\Seeder;
use App\Venue;

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
    }
}
