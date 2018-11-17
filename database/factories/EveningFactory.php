<?php

use Faker\Generator as Faker;

$factory->define(App\Evening::class, function (Faker $faker) {
    return [
        'date' => $faker->date($format='d/m/Y'),
        'open' => $faker->time($format='H:i:s'),
        'close' => $faker->time($format='H:i:s'),
    ];
});
