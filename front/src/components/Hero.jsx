import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Hero() {
    const navigate = useNavigate();
  return (
    <main className="flex-grow container mx-auto py-12 px-4 flex flex-col md:flex-row items-stretch justify-between">
      <div className="md:w-1/2 mb-8 md:mb-0 flex flex-col justify-center">
        <h1 className="text-6xl font-bold mb-4 font-serif">Newzsage</h1>
        <h2 className="text-3xl font-semibold mb-6 font-serif">THE VOICE</h2>
        <p className="text-xl mb-8">Stay informed with the latest news and stories from around the world.</p>
      </div>
      <div className="md:w-1/2 flex items-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-auto">
          <h3 className="text-2xl font-bold mb-6 font-serif">Join today.</h3>
          <button className="w-full mb-4 flex items-center justify-center border border-gray-300 rounded-full px-4 py-2 hover:bg-gray-50">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M23.48 12.2c0-.84-.08-1.64-.22-2.42H12v4.58h6.46c-.28 1.48-1.12 2.74-2.4 3.58v2.98h3.88c2.28-2.1 3.58-5.2 3.58-8.72z" fill="#4285F4"/>
              <path d="M12 24c3.24 0 5.96-1.08 7.94-2.9l-3.88-2.98c-1.08.72-2.46 1.14-4.06 1.14-3.12 0-5.76-2.1-6.7-4.94H1.32v3.08C3.28 21.46 7.34 24 12 24z" fill="#34A853"/>
              <path d="M5.3 14.32c-.24-.72-.38-1.5-.38-2.32s.14-1.6.38-2.32V6.6H1.32C.48 8.22 0 10.06 0 12s.48 3.78 1.32 5.4l3.98-3.08z" fill="#FBBC05"/>
              <path d="M12 4.74c1.76 0 3.34.6 4.58 1.78l3.44-3.44C17.96 1.18 15.24 0 12 0 7.34 0 3.28 2.54 1.32 6.6l3.98 3.08C6.24 6.84 8.88 4.74 12 4.74z" fill="#EA4335"/>
            </svg>
            Sign up with Google
          </button>
          <button className="w-full mb-4 flex items-center justify-center border border-gray-300 rounded-full px-4 py-2 hover:bg-gray-50">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z"/>
            </svg>
            Sign up with Apple
          </button>
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-4 text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <button
              className="w-full bg-blue-600 text-white rounded-full px-4 py-2 hover:bg-blue-700"
              onClick={() => navigate('/signup')}
            >
              Create account
            </button>
          <p className="mt-4 text-xs text-gray-500">
            By signing up, you agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>, including <a href="#" className="text-blue-600 hover:underline">Cookie Use</a>.
          </p>
          <div className="mt-8">
            <h4 className="font-bold mb-2">Already have an account?</h4>
            <a href="/signin" className="w-full block text-center border border-blue-600 text-blue-600 rounded-full px-4 py-2 hover:bg-blue-50">
              Sign in
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}

