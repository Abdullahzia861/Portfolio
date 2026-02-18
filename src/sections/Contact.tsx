import { useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Download, Send, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ContactInfoProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  delay: number;
  isVisible: boolean;
}

function ContactInfo({ icon, label, value, href, delay, isVisible }: ContactInfoProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const content = (
    <div
      className={`flex items-center gap-4 p-4 bg-tokyo-bg-secondary rounded-xl border border-tokyo-border hover:border-tokyo-accent-purple/50 transition-all duration-300 group ${
        isVisible ? 'animate-fade-up' : 'opacity-0'
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="p-3 bg-tokyo-accent-purple/10 rounded-lg text-tokyo-accent-purple group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm text-tokyo-text-muted">{label}</div>
        <div className="font-medium truncate">{value}</div>
      </div>
      {!href && (
        <button
          onClick={handleCopy}
          className="p-2 text-tokyo-text-muted hover:text-white transition-colors"
        >
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
        </button>
      )}
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        className="block"
      >
        {content}
      </a>
    );
  }

  return content;
}

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const contactDetails = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: 'Email',
      value: 'abdullahmabdullah111@gmail.com',
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: 'Phone',
      value: '0301-2287955',
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      label: 'LinkedIn',
      value: 'linkedin.com/in/abdullah-ziauddin',
      href: 'https://linkedin.com/in/abdullah-ziauddin-a861z',
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: 'Location',
      value: 'Karachi, Pakistan',
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 md:py-32 bg-gradient-to-b from-tokyo-bg-secondary to-tokyo-bg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Send className="w-5 h-5 text-tokyo-accent-cyan" />
            <span className="text-tokyo-accent-cyan font-mono text-sm">
              Get In Touch
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-tokyo-text-secondary max-w-2xl mx-auto">
            Open to opportunities in Cyber Security and SOC operations. Feel free to reach out
            for collaborations, job opportunities, or just to say hello!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <div className="space-y-4">
            {contactDetails.map((detail, index) => (
              <ContactInfo
                key={detail.label}
                {...detail}
                delay={index * 100}
                isVisible={isVisible}
              />
            ))}

            {/* CTA Card */}
            <div
              className={`p-6 bg-gradient-to-br from-tokyo-accent-purple/20 to-tokyo-accent-pink/20 rounded-xl border border-tokyo-border mt-8 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              <h3 className="font-semibold text-lg mb-2">Download My CV</h3>
              <p className="text-sm text-tokyo-text-secondary mb-4">
                Get a comprehensive overview of my skills, experience, and qualifications.
              </p>
              <Button
                className="bg-gradient-primary text-white hover:opacity-90 w-full"
              >
                <Download className="w-4 h-4 mr-2" />
                Download CV
              </Button>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className={`p-6 md:p-8 bg-tokyo-bg-secondary rounded-2xl border border-tokyo-border transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <h3 className="font-semibold text-xl mb-6">Send a Message</h3>
            <form className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-tokyo-text-secondary mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-3 bg-tokyo-bg border border-tokyo-border rounded-lg text-white placeholder:text-tokyo-text-muted focus:outline-none focus:border-tokyo-accent-purple transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-tokyo-text-secondary mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 bg-tokyo-bg border border-tokyo-border rounded-lg text-white placeholder:text-tokyo-text-muted focus:outline-none focus:border-tokyo-accent-purple transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-tokyo-text-secondary mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="Message subject"
                  className="w-full px-4 py-3 bg-tokyo-bg border border-tokyo-border rounded-lg text-white placeholder:text-tokyo-text-muted focus:outline-none focus:border-tokyo-accent-purple transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-tokyo-text-secondary mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Your message..."
                  className="w-full px-4 py-3 bg-tokyo-bg border border-tokyo-border rounded-lg text-white placeholder:text-tokyo-text-muted focus:outline-none focus:border-tokyo-accent-purple transition-colors resize-none"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-primary text-white hover:opacity-90 py-6"
              >
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
