<?php

namespace App\Http\Controllers;

use App\Models\Insumo;
use App\Models\InsumoProduct;
use App\Models\Product;
use Illuminate\Http\Request;
use Intervention\Image\ImageManager;

class ProductController extends Controller
{
    public function index()
    {
        return Product::with(['category','insumos'])->get();
    }

    public function listproducts()
    {
        return Product::where('status','ACTIVE')->with(['category','insumos'])->orderBy('name','asc')->get();
    }

    public function store(Request $request)
    {
        error_log(json_encode($request->user()->id));
        $file = $request->file('file');
        $productRequest = json_decode($request->product, true);
        $fileName = $this->uploadFileResize($file);
        $product = Product::create([
            'name' => $productRequest['name'],
//            'description' => $productRequest['description'] == '' ? 'Sin descripción' : $productRequest['description'],
            'image' => $fileName,
            'price' => $productRequest['price'],
            'costo' => floatval($productRequest['costo']),
            'status' => $productRequest['status'],
            'stock' => intval($productRequest['stock']),
            'category_id' => $productRequest['category_id'],
//            'user_id' => $request->user()->id,
        ]);
        return Product::with(['category','insumos'])->find($product->id);
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
        return Product::with(['category','insumos'])->find($product->id);
    }
    public function destroy($id){
        if (InsumoProduct::where('product_id', $id)->count() > 0){
            return response()->json(['message' => 'No se puede eliminar el producto porque tiene insumos asociados'], 400);
        }
        $product = Product::find($id);
        $product->delete();
        return response()->json($product, 200);
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
