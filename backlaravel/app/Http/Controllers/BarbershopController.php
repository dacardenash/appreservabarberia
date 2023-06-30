<?php

namespace App\Http\Controllers;

use App\Models\Barbershop;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\URL;
use App\Services\Barbershops\BarbershopService;

class BarbershopController extends Controller
{
    private $barbershopService;

    public function __construct(BarbershopService $barbershopService)
    {
        $this->barbershopService = $barbershopService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        return response()->json($this->barbershopService->index());
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {

        //dd($request->name);
        //return response()->json($request->name);
        
        $barbershop = new Barbershop();
        $barbershop->name = $request->name;
        $barbershop->address = $request->address;
        $barbershop->nit = $request->nit;
        $barbershop->phone = $request->phone;
        $barbershop->description = $request->description;
        $barbershop->longitude = $request->longitude;
        $barbershop->latitude = $request->latitude;
        //dd($request->all());

        $file = $request->file('image');
        
        //dd($file);

        if ($file != null)
        {
            //dd("Primero");
            $filename = uniqid() . "_" . $file->getClientOriginalName();
            $file->move(public_path('public/images'), $filename);
            $url = URL::to('/') . '/public/images/' . $filename;
            $barbershop->logo = $url;
        }
        else
        {
            //dd("Segundo");
            $barbershop->logo = "https://cdn-icons-png.flaticon.com/512/2779/2779151.png";
        }

        //dd($url);
        $barbershop->save();
        return response()->json($barbershop);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
