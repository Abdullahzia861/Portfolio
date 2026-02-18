import { Shield, Heart, Linkedin, Mail, Github } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (href: string) => {
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

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="py-12 bg-tokyo-bg border-t border-tokyo-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-6 h-6 text-tokyo-accent-purple" />
              <span className="text-xl font-bold text-gradient font-mono">
                AZ
              </span>
            </div>
            <p className="text-sm text-tokyo-text-secondary mb-4">
              Cyber Security Specialist focused on defensive security, SOC operations,
              and threat detection.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://linkedin.com/in/abdullah-ziauddin-a861z"
                target="_blank"
                rel="noopener noreferrer"
                className="text-tokyo-text-muted hover:text-tokyo-accent-purple transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:abdullahmabdullah111@gmail.com"
                className="text-tokyo-text-muted hover:text-tokyo-accent-pink transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-tokyo-text-muted hover:text-tokyo-accent-cyan transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm text-tokyo-text-secondary hover:text-tokyo-accent-purple transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-tokyo-text-secondary">
              <li>abdullahmabdullah111@gmail.com</li>
              <li>0301-2287955</li>
              <li>Karachi, Pakistan</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-tokyo-border pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-tokyo-text-muted text-center md:text-left">
              © {currentYear} Abdullah Ziauddin. All rights reserved.
            </p>
            <p className="text-sm text-tokyo-text-muted flex items-center gap-1">
              Securing the digital world{' '}
              <Heart className="w-4 h-4 text-tokyo-accent-pink fill-tokyo-accent-pink" />{' '}
              one system at a time.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
