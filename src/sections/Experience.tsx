import { useEffect, useRef, useState } from 'react';
import { Briefcase, GraduationCap, Code, Calendar, Building2, School } from 'lucide-react';

interface TimelineItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  period: string;
  description: string;
  type: 'work' | 'education' | 'project';
  side: 'left' | 'right';
  delay: number;
  isVisible: boolean;
}

function TimelineItem({
  icon,
  title,
  subtitle,
  period,
  description,
  side,
  delay,
  isVisible,
}: TimelineItemProps) {
  return (
    <div
      className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group ${
        isVisible
          ? side === 'left'
            ? 'animate-slide-in-left'
            : 'animate-slide-in-right'
          : 'opacity-0'
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Timeline Point */}
      <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-tokyo-accent-purple border-4 border-tokyo-bg z-10 group-hover:scale-125 transition-transform duration-300" />

      {/* Content Card */}
      <div className={`w-[calc(50%-2rem)] ${side === 'left' ? 'mr-auto' : 'ml-auto'}`}>
        <div className="p-6 bg-tokyo-bg-secondary rounded-xl border border-tokyo-border hover:border-tokyo-accent-purple/50 transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-tokyo-accent-purple/10 rounded-lg">
              {icon}
            </div>
            <div>
              <h3 className="font-semibold text-lg">{title}</h3>
              <p className="text-sm text-tokyo-text-secondary">{subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-tokyo-accent-cyan mb-3">
            <Calendar className="w-4 h-4" />
            {period}
          </div>
          <p className="text-sm text-tokyo-text-secondary leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

function MobileTimelineItem({
  icon,
  title,
  subtitle,
  period,
  description,
  delay,
  isVisible,
}: Omit<TimelineItemProps, 'side'>) {
  return (
    <div
      className={`relative pl-8 border-l-2 border-tokyo-border ${
        isVisible ? 'animate-fade-up' : 'opacity-0'
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Timeline Point */}
      <div className="absolute left-0 top-0 -translate-x-[calc(50%+1px)] w-4 h-4 rounded-full bg-tokyo-accent-purple border-4 border-tokyo-bg" />

      {/* Content Card */}
      <div className="p-5 bg-tokyo-bg-secondary rounded-xl border border-tokyo-border hover:border-tokyo-accent-purple/50 transition-all duration-300">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-tokyo-accent-purple/10 rounded-lg">
            {icon}
          </div>
          <div>
            <h3 className="font-semibold">{title}</h3>
            <p className="text-sm text-tokyo-text-secondary">{subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-tokyo-accent-cyan mb-3">
          <Calendar className="w-4 h-4" />
          {period}
        </div>
        <p className="text-sm text-tokyo-text-secondary leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function Experience() {
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

  const timelineItems = [
    {
      icon: <Briefcase className="w-5 h-5 text-tokyo-accent-purple" />,
      title: 'Cyber Security Intern',
      subtitle: 'ITSOLERA (SOC)',
      period: 'January 2026 - April 2026',
      description:
        'Hands-on experience in Security Operations Center, including threat monitoring, incident response, and security analysis. Worked with SIEM tools and participated in real-world security operations.',
      type: 'work' as const,
    },
    {
      icon: <Code className="w-5 h-5 text-tokyo-accent-pink" />,
      title: 'Final Year Project',
      subtitle: 'GPS Spoofing Detection',
      period: '2025 - 2026',
      description:
        'Research project focusing on mitigating GPS spoofing attacks using machine learning. Developed ML models for detecting anomalous GPS signals and preventing location-based attacks.',
      type: 'project' as const,
    },
    {
      icon: <GraduationCap className="w-5 h-5 text-tokyo-accent-cyan" />,
      title: 'Bachelor in Cyber Security',
      subtitle: 'Dawood University of Engineering & Technology',
      period: '2022 - 2026',
      description:
        'Pursuing a comprehensive degree in Cyber Security with a CGPA of 3.42/4.00. Coursework includes network security, ethical hacking, cryptography, and security operations.',
      type: 'education' as const,
    },
  ];

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-20 md:py-32 bg-tokyo-bg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Building2 className="w-5 h-5 text-tokyo-accent-purple" />
            <span className="text-tokyo-accent-purple font-mono text-sm">
              Experience & Education
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My <span className="text-gradient">Journey</span>
          </h2>
          <p className="text-tokyo-text-secondary max-w-2xl mx-auto">
            A timeline of my professional experience, academic achievements, and key projects
            in the field of cybersecurity.
          </p>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden md:block relative">
          {/* Center Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-tokyo-accent-purple via-tokyo-accent-pink to-tokyo-accent-cyan -translate-x-1/2" />

          {/* Timeline Items */}
          <div className="space-y-12">
            {timelineItems.map((item, index) => (
              <TimelineItem
                key={item.title}
                {...item}
                side={index % 2 === 0 ? 'left' : 'right'}
                delay={index * 200}
                isVisible={isVisible}
              />
            ))}
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="md:hidden space-y-8">
          {timelineItems.map((item, index) => (
            <MobileTimelineItem
              key={item.title}
              {...item}
              delay={index * 200}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Education Details */}
        <div
          className={`mt-16 grid sm:grid-cols-2 gap-6 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          <div className="p-6 bg-tokyo-bg-secondary rounded-xl border border-tokyo-border">
            <div className="flex items-center gap-3 mb-4">
              <School className="w-5 h-5 text-tokyo-accent-cyan" />
              <h3 className="font-semibold">Pre-Engineering</h3>
            </div>
            <p className="text-sm text-tokyo-text-secondary mb-2">
              Govt. City College, Musa Colony Karachi
            </p>
            <p className="text-sm text-tokyo-accent-cyan">Grade: A / 76.18%</p>
          </div>

          <div className="p-6 bg-tokyo-bg-secondary rounded-xl border border-tokyo-border">
            <div className="flex items-center gap-3 mb-4">
              <School className="w-5 h-5 text-tokyo-accent-pink" />
              <h3 className="font-semibold">Matriculation (Science)</h3>
            </div>
            <p className="text-sm text-tokyo-text-secondary mb-2">
              PM Public Secondary School, Karachi
            </p>
            <p className="text-sm text-tokyo-accent-pink">Grade: B / 66.11%</p>
          </div>
        </div>
      </div>
    </section>
  );
}
