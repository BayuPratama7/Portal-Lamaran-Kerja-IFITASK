<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;

class PostApiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $query = Post::where('is_active', true);
            
            // Only filter by deadline if it's not in debug mode
            if (!$request->has('debug')) {
                $query->where('deadline', '>=', now());
            }

            // Search functionality
            if ($request->has('search')) {
                $search = $request->get('search');
                $query->where(function($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                      ->orWhere('company', 'like', "%{$search}%")
                      ->orWhere('location', 'like', "%{$search}%");
                });
            }

            // Filter by job type
            if ($request->has('job_type')) {
                $query->where('job_type', $request->get('job_type'));
            }

            // Filter by location
            if ($request->has('location')) {
                $query->where('location', 'like', "%{$request->get('location')}%");
            }

            $posts = $query->orderBy('created_at', 'desc')
                ->paginate($request->get('per_page', 12));

            return response()->json([
                'success' => true,
                'data' => $posts
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        try {
            $post = Post::where('is_active', true)->findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $post
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'title' => 'required|string|max:255',
                'company' => 'required|string|max:255',
                'location' => 'required|string|max:255',
                'job_type' => 'required|string|max:255',
                'salary_range' => 'nullable|string|max:255',
                'description' => 'required|string',
                'requirements' => 'required|string',
                'benefits' => 'nullable|string',
                'contact_email' => 'required|email|max:255',
                'contact_phone' => 'nullable|string|max:255',
                'deadline' => 'required|date',
                'is_active' => 'boolean',
            ]);

            $post = Post::create($validatedData);

            return response()->json([
                'success' => true,
                'data' => $post,
                'message' => 'Post created successfully'
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try {
            $post = Post::findOrFail($id);
            
            $validatedData = $request->validate([
                'title' => 'sometimes|required|string|max:255',
                'company' => 'sometimes|required|string|max:255',
                'location' => 'sometimes|required|string|max:255',
                'job_type' => 'sometimes|required|string|max:255',
                'salary_range' => 'nullable|string|max:255',
                'description' => 'sometimes|required|string',
                'requirements' => 'sometimes|required|string',
                'benefits' => 'nullable|string',
                'contact_email' => 'sometimes|required|email|max:255',
                'contact_phone' => 'nullable|string|max:255',
                'deadline' => 'sometimes|required|date',
                'is_active' => 'boolean',
            ]);

            $post->update($validatedData);

            return response()->json([
                'success' => true,
                'data' => $post,
                'message' => 'Post updated successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $post = Post::findOrFail($id);
            $post->delete();

            return response()->json([
                'success' => true,
                'message' => 'Post deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
