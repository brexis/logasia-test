<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\VehicleService;

class VehicleController extends Controller
{
  private $service;

  public function __construct(VehicleService $service)
  {
    $this->service = $service;
  }

  public function index(Request $request)
  {
    $from = $request->input('from');
    $to = $request->input('to');

    $vehicles = $this->service->query($from, $to);

    return response()->json($vehicles);
  }

  public function store(Request $request)
  {
    $vehicle = $this->service->store($request);

    return response()->json($vehicle);
  }

  public function bulk(Request $request)
  {
    $vehicles = $this->service->bulk($request);

    return response()->json($vehicles);
  }

  public function update(Request $request, $id)
  {
    $vehicle = $this->service->update($id, $request);

    return response()->json($vehicle);
  }
}
