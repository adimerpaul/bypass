<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Illuminate\Http\Request;

class CompanyController extends Controller{
    public function index(){
        return Company::orderBy('id', 'desc')->get();
    }
    public function store(Request $request){
        $validatedData = $request->validate([
            'name' => 'required',
            'address' => 'required',
            'phone' => 'required',
        ]);
        $colors = ['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722', '#795548', '#9E9E9E', '#607D8B'];
        $color = $colors[rand(0, count($colors) - 1)];
        $company = new Company();
        $company->name = $request->name;
        $company->address = $request->address;
        $company->phone = $request->phone;
        $company->color = $color;
        $company->save();
        return $company;
    }
    public function update(Request $request, $id){
        $company = Company::find($id);
        $company->name = $request->name;
        $company->address = $request->address;
        $company->phone = $request->phone;
        $company->save();
        return $company;
    }
    public function destroy($id){
        $company = Company::find($id);
        $company->delete();
        return $company;
    }
}
