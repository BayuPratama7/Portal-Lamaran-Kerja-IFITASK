'use client';

import { useState, useEffect } from 'react';
import { Post, PaginatedResponse } from '@/types';
import PostCard from '@/components/PostCard';
import SearchFilter from '@/components/SearchFilter';
import Pagination from '@/components/Pagination';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
  });
  const [filters, setFilters] = useState({
    search: '',
    job_type: '',
    location: '',
  });

  const fetchPosts = async (page = 1, searchFilters = filters) => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        ...(searchFilters.search && { search: searchFilters.search }),
        ...(searchFilters.job_type && { job_type: searchFilters.job_type }),
        ...(searchFilters.location && { location: searchFilters.location }),
      });

      const response = await fetch(`http://127.0.0.1:8000/api/v1/posts?${queryParams}`);
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      
      const result: PaginatedResponse<Post> = await response.json();

      if (result.success) {
        setPosts(result.data.data);
        setPagination({
          current_page: result.data.current_page,
          last_page: result.data.last_page,
          total: result.data.total,
        });
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

  const handleSearch = (searchFilters: typeof filters) => {
    setFilters(searchFilters);
    fetchPosts(1, searchFilters);
  };

  const handlePageChange = (page: number) => {
    fetchPosts(page);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Semua Lowongan Kerja</h1>
          <p className="text-xl text-blue-100 mb-8">
            Temukan peluang karir terbaik yang sesuai dengan keahlian Anda
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/admin"
              className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-400 transition-colors"
            >
              🔐 Admin Panel
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Filter */}
        <SearchFilter onSearch={handleSearch} loading={loading} />

        {/* Stats */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex flex-wrap justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">
                Hasil Pencarian Lowongan
              </h2>
              <div className="text-sm text-gray-600">
                Menampilkan {posts.length} dari {pagination.total} lowongan
              </div>
            </div>
          </div>
        </div>

        {/* Error State */}
        {error ? (
          <div className="text-center py-12">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
            <button 
              onClick={() => fetchPosts()}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Coba Lagi
            </button>
            <div className="mt-4">
              <Link href="/api-test" className="text-blue-500 hover:text-blue-700">
                Test API Connection
              </Link>
            </div>
          </div>
        ) : loading ? (
          /* Loading State */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          /* Empty State */
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Tidak Ada Lowongan Ditemukan
            </h3>
            <p className="text-gray-600 mb-6">
              Coba ubah filter pencarian atau kata kunci Anda
            </p>
            <button
              onClick={() => {
                setFilters({ search: '', job_type: '', location: '' });
                fetchPosts(1, { search: '', job_type: '', location: '' });
              }}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          /* Posts Grid */
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            {/* Pagination */}
            {pagination.last_page > 1 && (
              <Pagination
                currentPage={pagination.current_page}
                lastPage={pagination.last_page}
                onPageChange={handlePageChange}
                loading={loading}
              />
            )}
          </>
        )}

        {/* Call to Action */}
        {posts.length > 0 && (
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg text-white p-8 mt-12 text-center">
            <h3 className="text-2xl font-bold mb-4">
              Tidak Menemukan Lowongan yang Sesuai?
            </h3>
            <p className="text-blue-100 mb-6">
              Daftarkan diri Anda untuk mendapatkan notifikasi lowongan terbaru
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="Email Anda"
                className="px-4 py-3 rounded-lg text-gray-900 flex-1 max-w-sm"
              />
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100">
                Subscribe
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
