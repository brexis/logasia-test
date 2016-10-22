<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use App\Vehicle;
use Carbon\Carbon;

class ExampleTest extends TestCase
{
  use DatabaseMigrations;

  /**
  * A basic functional test example.
  *
  * @return void
  */
  public function testVehicleList()
  {
    $vehicles = factory(Vehicle::class, 2)->create();

    $vehicles = $vehicles->map(function ($vehicle) {
      return $vehicle->toArray();
    });

    $from = new Carbon();
    $to = $from->copy()->addDays(7);
    $from = $from->toDateString();
    $to = $to->toDateString();

    $this->get("/vehicle?from=$from&to=$to")
    ->seeJsonEquals($vehicles->toArray());
  }

  public function testVehicleStore()
  {
    $attributes = [
      'type' => 'semi-truck',
      'price' => 3000,
      'available' => 3,
      'date' => '2016-10-02'
    ];

    $this->post('/vehicle', $attributes)
    ->seeJson($attributes);
  }

  public function testVehicleBulk()
  {
    $attributes = [
      'from' => '2016-10-01',
      'to' => '2016-10-03',
      'type' => 'swap-truck',
      'price' => 2000,
      'available' => 4,
      'days' => [0, 1, 2, 3, 4, 5, 6]
    ];

    $this->post("/vehicle/bulk", $attributes)
    ->seeJsonStructure([
      '*' => ['type', 'price', 'date', 'available']
    ])
    ->seeJson([
      'type' => 'swap-truck',
      'price' => 2000,
      'available' => 4,
      'date' => '2016-10-01'
    ])
    ->seeJson([
      'type' => 'swap-truck',
      'price' => 2000,
      'available' => 4,
      'date' => '2016-10-01'
    ])
    ->seeJson([
      'type' => 'swap-truck',
      'price' => 2000,
      'available' => 4,
      'date' => '2016-10-03'
    ]);
  }

  public function testVehicleUpdate()
  {
    $vehicle = factory(Vehicle::class)->create();

    $attributes = [
      'price' => 3000,
      'available' => 3
    ];

    $this->put("/vehicle/{$vehicle->id}", $attributes)
    ->seeJson($attributes);
  }
}
