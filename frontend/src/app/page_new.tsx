'use client';

import { useState, useEffect } from 'react';
import { Post, PaginatedResponse } from '@/types';
import PostCard from '@/components/PostCard';
import SearchFilter from '@/components/SearchFilter';
import Pagination from '@/components/Pagination';
import Link from 'next/link';

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
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
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        ...(searchFilters.search && { search: searchFilters.search }),
        ...(searchFilters.job_type && { job_type: searchFilters.job_type }),
        ...(searchFilters.location && { location: searchFilters.location }),
      });

      const response = await fetch(`/api/posts?${queryParams}`);
      const result: PaginatedResponse<Post> = await response.json();

      if (result.success) {
        setPosts(result.data.data);
        setPagination({
          current_page: result.data.current_page,
          last_page: result.data.last_page,
          total: result.data.total,
        });
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
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
    fetchPosts(page, filters);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Portal Lowongan Kerja
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Temukan Karir Impian Anda
            </p>
            <p className="text-lg text-blue-200 max-w-2xl mx-auto">
              Platform terpercaya untuk menemukan lowongan kerja terbaik dari perusahaan-perusahaan terkemuka di Indonesia
            </p>
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
                Lowongan Kerja Tersedia
              </h2>
              <div className="text-sm text-gray-600">
                Menampilkan {posts.length} dari {pagination.total} lowongan
              </div>
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded mb-2"></div>
                <div className="h-8 bg-gray-200 rounded mt-4"></div>
              </div>
            ))}
          </div>
        ) : posts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
            
            <Pagination
              currentPage={pagination.current_page}
              lastPage={pagination.last_page}
              onPageChange={handlePageChange}
              loading={loading}
            />
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Tidak ada lowongan ditemukan
            </h3>
            <p className="text-gray-600 mb-4">
              Coba ubah filter pencarian atau kata kunci Anda
            </p>
            <button
              onClick={() => handleSearch({ search: '', job_type: '', location: '' })}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Reset Pencarian
            </button>
          </div>
        )}

        {/* Call to Action */}
        <div className="bg-gray-100 rounded-lg p-8 mt-12 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Perusahaan Ingin Memasang Lowongan?
          </h3>
          <p className="text-gray-600 mb-6">
            Jangkau kandidat terbaik dengan memasang lowongan di platform kami
          </p>
          <Link
            href="/admin"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
          >
            Admin Panel
          </Link>
        </div>
      </div>
    </div>
  );
}
