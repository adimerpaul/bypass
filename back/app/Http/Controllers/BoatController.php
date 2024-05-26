<?php

namespace App\Http\Controllers;

use App\Models\Boat;
use App\Models\Company;
use Illuminate\Http\Request;

class BoatController extends Controller{
    public function index(){
        return Boat::orderBy('id', 'desc')->with('company')->get();
    }
    public function store(Request $request){
        $validatedData = $request->validate([
            'name' => 'required',
            'company_id' => 'required',
        ]);
        $company = Company::find($request->company_id);
        $boat = new Boat();
        $boat->name = $request->name;
        $boat->company_id = $request->company_id;
        $boat->color = $company->color;
        $boat->save();
        return Boat::where('id', $boat->id)->with('company')->first();
    }
    public function update(Request $request, $id){
        $boat = Boat::find($id);
        $boat->name = $request->name;
        $boat->company_id = $request->company_id;
        $boat->save();
        return Boat::where('id', $boat->id)->with('company')->first();
    }
    public function destroy($id){
        $boat = Boat::find($id);
        $boat->delete();
        return $boat;
    }
}
