<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Evening extends Model
{
    public function venue()
    {
    	return $this->belongsTo('App\Venue');
    }

    public function entries()
    {
    	return $this->hasMany('App\Entry');
    }
}
