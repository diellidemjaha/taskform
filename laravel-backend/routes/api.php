<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CategoryController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::get('/tasks', [TaskController::class, 'index']);


Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/register-admin', [AuthController::class, 'registerAdmin']);
Route::post('/login-admin', [AuthController::class, 'adminLogin']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    // Other protected routes...
});

Route::get('/users', [UserController::class, 'index']);
Route::get('/categories', [CategoryController::class, 'index']);

Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::get('/tasks/{id}', [TaskController::class, 'show']);
    Route::post('/tasks/new-task', [TaskController::class, 'store']);
    Route::post('/tasks/update-task/{id}', [TaskController::class, 'update']);
    Route::delete('/tasks/delete-task/{id}', [TaskController::class, 'destroy']);
  
});