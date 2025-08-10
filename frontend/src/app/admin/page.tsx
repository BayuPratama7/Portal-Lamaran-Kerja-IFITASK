'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import Link from 'next/link';

interface Stats {
  totalPosts: number;
  activePosts: number;
  expiredPosts: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalPosts: 0,
    activePosts: 0,
    expiredPosts: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/debug-posts');
      const data = await response.json();
      
      setStats({
        totalPosts: data.all_posts || 0,
        activePosts: data.active_posts || 0,
        expiredPosts: (data.all_posts || 0) - (data.active_posts || 0),
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div>
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
          <p className="text-gray-600 mt-2">Selamat datang di panel admin Portal Lowongan Kerja</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <span className="text-2xl">📊</span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Total Lowongan</h3>
                <p className="text-3xl font-bold text-blue-600">
                  {loading ? '...' : stats.totalPosts}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <span className="text-2xl">✅</span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Lowongan Aktif</h3>
                <p className="text-3xl font-bold text-green-600">
                  {loading ? '...' : stats.activePosts}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-lg">
                <span className="text-2xl">❌</span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Lowongan Nonaktif</h3>
                <p className="text-3xl font-bold text-red-600">
                  {loading ? '...' : stats.expiredPosts}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Aksi Cepat</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/admin/posts/create"
              className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <span className="text-2xl mr-3">➕</span>
              <div>
                <h4 className="font-medium text-gray-900">Tambah Lowongan</h4>
                <p className="text-sm text-gray-600">Buat lowongan baru</p>
              </div>
            </Link>

            <Link
              href="/admin/posts"
              className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <span className="text-2xl mr-3">📝</span>
              <div>
                <h4 className="font-medium text-gray-900">Kelola Lowongan</h4>
                <p className="text-sm text-gray-600">Edit & hapus lowongan</p>
              </div>
            </Link>

            <a
              href="http://127.0.0.1:8000/posts"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <span className="text-2xl mr-3">🔗</span>
              <div>
                <h4 className="font-medium text-gray-900">Admin Laravel</h4>
                <p className="text-sm text-gray-600">Buka panel Laravel</p>
              </div>
            </a>

            <Link
              href="/"
              className="flex items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
            >
              <span className="text-2xl mr-3">🏠</span>
              <div>
                <h4 className="font-medium text-gray-900">Portal Publik</h4>
                <p className="text-sm text-gray-600">Lihat portal user</p>
              </div>
            </Link>
          </div>
        </div>

        {/* System Info */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Informasi Sistem</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Frontend (Next.js)</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• URL: http://localhost:3002</li>
                <li>• Status: ✅ Running</li>
                <li>• Port: 3002</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Backend (Laravel)</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• URL: http://127.0.0.1:8000</li>
                <li>• API: http://127.0.0.1:8000/api/v1/posts</li>
                <li>• Status: ✅ Running</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
