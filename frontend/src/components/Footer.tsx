export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Portal Lowongan Kerja</h3>
            <p className="text-gray-300 mb-4">
              Platform terpercaya untuk mencari dan menemukan lowongan kerja terbaik. 
              Hubungkan pencari kerja dengan perusahaan terkemuka di Indonesia.
            </p>
          </div>

          <div>
            <h4 className="text-md font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/" className="hover:text-white transition-colors">Beranda</a></li>
              <li><a href="/jobs" className="hover:text-white transition-colors">Lowongan</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-md font-semibold mb-4">Kontak</h4>
            <ul className="space-y-2 text-gray-300">
              <li>📧 bayubys07@gmail.com</li>
              <li>📞 12345678</li>
              <li>📍 Daerah Istimewa Yogyakarta</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} Portal Lowongan Kerja. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
