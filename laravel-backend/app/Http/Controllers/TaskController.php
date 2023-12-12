<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use App\Models\TasksCategory;


use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {
        // $tasks = Task::all();
        $tasks = Task::with('users')->get();

        return response()->json(['tasks' => $tasks]);
    }
    public function show($id)
    {
        $task = Task::with(['users', 'categories'])->findOrFail($id);
    
        return response()->json(['task' => $task]);
    }
    
    public function store(Request $request)
    {
        $request->validate([
            // 'title' => 'required|string',
            // 'description' => 'required|string',
            // 'categories' => 'array',
            // 'has_task' => 'array',
            // 'status' => 'required|integer',
            // 'start_date' => 'required|date',
            // 'end_date' => 'required|date',
            // 'user_ids' => 'required|array',
        ]);

        $task = Task::create([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            // 'categories' => $request->input('categories'),
            // 'has_task' => $request->input('has_task'),
            // 'user_ids' => $request->input('user_ids'),
            'status' => $request->input('status'),
            'start_date' => $request->input('start_date'),
            'end_date' => $request->input('end_date'),
        ]);

        // Associate users with the task
        $userIds = $request->input('user_ids', []); // Ensure it's an array, even if empty
        $task->users()->attach($userIds);

        // Associate categories with the task
        $categoryNames = $request->input('categories', []);
        if (!empty($categoryNames)) {
            $categoryIds = TasksCategory::whereIn('name', $categoryNames)->pluck('id');
            $task->categories()->attach($categoryIds);
        }

        // Optionally, eager load the users and categories to include them in the response
        $task->load('users', 'categories');

        // Log::info('Task created:', $task);
        return response()->json(['message' => 'Task created successfully', 'task' => $task], 201);
    }

    public function update(Request $request, $id)
    {
        $task = Task::findOrFail($id);

        // $request->validate([
        //     'title' => 'required|string',
        //     'description' => 'required|string',
        //     'categories' => 'required|array',
        //     'has_task' => 'required|array',
        //     'status' => 'required|integer',
        //     'start_date' => 'required|date',
        //     'end_date' => 'required|date',
        // ]);

        $task->update($request->except('user_ids', 'categories')); // Exclude user_ids and categories from the mass update

        // Sync users with the task
        $userIds = $request->input('user_ids', []);
        $task->users()->sync($userIds);
    
        // Sync categories with the task
        $categoryNames = $request->input('categories', []);
        $categoryIds = TasksCategory::whereIn('name', $categoryNames)->pluck('id');
        $task->categories()->sync($categoryIds);
    
        // Optionally, you can eager load the users and categories to include them in the response
        $task->load('users', 'categories'); 
        return response()->json(['message' => 'Task updated successfully', 'task' => $task]);
    }
    public function destroy($id)
    {
        $task = Task::findOrFail($id);
        $task->delete();

        return response()->json(['message' => 'Task deleted successfully']);
    }
}
