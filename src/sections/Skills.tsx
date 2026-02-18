import { useEffect, useRef, useState } from 'react';
import {
  Network,
  Shield,
  Server,
  Brain,
  Wrench,
  Award,
} from 'lucide-react';

interface SkillCardProps {
  icon: React.ReactNode;
  title: string;
  skills: string[];
  color: string;
  delay: number;
  isVisible: boolean;
}

function SkillCard({ icon, title, skills, color, delay, isVisible }: SkillCardProps) {
  const colorClasses: Record<string, string> = {
    purple: 'hover:border-tokyo-accent-purple/50 group-hover:shadow-glow',
    pink: 'hover:border-tokyo-accent-pink/50 group-hover:shadow-glow-pink',
    cyan: 'hover:border-tokyo-accent-cyan/50 group-hover:shadow-glow-cyan',
    blue: 'hover:border-tokyo-accent-blue/50',
  };

  const iconColors: Record<string, string> = {
    purple: 'text-tokyo-accent-purple bg-tokyo-accent-purple/10',
    pink: 'text-tokyo-accent-pink bg-tokyo-accent-pink/10',
    cyan: 'text-tokyo-accent-cyan bg-tokyo-accent-cyan/10',
    blue: 'text-tokyo-accent-blue bg-tokyo-accent-blue/10',
  };

  return (
    <div
      className={`group p-6 bg-tokyo-bg-secondary rounded-xl border border-tokyo-border transition-all duration-300 hover:-translate-y-1 ${colorClasses[color]} ${
        isVisible ? 'animate-fade-up' : 'opacity-0'
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`w-12 h-12 rounded-lg ${iconColors[color]} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}>
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <ul className="space-y-2">
        {skills.map((skill) => (
          <li
            key={skill}
            className="text-sm text-tokyo-text-secondary flex items-center gap-2"
          >
            <span className={`w-1.5 h-1.5 rounded-full ${color === 'purple' ? 'bg-tokyo-accent-purple' : color === 'pink' ? 'bg-tokyo-accent-pink' : color === 'cyan' ? 'bg-tokyo-accent-cyan' : 'bg-tokyo-accent-blue'}`} />
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Skills() {
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

  const skillCategories = [
    {
      icon: <Network className="w-6 h-6" />,
      title: 'Network Security',
      skills: [
        'CCNA (Routing & Switching)',
        'Enterprise Networking',
        'Network Automation',
        'Wireless Security',
      ],
      color: 'purple',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Security Operations',
      skills: [
        'SOC Operations',
        'Threat Detection',
        'Incident Response',
        'Security Monitoring',
      ],
      color: 'pink',
    },
    {
      icon: <Server className="w-6 h-6" />,
      title: 'System Security',
      skills: [
        'System Hardening',
        'Linux/Windows Security',
        'Vulnerability Assessment',
        'Access Control',
      ],
      color: 'cyan',
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: 'Machine Learning',
      skills: [
        'GPS Spoofing Detection',
        'Anomaly Detection',
        'Security Analytics',
        'ML Model Development',
      ],
      color: 'purple',
    },
    {
      icon: <Wrench className="w-6 h-6" />,
      title: 'Tools & Technologies',
      skills: [
        'Wireshark',
        'SIEM Tools',
        'Security Frameworks',
        'Packet Analysis',
      ],
      color: 'pink',
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Certifications',
      skills: [
        'Google IT Support',
        'Cisco CyberOps Associate',
        'CCNA Complete Track',
        'IT Fundamentals',
      ],
      color: 'cyan',
    },
  ];

  return (
    <section
      id="skills"
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
            <Wrench className="w-5 h-5 text-tokyo-accent-cyan" />
            <span className="text-tokyo-accent-cyan font-mono text-sm">
              Technical Skills
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My <span className="text-gradient">Expertise</span>
          </h2>
          <p className="text-tokyo-text-secondary max-w-2xl mx-auto">
            A comprehensive set of skills developed through academic study,
            certifications, and hands-on experience in cybersecurity.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <SkillCard
              key={category.title}
              {...category}
              delay={index * 100}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
