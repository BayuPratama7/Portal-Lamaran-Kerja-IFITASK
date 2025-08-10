'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Post, SingleResponse } from '@/types';
import Link from 'next/link';

export default function JobDetail() {
  const params = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/v1/posts/${params.id}`);
        const result: SingleResponse<Post> = await response.json();

        if (result.success) {
          setPost(result.data);
        } else {
          setError('Lowongan tidak ditemukan');
        }
      } catch (err) {
        setError('Terjadi kesalahan saat memuat data');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchPost();
    }
  }, [params.id]);

  const handleEmailClick = () => {
    if (!post) return;
    
    const subject = encodeURIComponent(`Lamaran Kerja - ${post.title}`);
    const body = encodeURIComponent(`Yth. HRD ${post.company},

Saya tertarik untuk melamar posisi ${post.title} yang diiklankan di Portal Lowongan Kerja.

Mohon informasi lebih lanjut mengenai:
1. Proses seleksi
2. Dokumen yang diperlukan
3. Jadwal interview

Terima kasih atas perhatiannya.

Hormat saya,
[Nama Anda]`);
    
    const mailtoUrl = `mailto:${post.contact_email}?subject=${subject}&body=${body}`;
    
    // Try to open email client
    try {
      window.location.href = mailtoUrl;
    } catch (error) {
      // Fallback: copy email to clipboard
      navigator.clipboard.writeText(post.contact_email).then(() => {
        alert(`Email ${post.contact_email} berhasil disalin ke clipboard!`);
      }).catch(() => {
        alert(`Silakan kirim email ke: ${post.contact_email}`);
      });
    }
  };

  const handlePhoneClick = () => {
    if (!post || !post.contact_phone) return;
    
    try {
      window.location.href = `tel:${post.contact_phone}`;
    } catch (error) {
      // Fallback: copy phone to clipboard
      navigator.clipboard.writeText(post.contact_phone).then(() => {
        alert(`Nomor telepon ${post.contact_phone} berhasil disalin ke clipboard!`);
      }).catch(() => {
        alert(`Silakan hubungi: ${post.contact_phone}`);
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getJobTypeColor = (jobType: string) => {
    switch (jobType) {
      case 'Full Time':
        return 'bg-green-100 text-green-800';
      case 'Part Time':
        return 'bg-blue-100 text-blue-800';
      case 'Contract':
        return 'bg-yellow-100 text-yellow-800';
      case 'Internship':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-8 animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-6"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-red-500 text-6xl mb-4">❌</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {error || 'Lowongan tidak ditemukan'}
            </h1>
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              ← Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-gray-700">
                Beranda
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/jobs" className="hover:text-gray-700">
                Lowongan
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium">{post.title}</li>
          </ol>
        </nav>

        {/* Job Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
            <div className="flex-grow">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {post.title}
              </h1>
              <div className="flex items-center space-x-4 text-gray-600 mb-4">
                <span className="flex items-center">
                  <span className="mr-2">🏢</span>
                  {post.company}
                </span>
                <span className="flex items-center">
                  <span className="mr-2">📍</span>
                  {post.location}
                </span>
              </div>
            </div>
            
            <div className="flex flex-col items-end space-y-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getJobTypeColor(post.job_type)}`}>
                {post.job_type}
              </span>
              <span className="text-sm text-gray-500">
                Deadline: {formatDate(post.deadline)}
              </span>
            </div>
          </div>

          {post.salary_range && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <span className="mr-2">💰</span>
                <span className="font-semibold text-gray-900">
                  Range Gaji: {post.salary_range}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Job Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Description */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Deskripsi Pekerjaan
              </h2>
              <div 
                className="prose prose-sm max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: post.description }}
              />
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Persyaratan
              </h2>
              <div 
                className="prose prose-sm max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: post.requirements }}
              />
            </div>

            {/* Benefits */}
            {post.benefits && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Benefit & Fasilitas
                </h2>
                <div 
                  className="prose prose-sm max-w-none text-gray-700"
                  dangerouslySetInnerHTML={{ __html: post.benefits }}
                />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Informasi Lamaran
              </h3>
              
              <div className="space-y-4 mb-6">
                <div>
                  <span className="text-sm font-medium text-gray-500">Email:</span>
                  <p className="text-gray-900">{post.contact_email}</p>
                </div>
                
                {post.contact_phone && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">Telepon:</span>
                    <p className="text-gray-900">{post.contact_phone}</p>
                  </div>
                )}
                
                <div>
                  <span className="text-sm font-medium text-gray-500">Deadline:</span>
                  <p className="text-gray-900">{formatDate(post.deadline)}</p>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleEmailClick}
                  className="w-full bg-blue-600 text-white text-center py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
                >
                  📧 Kirim Email Lamaran
                </button>
                
                {post.contact_phone && (
                  <button
                    onClick={handlePhoneClick}
                    className="w-full bg-green-600 text-white text-center py-3 px-4 rounded-md hover:bg-green-700 transition-colors font-medium"
                  >
                    📞 Hubungi via Telepon
                  </button>
                )}
              </div>
            </div>

            {/* Company Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Informasi Perusahaan
              </h3>
              
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-500">Nama Perusahaan:</span>
                  <p className="text-gray-900 font-medium">{post.company}</p>
                </div>
                
                <div>
                  <span className="text-sm font-medium text-gray-500">Lokasi:</span>
                  <p className="text-gray-900">{post.location}</p>
                </div>
                
                <div>
                  <span className="text-sm font-medium text-gray-500">Dipublikasi:</span>
                  <p className="text-gray-900">{formatDate(post.created_at)}</p>
                </div>
              </div>
            </div>

            {/* Back Button */}
            <Link
              href="/"
              className="w-full bg-gray-600 text-white text-center py-3 px-4 rounded-md hover:bg-gray-700 transition-colors font-medium inline-block"
            >
              ← Kembali ke Daftar Lowongan
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
