<?php
namespace App\Services;

use App\Vehicle;
use Carbon\Carbon;
use Illuminate\Http\Request;

class VehicleService
{
  public function query ($from, $to)
  {
    $vehicles = Vehicle::whereDate('date', '>=', $from)
    ->whereDate('date', '<=', $to)
    ->get();

    return $vehicles;
  }

  public function store(Request $request)
  {
    $price      = $request->input('price');
    $type       = $request->input('type');
    $available  = $request->input('available');
    $date       = $request->input('date');

    $vehicle = Vehicle::where(['date' => $date, 'type' => $type])->first();

    if (! $vehicle) {
      $vehicle = new Vehicle;
    }

    $vehicle->date = $date;
    $vehicle->type = $type;
    $vehicle->price = $price;
    $vehicle->available = $available;

    $vehicle->save();

    return $vehicle;
  }

  public function bulk(Request $request)
  {
    $from       = $request->input('from');
    $to         = $request->input('to');
    $price      = $request->input('price');
    $type       = $request->input('type');
    $available  = $request->input('available');
    $days       = $request->input('days');

    $from = new Carbon($from);
    $to = new Carbon($to);

    $dates = [];

    for ($i = 0; $i <= $from->diffInDays($to); $i++) {
      $date = $from->copy()->addDays($i);

      if (in_array($date->dayOfWeek, $days)) {
        $dates[] = $date;
      }
    }

    $return = [];

    foreach ($dates as $date) {
      $vehicle = Vehicle::where(['date' => $date->toDateString(), 'type' => $type])->first();

      if (! $vehicle) {
        $vehicle = new Vehicle;
      }

      $vehicle->date = $date;
      $vehicle->type = $type;
      $vehicle->price = $price;
      $vehicle->available = $available;
      $vehicle->save();

      $return[] = $vehicle;
    }

    return $return;
  }

  public function update($id, Request $request)
  {
    $vehicle = Vehicle::findOrFail($id);

    $vehicle->fill($request->all());
    $vehicle->save();

    return $vehicle;
  }
}
