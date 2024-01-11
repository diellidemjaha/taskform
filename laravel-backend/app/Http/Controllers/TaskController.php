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
                // Add other user attributes you want to include
            ];
        });
        // $categoriesData = $task->categories->map(function ($category) {
        //     return [
        //         'category-id' => $category->id,
        //         'category-name' => $category->name,
        //         // Add other category attributes you want to include
        //     ];
        // });

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
            // 'task_categories' => $categoriesData,
        ]);
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
            'admin_id' => $request->input('admin_id'),
            'status' => $request->input('status'),
            'start_date' => $request->input('start_date'),
            'end_date' => $request->input('end_date'),
        ]);

        // Associate users with the task
        $userIds = $request->input('user_ids', []); // Ensure it's an array, even if empty
        $task->users()->attach($userIds);

        // Associate categories with the task
        // $categoryNames = $request->input('categories', []);
        // if (!empty($categoryNames)) {
        //     $categoryIds = TasksCategory::whereIn('name', $categoryNames)->pluck('id');
        //     $task->categories()->attach($categoryIds);
        // }

        $categoryIds = $request->input('categories', []);
        $task->categories()->attach($categoryIds);
        // Optionally, eager load the users and categories to include them in the response
        $task->load('users', 'categories');

        // Log::info('Task created:', $task);
        return response()->json(['message' => 'Task created successfully', 'task' => $task], 201);
    }
    public function update(Request $request, $id)
    {
        $task = Task::findOrFail($id);
        // $task['status'] = 2;

        // $request["title"] = "Test";
        // $request["status"] = 5;

        // $task->status = $request->input('status');
        // $task->title = $request->input('title');
        $task->update($request->all());

        // Sync users with the task
        $userIds = $request->input('user_ids', []); // Ensure it's an array, even if empty
        $task->users()->sync($userIds);

        // Sync categories with the task
        $categoryIds = $request->input('categories', []);
        $task->categories()->sync($categoryIds);

        // Optionally, eager load the users and categories to include them in the response
        $task->load('users', 'categories');

        // Log::info('Task updated:', $task);
        return response()->json(['message' => 'Task updated successfully', 'task' => $task], 200);
    }



    public function destroy($id)
    {
        $task = Task::findOrFail($id);
        $task->delete();

        return response()->json(['message' => 'Task deleted successfully'], 204);
    }
}
