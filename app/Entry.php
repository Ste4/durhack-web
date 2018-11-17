<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Entry extends Model
{
    public function evening()
    {
    	return $this->belongsTo('App\Evening');
    }
}
