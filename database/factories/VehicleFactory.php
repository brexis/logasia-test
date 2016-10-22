<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

/** @var \Illuminate\Database\Eloquent\Factory $factory */
use App\Vehicle;

$factory->define(App\Vehicle::class, function (Faker\Generator $faker) {
  $types = ['semi-truck', 'swap-truck', 'pup-trailer'];
  do {
    $type = $types[array_rand($types)];
    $date = $faker->dateTimeBetween('now', '+7 days')->format('Y-m-d');
  } while (Vehicle::where(['date' => $date, 'type' => $type])->count() > 0);

  return [
    'type' => $type,
    'date' => $date,
    'available' => $faker->randomDigit(),
    'price' => $faker->numberBetween(1000, 9000)
  ];
});
