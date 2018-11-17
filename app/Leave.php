<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Leave extends Model
{
    public function evening()
    {
    	return $this->belongsTo('App\Evening');
    }
}
