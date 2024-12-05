export default function Footer() {
    return (
      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center text-sm text-gray-600">
            <a href="/about" className="mx-2 mb-2 hover:underline">About</a>
            <a href="/contact" className="mx-2 mb-2 hover:underline">Contact us</a>
            <a href="/terms" className="mx-2 mb-2 hover:underline">Terms of Service</a>
            <a href="privacypolicy" className="mx-2 mb-2 hover:underline">Privacy Policy</a>
            <a href="/faqs" className="mx-2 mb-2 hover:underline">FAQs</a>
          </div>
          <div className="text-center mt-4 text-sm text-gray-600 font-serif">
            © 2024 Newzsage, Inc.
          </div>
        </div>
      </footer>
    )
  }
  
  