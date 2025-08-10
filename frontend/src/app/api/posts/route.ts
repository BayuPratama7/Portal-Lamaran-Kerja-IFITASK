import { NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || '1';
  const search = searchParams.get('search') || '';
  const job_type = searchParams.get('job_type') || '';
  const location = searchParams.get('location') || '';

  try {
    const queryParams = new URLSearchParams({
      page,
      ...(search && { search }),
      ...(job_type && { job_type }),
      ...(location && { location }),
    });

    const response = await fetch(`${API_BASE_URL}/posts?${queryParams}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}
