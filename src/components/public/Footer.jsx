import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-green-700 via-green-800 to-teal-900 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Logo + Description */}
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-4">🌿 AI with Farmer</h2>
          <p className="text-sm leading-relaxed">
            Sed ut perspiciatis unde omnis iste natus error sit amet voluptatem totam rem aperiam.
          </p>
          <p className="mt-4 text-sm">📞 +012 (345) 678 99</p>
        </div>

        {/* Resources */}
        <div>
          <h3 className="font-bold mb-4">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#">SaaS Development</a></li>
            <li><a href="#">Our Products</a></li>
            <li><a href="#">User Flow</a></li>
            <li><a href="#">User Strategy</a></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#">About TailGrids</a></li>
            <li><a href="#">Contact & Support</a></li>
            <li><a href="#">Success History</a></li>
            <li><a href="#">Setting & Privacy</a></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#">Premium Support</a></li>
            <li><a href="#">Our Services</a></li>
            <li><a href="#">Know Our Team</a></li>
            <li><a href="#">Download App</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8  pt-6 flex flex-col md:flex-row justify-between items-center text-sm">
        <p>© 2025 TailGrids</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#"><FaFacebookF /></a>
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaYoutube /></a>
          <a href="#"><FaInstagram /></a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
