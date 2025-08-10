<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Models\Post;
use App\Models\User;

Route::get('/', function () {
    return redirect()->route('posts.index');
});

// Admin routes for managing posts (public for demo)
Route::resource('posts', PostController::class);

// Temporary public routes for demo
Route::get('/public-posts', [PostController::class, 'index'])->name('public.posts.index');

// Debug routes
Route::get('/debug-check', function () {
    try {
        $postsCount = Post::count();
        $usersCount = User::count();
        $posts = Post::take(3)->get(['id', 'title', 'company']);
        
        $html = "<h1>Database Debug Check</h1>";
        $html .= "<p>Posts count: {$postsCount}</p>";
        $html .= "<p>Users count: {$usersCount}</p>";
        $html .= "<h2>Sample Posts:</h2><ul>";
        
        foreach($posts as $post) {
            $html .= "<li>{$post->id} - {$post->title} ({$post->company})</li>";
        }
        $html .= "</ul>";
        
        $html .= "<h2>API Test Links:</h2>";
        $html .= "<p><a href='/api/v1/posts' target='_blank'>API Posts</a></p>";
        $html .= "<p><a href='/api/test' target='_blank'>API Test</a></p>";
        
        return $html;
    } catch (Exception $e) {
        return "<h1>Database Error</h1><p>" . $e->getMessage() . "</p>";
    }
});
