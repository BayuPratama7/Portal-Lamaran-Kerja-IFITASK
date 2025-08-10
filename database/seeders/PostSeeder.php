<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Post;
use Carbon\Carbon;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $posts = [
            [
                'title' => 'Full Stack Developer',
                'company' => 'PT Teknologi Maju',
                'location' => 'Jakarta',
                'job_type' => 'Full Time',
                'salary_range' => 'Rp 8.000.000 - Rp 12.000.000',
                'description' => '<p>Kami mencari Full Stack Developer yang berpengalaman untuk bergabung dengan tim kami. Kandidat akan bertanggung jawab untuk mengembangkan aplikasi web menggunakan teknologi modern.</p>',
                'requirements' => '<ul><li>Minimal 2 tahun pengalaman sebagai Full Stack Developer</li><li>Menguasai JavaScript, PHP, Laravel, React/Vue.js</li><li>Familiar dengan database MySQL/PostgreSQL</li><li>Memahami Git version control</li></ul>',
                'benefits' => '<ul><li>Gaji kompetitif</li><li>Asuransi kesehatan</li><li>Flexible working hours</li><li>Training dan development</li></ul>',
                'contact_email' => 'hr@teknologimaju.com',
                'contact_phone' => '021-1234567',
                'deadline' => Carbon::now()->addDays(30),
                'is_active' => true,
            ],
            [
                'title' => 'Frontend Developer',
                'company' => 'Startup Digital',
                'location' => 'Bandung',
                'job_type' => 'Part Time',
                'salary_range' => 'Rp 5.000.000 - Rp 7.000.000',
                'description' => '<p>Bergabunglah dengan startup digital yang sedang berkembang pesat. Kami membutuhkan Frontend Developer yang kreatif dan passionate.</p>',
                'requirements' => '<ul><li>Minimal 1 tahun pengalaman Frontend Development</li><li>Menguasai HTML, CSS, JavaScript</li><li>Familiar dengan React.js atau Vue.js</li><li>Portfolio yang menarik</li></ul>',
                'benefits' => '<ul><li>Remote working</li><li>Equity options</li><li>Modern work environment</li></ul>',
                'contact_email' => 'careers@startupdigital.com',
                'contact_phone' => null,
                'deadline' => Carbon::now()->addDays(20),
                'is_active' => true,
            ],
            [
                'title' => 'Marketing Intern',
                'company' => 'PT Media Kreatif',
                'location' => 'Yogyakarta',
                'job_type' => 'Internship',
                'salary_range' => 'Rp 2.000.000 - Rp 3.000.000',
                'description' => '<p>Program magang untuk mahasiswa/fresh graduate yang tertarik dengan dunia digital marketing dan content creation.</p>',
                'requirements' => '<ul><li>Mahasiswa semester akhir atau fresh graduate</li><li>Tertarik dengan digital marketing</li><li>Kreatif dan up-to-date dengan tren social media</li><li>Bisa menggunakan design tools (Canva, Photoshop, dll)</li></ul>',
                'benefits' => '<ul><li>Mentoring dari senior marketer</li><li>Certificate</li><li>Networking opportunities</li></ul>',
                'contact_email' => 'internship@mediakreatif.com',
                'contact_phone' => '0274-567890',
                'deadline' => Carbon::now()->addDays(15),
                'is_active' => true,
            ]
        ];

        foreach ($posts as $post) {
            Post::create($post);
        }
    }
}
