<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'company',
        'location',
        'job_type',
        'salary_range',
        'description',
        'requirements',
        'benefits',
        'contact_email',
        'contact_phone',
        'deadline',
        'is_active'
    ];

    protected $casts = [
        'deadline' => 'date',
        'is_active' => 'boolean',
    ];
}
