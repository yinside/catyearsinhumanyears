import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onNavigate?: (section: string) => void;
}

export default function Header({ onNavigate }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    { id: 'calculator', label: 'Calculator', type: 'scroll' },
    { id: 'how-it-works', label: 'How It Works', type: 'scroll' },
    { id: 'fun-facts', label: 'Fun Facts', type: 'scroll' },
    { id: 'news', label: 'News', type: 'scroll' },
    { id: 'articles', label: 'MORE', type: 'route' }
  ];

  const handleNavClick = (item: { id: string; type: string }) => {
    if (item.type === 'route') {
      if (item.id === 'articles') {
        navigate('/articles');
      }
    } else {
      // Handle scroll navigation
      if (location.pathname !== '/') {
        navigate('/');
        // Wait for navigation to complete, then scroll
        setTimeout(() => {
          onNavigate?.(item.id);
        }, 100);
      } else {
        onNavigate?.(item.id);
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white border-b-2 border-black sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-bold font-serif text-black">
              🐱 CAT YEARS
            </div>
            <div className="hidden sm:block text-sm font-serif text-gray-600">
              in Human Years
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className="text-black font-serif text-sm uppercase tracking-wide hover:underline transition-all duration-200 border-b-2 border-transparent hover:border-black"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-black hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pt-4 border-t border-gray-300">
            <div className="flex flex-col space-y-3">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className="text-left text-black font-serif text-sm uppercase tracking-wide hover:underline py-2"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}