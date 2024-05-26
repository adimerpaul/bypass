<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Intervention\Image\ImageManager;

class ProductController extends Controller
{
    public function index()
    {
        return Product::orderBy('id', 'desc')->get();
    }

    public function store(Request $request)
    {
        $file = $request->file('file');
        $productRequest = json_decode($request->product, true);
        $fileName = $this->uploadFileResize($file);
        $product = Product::create([
            'name' => $productRequest['name'],
            'description' => $productRequest['description'] == '' ? 'Sin descripción' : $productRequest['description'],
            'image' => $fileName,
            'price' => $productRequest['price'],
            'costo' => $productRequest['costo'],
            'status' => $productRequest['status'],
            'stock' => $productRequest['stock'],
            'category_id' => $productRequest['category_id'],
            'user_id' => $request->user()->id,
        ]);
        return response()->json($product, 201);
    }

    public function update(Request $request, $id){
        $file = $request->file('file');
        $productRequest = json_decode($request->product, true);
//        $product=Product::find($productRequest['id']);
        if ($request->hasFile('file')) {
            error_log('entro');
            $fileName = $this->uploadFileResize($file);
            $productRequest['image'] = $fileName;
        }
        $product = Product::find($id);
        $product->update($productRequest);
        return response()->json($product, 200);
    }
    public function destroy($id){
        $product = Product::find($id);
        $product->delete();
        return response()->json(null, 204);
    }
    public function uploadFileResize($file){
        if(file_exists($file)){
            $name = time().$file->getClientOriginalName();
            $image = ImageManager::imagick()->read($file->getRealPath());
            $image->scale(600, 600);
            $image->save(public_path('/images/'.$name));
            return $name;
        }else{
            return 'default.png';
        }
    }
}
