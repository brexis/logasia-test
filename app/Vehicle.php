<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Vehicle extends Model
{
  protected $dates = ['date'];

  protected $fillable = ['type', 'date', 'price', 'available'];

  public function getDateAttribute($value)
  {
    $date = new Carbon($value);
    return $date->toDateString();
  }
}
