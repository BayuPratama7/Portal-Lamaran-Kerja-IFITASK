'use client';

import { useState, useEffect } from 'react';
import { Post, PaginatedResponse } from '@/types';
import PostCard from '@/components/PostCard';
import Link from 'next/link';

export default function JobsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/v1/posts`);
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      
      const result: PaginatedResponse<Post> = await response.json();

      if (result.success) {
        setPosts(result.data.data);
      } else {
        setError('Failed to fetch posts');
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Failed to connect to API. Please check if backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Portal Lowongan Kerja
            </h1>
            <p className="text-gray-600 mb-6">
              Temukan lowongan kerja terbaru
            </p>
            <Link
              href="/"
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              � Lihat Semua Lowongan
              <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Latest Jobs */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Lowongan Terbaru
          </h2>
        </div>

        {/* Posts Grid */}
        {loading ? (
          <div className="text-center py-8">
            <div className="text-gray-600">Memuat lowongan...</div>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <div className="text-red-600 mb-4">{error}</div>
            <button 
              onClick={() => fetchPosts()}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Coba Lagi
            </button>
          </div>
        ) : posts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {posts.slice(0, 6).map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
            
            {/* View All Button */}
            <div className="text-center">
              <Link
                href="/"
                className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                ← KEMBALI KE BERANDA
                <span className="ml-2">→</span>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-4xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Belum ada lowongan tersedia
            </h3>
            <p className="text-gray-600">
              Silakan cek kembali nanti
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
