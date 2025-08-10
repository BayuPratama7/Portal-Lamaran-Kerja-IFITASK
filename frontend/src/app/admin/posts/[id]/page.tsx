'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import AdminLayout from '@/components/AdminLayout';
import Link from 'next/link';
import { Post } from '@/types';

export default function AdminPostDetail() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.id) {
      fetchPost();
    }
  }, [params.id]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/v1/posts/${params.id}`);
      const result = await response.json();
      
      if (result.success) {
        setPost(result.data);
      } else {
        setError('Failed to fetch post');
      }
    } catch (error) {
      setError('Failed to connect to API');
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async () => {
    if (!confirm('Apakah Anda yakin ingin menghapus lowongan ini?')) {
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/v1/posts/${params.id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        alert('Lowongan berhasil dihapus');
        router.push('/admin/posts');
      } else {
        alert('Gagal menghapus lowongan');
      }
    } catch (error) {
      alert('Error menghapus lowongan');
    }
  };

  const toggleStatus = async () => {
    if (!post) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/v1/posts/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...post,
          is_active: !post.is_active
        }),
      });
      
      if (response.ok) {
        setPost({ ...post, is_active: !post.is_active });
        alert(`Lowongan berhasil ${!post.is_active ? 'diaktifkan' : 'dinonaktifkan'}`);
      } else {
        alert('Gagal mengubah status lowongan');
      }
    } catch (error) {
      alert('Error mengubah status lowongan');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <div className="text-lg">Loading...</div>
        </div>
      </AdminLayout>
    );
  }

  if (error || !post) {
    return (
      <AdminLayout>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error || 'Lowongan tidak ditemukan'}
          <Link 
            href="/admin/posts"
            className="ml-4 underline hover:no-underline"
          >
            Kembali ke Kelola Lowongan
          </Link>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div>
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <Link
              href="/admin/posts"
              className="text-blue-600 hover:text-blue-800 mb-2 inline-block"
            >
              ← Kembali ke Kelola Lowongan
            </Link>
            <h2 className="text-3xl font-bold text-gray-900">Detail Lowongan</h2>
            <p className="text-gray-600 mt-2">Informasi lengkap lowongan kerja</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={toggleStatus}
              className={`px-4 py-2 rounded-lg text-white ${
                post.is_active 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {post.is_active ? '🔴 Nonaktifkan' : '🟢 Aktifkan'}
            </button>
            <Link
              href={`/admin/posts/${post.id}/edit`}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              ✏️ Edit
            </Link>
            <button
              onClick={deletePost}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              🗑️ Hapus
            </button>
            <Link
              href={`/jobs/${post.id}`}
              target="_blank"
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
            >
              👁️ Lihat di Portal
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6">
            {/* Status Badge */}
            <div className="mb-6">
              <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                post.is_active 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {post.is_active ? 'Aktif' : 'Nonaktif'}
              </span>
            </div>

            {/* Main Info */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{post.title}</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Perusahaan</label>
                    <p className="mt-1 text-lg text-gray-900">{post.company}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Lokasi</label>
                    <p className="mt-1 text-lg text-gray-900">{post.location}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Tipe Pekerjaan</label>
                    <span className="mt-1 inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-800">
                      {post.job_type}
                    </span>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Gaji</label>
                    <p className="mt-1 text-lg text-gray-900">{post.salary_range}</p>
                  </div>
                </div>
              </div>

              <div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Deadline</label>
                    <p className="mt-1 text-lg text-gray-900">{formatDate(post.deadline)}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Dibuat</label>
                    <p className="mt-1 text-lg text-gray-900">{formatDate(post.created_at)}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Terakhir Diperbarui</label>
                    <p className="mt-1 text-lg text-gray-900">{formatDate(post.updated_at)}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">ID Lowongan</label>
                    <p className="mt-1 text-lg text-gray-900">#{post.id}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mt-8">
              <label className="block text-sm font-medium text-gray-700 mb-3">Deskripsi Pekerjaan</label>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="prose max-w-none">
                  {post.description.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Requirements */}
            <div className="mt-8">
              <label className="block text-sm font-medium text-gray-700 mb-3">Persyaratan</label>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="prose max-w-none">
                  {post.requirements.split('\n').map((requirement, index) => (
                    <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                      {requirement}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
