@extends('layouts.app')

@section('title', 'Detail Lowongan - ' . $post->title)

@section('content')
<div class="d-flex justify-content-between align-items-center mb-4">
    <h1>Detail Lowongan</h1>
    <div class="btn-group">
        <a href="{{ route('posts.index') }}" class="btn btn-secondary">Kembali</a>
        <a href="{{ route('posts.edit', $post) }}" class="btn btn-warning">Edit</a>
    </div>
</div>

<div class="card">
    <div class="card-header">
        <div class="d-flex justify-content-between align-items-center">
            <h3 class="mb-0">{{ $post->title }}</h3>
            <div>
                @if($post->is_active && $post->deadline >= now())
                    <span class="badge bg-success fs-6">Aktif</span>
                @else
                    <span class="badge bg-secondary fs-6">Tidak Aktif</span>
                @endif
            </div>
        </div>
    </div>
    <div class="card-body">
        <div class="row mb-4">
            <div class="col-md-6">
                <table class="table table-borderless">
                    <tr>
                        <td class="fw-bold" width="150">Perusahaan:</td>
                        <td>{{ $post->company }}</td>
                    </tr>
                    <tr>
                        <td class="fw-bold">Lokasi:</td>
                        <td>{{ $post->location }}</td>
                    </tr>
                    <tr>
                        <td class="fw-bold">Tipe Pekerjaan:</td>
                        <td><span class="badge bg-info">{{ $post->job_type }}</span></td>
                    </tr>
                    @if($post->salary_range)
                    <tr>
                        <td class="fw-bold">Range Gaji:</td>
                        <td>{{ $post->salary_range }}</td>
                    </tr>
                    @endif
                </table>
            </div>
            <div class="col-md-6">
                <table class="table table-borderless">
                    <tr>
                        <td class="fw-bold" width="150">Deadline:</td>
                        <td>{{ $post->deadline->format('d F Y') }}</td>
                    </tr>
                    <tr>
                        <td class="fw-bold">Email Kontak:</td>
                        <td><a href="mailto:{{ $post->contact_email }}">{{ $post->contact_email }}</a></td>
                    </tr>
                    @if($post->contact_phone)
                    <tr>
                        <td class="fw-bold">Telepon:</td>
                        <td><a href="tel:{{ $post->contact_phone }}">{{ $post->contact_phone }}</a></td>
                    </tr>
                    @endif
                    <tr>
                        <td class="fw-bold">Dipublikasi:</td>
                        <td>{{ $post->created_at->format('d F Y, H:i') }}</td>
                    </tr>
                </table>
            </div>
        </div>

        <div class="mb-4">
            <h5>Deskripsi Pekerjaan</h5>
            <div class="content-display">
                {!! $post->description !!}
            </div>
        </div>

        <div class="mb-4">
            <h5>Persyaratan</h5>
            <div class="content-display">
                {!! $post->requirements !!}
            </div>
        </div>

        @if($post->benefits)
        <div class="mb-4">
            <h5>Benefit & Fasilitas</h5>
            <div class="content-display">
                {!! $post->benefits !!}
            </div>
        </div>
        @endif
    </div>
    <div class="card-footer">
        <div class="d-flex justify-content-between">
            <small class="text-muted">
                Terakhir diperbarui: {{ $post->updated_at->format('d F Y, H:i') }}
            </small>
            <div class="btn-group">
                <a href="{{ route('posts.edit', $post) }}" class="btn btn-sm btn-warning">Edit</a>
                <form action="{{ route('posts.destroy', $post) }}" method="POST" class="d-inline">
                    @csrf
                    @method('DELETE')
                    <button type="submit" class="btn btn-sm btn-danger" 
                            onclick="return confirm('Yakin ingin menghapus lowongan ini?')">
                        Hapus
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>
@endsection

@push('styles')
<style>
.content-display {
    background-color: #f8f9fa;
    padding: 1rem;
    border-radius: 0.375rem;
    border: 1px solid #dee2e6;
}
</style>
@endpush
