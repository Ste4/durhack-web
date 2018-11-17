<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Venue extends Model 
{
    protected $casts = [
        'capacity' => 'integer',
        'latitude' => 'float',
        'longitude' => 'float',
    ];

    protected $hidden = [
        'id',
        'created_at',
        'updated_at',
        'evenings',
    ];

    
    protected $appends = [
        'charge_time',
        'charge_cost',
    ];

    public function evenings()
    {
    	return $this->hasMany('App\Evening');
    }

    public function entries()
    {
    	return $this->hasManyThrough('App\Entry', 'App\Evening');
    }

    public function leaves()
    {
    	return $this->hasManyThrough('App\Leave', 'App\Evening');
    }

    //Not relational

    public function currentEvening()
    {
        return $this->evenings->first();
    }

    
    public function getChargeTimeAttribute()
    {
        return $this->currentEvening()->charge_time;
    }

    public function getChargeCostAttribute()
    {
         return $this->currentEvening()->charge_cost;
    }
    
}