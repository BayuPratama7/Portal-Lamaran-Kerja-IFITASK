'use client';

import { Post } from '@/types';
import Link from 'next/link';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
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

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-200">
      <div className="flex flex-col h-full">
        <div className="flex-grow">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors">
              <Link href={`/jobs/${post.id}`}>
                {post.title}
              </Link>
            </h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getJobTypeColor(post.job_type)}`}>
              {post.job_type}
            </span>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex items-center text-gray-600">
              <span className="text-sm mr-2">🏢</span>
              <span className="text-sm">{post.company}</span>
            </div>
            
            <div className="flex items-center text-gray-600">
              <span className="text-sm mr-2">📍</span>
              <span className="text-sm">{post.location}</span>
            </div>

            {post.salary_range && (
              <div className="flex items-center text-gray-600">
                <span className="text-sm mr-2">💰</span>
                <span className="text-sm">{post.salary_range}</span>
              </div>
            )}
          </div>

          <div 
            className="text-gray-700 text-sm line-clamp-3 mb-4"
            dangerouslySetInnerHTML={{
              __html: post.description.replace(/<[^>]*>/g, '').substring(0, 120) + '...'
            }}
          />
        </div>

        <div className="pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <div className="flex items-center text-gray-500 text-xs">
              <span className="mr-1">📅</span>
              <span>Deadline: {formatDate(post.deadline)}</span>
            </div>
            
            <div className="flex items-center text-gray-500 text-xs">
              <span className="mr-1">🕒</span>
              <span>Diposting: {formatDate(post.created_at)}</span>
            </div>
          </div>

          <Link
            href={`/jobs/${post.id}`}
            className="mt-3 w-full bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 inline-block"
          >
            Lihat Detail
          </Link>
        </div>
      </div>
    </div>
  );
}
