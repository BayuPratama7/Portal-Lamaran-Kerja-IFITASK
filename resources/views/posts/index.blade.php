@extends('layouts.app')

@section('title', 'Kelola Lowongan Kerja')

@section('content')
<div class="d-flex justify-content-between align-items-center mb-4">
    <h1>Kelola Lowongan Kerja</h1>
    <a href="{{ route('posts.create') }}" class="btn btn-primary">
        <i class="bi bi-plus"></i> Tambah Lowongan
    </a>
</div>

<div class="card">
    <div class="card-body">
        @if($posts->count() > 0)
            <div class="table-responsive">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Judul</th>
                            <th>Perusahaan</th>
                            <th>Lokasi</th>
                            <th>Tipe Pekerjaan</th>
                            <th>Deadline</th>
                            <th>Status</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($posts as $post)
                        <tr>
                            <td>{{ $post->title }}</td>
                            <td>{{ $post->company }}</td>
                            <td>{{ $post->location }}</td>
                            <td>
                                <span class="badge bg-info">{{ $post->job_type }}</span>
                            </td>
                            <td>{{ $post->deadline->format('d/m/Y') }}</td>
                            <td>
                                @if($post->is_active && $post->deadline >= now())
                                    <span class="badge bg-success">Aktif</span>
                                @else
                                    <span class="badge bg-secondary">Tidak Aktif</span>
                                @endif
                            </td>
                            <td>
                                <div class="btn-group" role="group">
                                    <a href="{{ route('posts.show', $post) }}" class="btn btn-sm btn-outline-info">Detail</a>
                                    <a href="{{ route('posts.edit', $post) }}" class="btn btn-sm btn-outline-warning">Edit</a>
                                    <form action="{{ route('posts.destroy', $post) }}" method="POST" class="d-inline">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="btn btn-sm btn-outline-danger" 
                                                onclick="return confirm('Yakin ingin menghapus lowongan ini?')">
                                            Hapus
                                        </button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>

            <div class="d-flex justify-content-center">
                {{ $posts->links() }}
            </div>
        @else
            <div class="text-center py-5">
                <h5>Belum ada lowongan kerja</h5>
                <p class="text-muted">Mulai tambahkan lowongan kerja untuk mengelola portal Anda.</p>
                <a href="{{ route('posts.create') }}" class="btn btn-primary">Tambah Lowongan Pertama</a>
            </div>
        @endif
    </div>
</div>
@endsection
