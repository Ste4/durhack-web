<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Intervention\Image\ImageManagerStatic as Image;

class Venue extends Model 
{
    protected $casts = [
        'capacity' => 'integer',
        'latitude' => 'float',
        'longitude' => 'float',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
        'evenings',
    ];

    
    protected $appends = [
        'charge_time',
        'charge_cost',
        'count',
        'image',
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

    public function currentCount()
    {
        $entries = count($this->currentEvening()->entries);
        $leaves = count($this->currentEvening()->leaves);
        $current = $entries - $leaves;
        //dd($entries, $leaves, $current);
        return $current;
        
    }

    
    public function getChargeTimeAttribute()
    {
        return $this->currentEvening()->charge_time;
    }

    public function getChargeCostAttribute()
    {
         return $this->currentEvening()->charge_cost;
    }

    public function getCountAttribute()
    {
        return $this->currentCount();
    }

    public function getImageAttribute()
    {
        $img = Image::make("klute.jpg");
        $img->resize(500, 500);
        $encoded = (string)$img->encode('data-url');

        return $encoded;
    }
    
}