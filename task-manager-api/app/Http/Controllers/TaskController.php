<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Auth;
use App\Models\Task;

class TaskController extends Controller implements HasMiddleware
{
    public static function middleware() {
        return [ new Middleware('auth:sanctum') ];
    }

    public function index() {
        return Task::where('user_id', Auth::id())->get();
    }

    public function store(Request $request) {
        $fields = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'due_date' => 'required|date',
            'status' => 'required|in:pending,completed',
        ]);

        return $request->user()->tasks()->create($fields);
    }

    public function show(Task $task) {
        return $task;
    }


    public function update(Request $request, Task $task) {
        if (Auth::id() !== $task->user_id) {
            return response()->json(['message' => 'This action is unauthorized'], 403);
        }
        
        $fields = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'due_date' => 'required|date',
            'status' => 'required|in:pending,completed',
        ]);

        $task->update($fields);

        return $task;
    }

    public function destroy(Task $task) {
        if (Auth::id() !== $task->user_id) {
            return response()->json(['message' => 'This action is unauthorized'], 403);
        }
    
        $task->delete();

        return ['message' => 'Task was deleted'];
    }
}
