<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use App\Models\TasksCategory;
use Illuminate\Support\Facades\Auth;


use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    //Show all tasks with their categories
    public function index()
    {
        $tasks = Task::with('users','categories')->get();

        return response()->json(['tasks' => $tasks]);
    }
    
    public function show($id)
    {
        $task = Task::with(['users', 'categories', 'admin'])->findOrFail($id);

        $usersData = $task->users->map(function ($user) {
            return [
                'user-id' => $user->id,
                'user-name' => $user->name,
            ];
        });

        return response()->json([
            'task' => $task,
            'task-title' => $task->title,
            'task-description' => $task->description,
            'task-start_date' => $task->start_date,
            'task-end_date' => $task->end_date,
            'task-status' => $task->status,
            'task_categories' => $task->categories,
            'task-admin-id' => $task->admin_id,
            'task_users' => $usersData,
        ]);
    }

    public function store(Request $request){
        $user = auth('sanctum')->user();

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
            'admin_id' => $request->input('admin_id'),
            'status' => $request->input('status'),
            'start_date' => $request->input('start_date'),
            'end_date' => $request->input('end_date'),
        ]);

        // Associate users with the task
        $userIds = $request->input('user_ids', []); // Ensure it's an array, even if empty
        $task->users()->attach($userIds);

        $categoryIds = $request->input('categories', []);
        $task->categories()->attach($categoryIds);
        
        // Optionally, eager load the users and categories to include them in the response
        $task->load('users', 'categories');

        return response()->json(['message' => 'Task created successfully', 'task' => $task], 201);
    }

    //Update the Task
    public function update(Request $request, $id)
    {
        $task = Task::findOrFail($id);


        $task->update($request->all());

        // Sync users with the task
        $userIds = $request->input('user_ids', []); 
        $task->users()->sync($userIds);

        // Sync categories with the task
        $categoryIds = $request->input('categories', []);
        $task->categories()->sync($categoryIds);

        // Optionally, eager load the users and categories to include them in the response
        $task->load('users', 'categories');

        return response()->json(['message' => 'Task updated successfully', 'task' => $task], 200);
    }



    public function destroy($id)
    {
        $task = Task::findOrFail($id);
        $task->delete();

        return response()->json(['message' => 'Task deleted successfully'], 204);
    }
}
