<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PostApiController;
use App\Models\Post;

// Test route
Route::get('/test', function () {
    return response()->json(['message' => 'API is working']);
});

// Test posts direct
Route::get('/test-posts', function () {
    $posts = Post::all();
    return response()->json(['success' => true, 'data' => $posts, 'count' => $posts->count()]);
});

// Debug posts with conditions
Route::get('/debug-posts', function () {
    $allPosts = Post::all();
    $activePosts = Post::where('is_active', true)->get();
    $futureDeadline = Post::where('deadline', '>=', now())->get();
    $validPosts = Post::where('is_active', true)->where('deadline', '>=', now())->get();
    
    return response()->json([
        'all_posts' => $allPosts->count(),
        'active_posts' => $activePosts->count(), 
        'future_deadline' => $futureDeadline->count(),
        'valid_posts' => $validPosts->count(),
        'now' => now(),
        'sample_data' => $validPosts->take(2)
    ]);
});

Route::get('/user', function (Request $request) {
    return $request->user();
});

// Public API routes for frontend
Route::prefix('v1')->group(function () {
    Route::get('/posts', [PostApiController::class, 'index']);
    Route::get('/posts/{id}', [PostApiController::class, 'show']);
    Route::post('/posts', [PostApiController::class, 'store']);
    Route::put('/posts/{id}', [PostApiController::class, 'update']);
    Route::delete('/posts/{id}', [PostApiController::class, 'destroy']);
});
