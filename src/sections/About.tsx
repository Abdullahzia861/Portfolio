import { useEffect, useRef, useState } from 'react';
import { Shield, Target, Lock, Cpu } from 'lucide-react';

interface StatProps {
  value: string;
  label: string;
  suffix?: string;
  delay: number;
}

function AnimatedStat({ value, label, suffix = '', delay }: StatProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const numericValue = parseFloat(value);
  const isDecimal = value.includes('.');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const increment = numericValue / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        setCount(numericValue);
        clearInterval(timer);
      } else {
        setCount(isDecimal ? parseFloat(current.toFixed(2)) : Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, numericValue, isDecimal]);

  return (
    <div
      ref={ref}
      className={`text-center p-6 bg-tokyo-bg-secondary rounded-xl border border-tokyo-border hover:border-tokyo-accent-purple/50 transition-all duration-300 hover:-translate-y-1 ${
        isVisible ? 'animate-fade-up' : 'opacity-0'
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
        {isDecimal ? count.toFixed(2) : count}
        {suffix}
      </div>
      <div className="text-sm text-tokyo-text-secondary">{label}</div>
    </div>
  );
}

export default function About() {
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

  const stats = [
    { value: '3.42', label: 'CGPA', suffix: '' },
    { value: '4', label: 'Years of Study', suffix: '+' },
    { value: '3', label: 'CCNA Certs', suffix: '' },
    { value: '1', label: 'SOC Internship', suffix: '' },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 md:py-32 bg-tokyo-bg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-tokyo-accent-purple" />
              <span className="text-tokyo-accent-purple font-mono text-sm">
                About Me
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Cyber Security Student &{' '}
              <span className="text-gradient">SOC Analyst</span>
            </h2>

            <div className="space-y-4 text-tokyo-text-secondary leading-relaxed">
              <p>
                I'm a Cyber Security student at Dawood University of Engineering & Technology
                with a strong passion for defensive security and SOC operations. My journey in
                cybersecurity has equipped me with foundational knowledge in network security,
                threat detection, and system hardening.
              </p>
              <p>
                Through hands-on experience with security tools and lab environments, I've
                developed analytical and problem-solving skills essential for protecting digital
                infrastructures. I'm continuously learning and growing in this ever-evolving field.
              </p>
              <p>
                My final year project focuses on mitigating GPS spoofing attacks using machine
                learning, combining my interests in security and AI to solve real-world challenges.
              </p>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-tokyo-accent-purple/10 rounded-lg">
                  <Target className="w-5 h-5 text-tokyo-accent-purple" />
                </div>
                <div>
                  <div className="text-sm font-medium">Focus</div>
                  <div className="text-xs text-tokyo-text-muted">Defensive Security</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-tokyo-accent-pink/10 rounded-lg">
                  <Lock className="w-5 h-5 text-tokyo-accent-pink" />
                </div>
                <div>
                  <div className="text-sm font-medium">Specialty</div>
                  <div className="text-xs text-tokyo-text-muted">SOC Operations</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-tokyo-accent-cyan/10 rounded-lg">
                  <Cpu className="w-5 h-5 text-tokyo-accent-cyan" />
                </div>
                <div>
                  <div className="text-sm font-medium">Research</div>
                  <div className="text-xs text-tokyo-text-muted">ML in Security</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Stats */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <AnimatedStat
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                  suffix={stat.suffix}
                  delay={index * 100}
                />
              ))}
            </div>

            {/* Decorative Element */}
            <div className="mt-8 p-6 bg-gradient-to-br from-tokyo-accent-purple/10 to-tokyo-accent-pink/10 rounded-xl border border-tokyo-border">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-tokyo-accent-purple/20 rounded-lg">
                  <Shield className="w-6 h-6 text-tokyo-accent-purple" />
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Mission</h4>
                  <p className="text-sm text-tokyo-text-secondary">
                    To contribute to a safer digital world by leveraging my skills in
                    cybersecurity, continuously learning, and staying ahead of emerging threats.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
