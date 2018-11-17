<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Evening extends Model
{
    protected $casts = [
        'charge_cost' => 'integer',
    ];

    public function venue()
    {
    	return $this->belongsTo('App\Venue');
    }

    public function entries()
    {
    	return $this->hasMany('App\Entry');
    }

    public function leaves()
    {
    	return $this->hasMany('App\Leave');
    }
}
