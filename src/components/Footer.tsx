import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white border-t-2 border-black mt-16">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Left side - Copyright */}
          <div className="text-center md:text-left">
            <p className="text-black font-serif text-sm">
              © 2024 Cat Years in Human Years. All rights reserved.
            </p>
            <p className="text-gray-600 font-serif text-xs mt-1">
              Understanding your feline friend's age since 2024
            </p>
          </div>

          {/* Right side - Admin link */}
          <div className="text-center md:text-right">
            <Link
              to="/admin"
              className="text-gray-500 font-serif text-xs uppercase tracking-wide hover:text-black hover:underline transition-all duration-200"
            >ADMIN</Link>
          </div>
        </div>

        {/* Bottom border decoration */}
        <div className="mt-6 pt-4 border-t border-gray-300">
          <div className="text-center">
            <p className="text-gray-500 font-serif text-xs">
              🐱 Made with love for cat enthusiasts worldwide 🐱
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}