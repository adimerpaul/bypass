<?php

namespace App\Http\Controllers;

use App\Models\Crew;
use Illuminate\Http\Request;

class CrewController extends Controller{
    public function index(){
        return Crew::orderBy('id', 'desc')->with('boat')->get();
    }
    public function store(Request $request){
        $validatedData = $request->validate([
            'name' => 'required',
            'role' => 'required',
            'boat_id' => 'required',
        ]);
        $crew = new Crew();
        $crew->name = $request->name;
        $crew->role = $request->role;
        $crew->boat_id = $request->boat_id;
        $crew->save();
        return Crew::where('id', $crew->id)->with('boat')->first();
    }
    public function update(Request $request, $id){
        $crew = Crew::find($id);
        $crew->name = $request->name;
        $crew->role = $request->role;
        $crew->boat_id = $request->boat_id;
        $crew->save();
        return Crew::where('id', $crew->id)->with('boat')->first();
    }
    public function destroy($id){
        $crew = Crew::find($id);
        $crew->delete();
        return $crew;
    }
}
