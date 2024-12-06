function Footer() {
    return (
      <footer className="bg-black text-white py-8 rounded-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 className="text-2xl font-bold mb-4">NewzSage</h3>
              <p>Empowering local voices, one story at a time.</p>
            </div>
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h4 className="text-lg font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="hover:underline">About Us</Link></li>
                <li><Link to="/faq" className="hover:underline">FAQs</Link></li>
                <li><Link to="/privacy" className="hover:underline">Privacy Policy</Link></li>
                <li><Link to="/contact" className="hover:underline">Contact</Link></li>
              </ul>
            </div>
            <div className="w-full md:w-1/3">
              <h4 className="text-lg font-bold mb-4">Follow Us</h4>
              <p>Stay connected with our community.</p>
            </div>
          </div>
        </div>
      </footer>
    );
  }