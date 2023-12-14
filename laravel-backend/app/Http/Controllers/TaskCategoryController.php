<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TasksCategory;

class TaskCategoryController extends Controller
{
    public function index()
    {
        $categories = TasksCategory::all(['id', 'name']);
        return response()->json(['categories' => $categories]);
    }
}
