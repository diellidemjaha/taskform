<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::all(['id', 'name']);

        if ($categories) {

            return response()->json(['categories' => $categories]);
        } else {

            return response()->json(['categories'=> 'not found'] ); 
        }
    }

}
