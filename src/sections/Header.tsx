import { useState, useEffect } from 'react';
import { Menu, X, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  scrollY: number;
}

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Contact', href: '#contact' },
];

export default function Header({ scrollY }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Fade in header on load
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const isScrolled = scrollY > 50;

  const scrollToSection = (href: string) => {
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } ${
        isScrolled
          ? 'bg-tokyo-bg/90 backdrop-blur-lg border-b border-tokyo-border'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 group"
          >
            <span className="text-2xl font-bold text-gradient font-mono">
              AZ
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="relative text-sm text-tokyo-text-secondary hover:text-white transition-colors duration-200 group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-tokyo-accent-purple to-tokyo-accent-pink transition-all duration-200 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
           <a href="/your-cv.pdf" download="/public/MYCV.pdf">
            <Button
              variant="outline"
              size="sm"
              className="border-tokyo-accent-purple/50 text-tokyo-accent-purple hover:bg-tokyo-accent-purple/10 hover:border-tokyo-accent-purple"
            >
              <Download className="w-4 h-4 mr-2" />
              CV
            </Button>
           </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-tokyo-text-secondary hover:text-white transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-tokyo-bg/95 backdrop-blur-lg border-b border-tokyo-border transition-all duration-300 ${
          isMenuOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col p-4 space-y-4">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.href)}
              className="text-left text-tokyo-text-secondary hover:text-white transition-colors py-2"
            >
              {link.name}
            </button>
          ))}
         <a href="/your-cv.pdf" download="/public/MYCV.pdf">  
          <Button
            variant="outline"
            size="sm"
            className="border-tokyo-accent-purple/50 text-tokyo-accent-purple hover:bg-tokyo-accent-purple/10 w-full mt-4"
          >
            <Download className="w-4 h-4 mr-2" />
            Download CV
          </Button>
         </a>
        </nav>
      </div>
    </header>
  );
}
