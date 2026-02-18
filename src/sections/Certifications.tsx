import { useEffect, useRef, useState } from 'react';
import { Award, ExternalLink, CheckCircle } from 'lucide-react';

interface CertificationCardProps {
  title: string;
  issuer: string;
  date?: string;
  skills: string[];
  color: string;
  delay: number;
  isVisible: boolean;
}

function CertificationCard({
  title,
  issuer,
  skills,
  color,
  delay,
  isVisible,
}: CertificationCardProps) {
  const colorClasses: Record<string, string> = {
    purple: 'hover:border-tokyo-accent-purple/50 hover:shadow-glow',
    pink: 'hover:border-tokyo-accent-pink/50 hover:shadow-glow-pink',
    cyan: 'hover:border-tokyo-accent-cyan/50 hover:shadow-glow-cyan',
  };

  const badgeColors: Record<string, string> = {
    purple: 'bg-tokyo-accent-purple/10 text-tokyo-accent-purple',
    pink: 'bg-tokyo-accent-pink/10 text-tokyo-accent-pink',
    cyan: 'bg-tokyo-accent-cyan/10 text-tokyo-accent-cyan',
  };

  return (
    <div
      className={`group p-6 bg-tokyo-bg-secondary rounded-xl border border-tokyo-border transition-all duration-300 hover:-translate-y-1 ${colorClasses[color]} ${
        isVisible ? 'animate-fade-up' : 'opacity-0'
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${badgeColors[color]} transition-transform duration-300 group-hover:scale-110`}>
          <Award className="w-6 h-6" />
        </div>
        <button className="text-tokyo-text-muted hover:text-white transition-colors">
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>

      <h3 className="font-semibold text-lg mb-1 group-hover:text-gradient transition-all duration-300">
        {title}
      </h3>
      <p className="text-sm text-tokyo-text-secondary mb-4">{issuer}</p>

      <div className="space-y-2">
        {skills.map((skill) => (
          <div
            key={skill}
            className="flex items-center gap-2 text-sm text-tokyo-text-secondary"
          >
            <CheckCircle className={`w-4 h-4 ${color === 'purple' ? 'text-tokyo-accent-purple' : color === 'pink' ? 'text-tokyo-accent-pink' : 'text-tokyo-accent-cyan'}`} />
            {skill}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Certifications() {
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

  const certifications = [
    {
      title: 'Google IT Support Professional Certificate',
      issuer: 'Coursera',
      skills: [
        'Technical Support Fundamentals',
        'Computer Networking',
        'Operating Systems',
        'System Administration',
      ],
      color: 'purple',
    },
    {
      title: 'CCNA: Introduction to Networks',
      issuer: 'Cisco Networking Academy',
      skills: [
        'Network Fundamentals',
        'IP Addressing',
        'Ethernet Concepts',
        'Network Layer Protocols',
      ],
      color: 'cyan',
    },
    {
      title: 'CCNA: Switching, Routing & Wireless',
      issuer: 'Cisco Networking Academy',
      skills: [
        'VLAN Configuration',
        'Inter-VLAN Routing',
        'Static & Dynamic Routing',
        'Wireless LANs',
      ],
      color: 'pink',
    },
    {
      title: 'CCNA: Enterprise Networking & Security',
      issuer: 'Cisco Networking Academy',
      skills: [
        'OSPF Configuration',
        'Network Security',
        'WAN Technologies',
        'Network Automation',
      ],
      color: 'purple',
    },
    {
      title: 'Cisco CyberOps Associate',
      issuer: 'Cisco Networking Academy',
      skills: [
        'Security Concepts',
        'Network Security',
        'Endpoint Security',
        'Security Monitoring',
      ],
      color: 'cyan',
    },
  ];

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="py-20 md:py-32 bg-tokyo-bg-secondary"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Award className="w-5 h-5 text-tokyo-accent-pink" />
            <span className="text-tokyo-accent-pink font-mono text-sm">
              Certifications
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Professional <span className="text-gradient">Credentials</span>
          </h2>
          <p className="text-tokyo-text-secondary max-w-2xl mx-auto">
            Industry-recognized certifications that validate my skills and knowledge
            in cybersecurity and networking.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <CertificationCard
              key={cert.title}
              {...cert}
              delay={index * 100}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Stats Banner */}
        <div
          className={`mt-16 p-8 bg-gradient-to-r from-tokyo-accent-purple/10 via-tokyo-accent-pink/10 to-tokyo-accent-cyan/10 rounded-2xl border border-tokyo-border transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '500ms' }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-gradient mb-1">5+</div>
              <div className="text-sm text-tokyo-text-secondary">Certifications</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gradient-cyan mb-1">3</div>
              <div className="text-sm text-tokyo-text-secondary">CCNA Modules</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gradient mb-1">2</div>
              <div className="text-sm text-tokyo-text-secondary">Platforms</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gradient-cyan mb-1">100%</div>
              <div className="text-sm text-tokyo-text-secondary">Completion</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
