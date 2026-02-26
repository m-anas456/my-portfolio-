'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Github, Linkedin, Mail, ExternalLink, Download, ChevronDown, Briefcase, User } from 'lucide-react';
import { FaReact, FaPython, FaGit, FaHtml5, FaCss3, FaJsSquare } from 'react-icons/fa';
import { SiTailwindcss, SiStreamlit } from 'react-icons/si';

// Typing Animation Component
const TypingEffect = ({ texts, speed = 100 }) => {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];
    let timer;

    if (!isDeleting) {
      if (charIndex < currentText.length) {
        timer = setTimeout(() => {
          setDisplayText(currentText.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, speed);
      } else {
        timer = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (charIndex > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentText.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        }, speed / 2);
      } else {
        setIsDeleting(false);
        setTextIndex((textIndex + 1) % texts.length);
      }
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, textIndex, texts, speed]);

  return <span>{displayText}</span>;
};

// Reveal Animation Component
const RevealOnScroll = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
      }}
    >
      {children}
    </div>
  );
};

// Project Modal Component
const ProjectModal = ({ project, isOpen, onClose }) => {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      <div className="relative bg-black border border-blue-500/50 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl shadow-blue-500/50">
        <div className="sticky top-0 flex justify-between items-center p-4 sm:p-6 bg-black/50 border-b border-blue-500/30 z-10">
          <h3 className="text-xl sm:text-2xl font-bold text-blue-400 truncate">{project.title}</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-blue-500/20 rounded-lg transition-colors flex-shrink-0 ml-2"
          >
            <X size={24} className="text-cyan-400" />
          </button>
        </div>

        <div className="p-4 sm:p-8">
          <img
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            className="w-full h-48 sm:h-64 object-cover rounded-lg mb-6 border border-blue-500/30"
          />

          <p className="text-gray-300 mb-6 leading-relaxed text-base sm:text-lg">{project.description}</p>

          <div className="mb-6">
            <h4 className="text-blue-400 font-semibold mb-3 text-sm sm:text-base">Technologies Used:</h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 sm:px-4 sm:py-2 bg-blue-500/20 text-blue-300 rounded-full text-xs sm:text-sm border border-blue-500/40"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-cyan-400 font-semibold mb-3 text-sm sm:text-base">Project Links:</h4>
            {project.repo !== '#' && (
              <div className="mb-4 p-4 bg-blue-500/10 rounded-lg border border-blue-500/30 hover:border-blue-400 transition-colors">
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-400 hover:text-cyan-400 transition-colors font-semibold text-sm sm:text-base"
                >
                  <Github size={20} />
                  View on GitHub
                  <ExternalLink size={16} />
                </a>
              </div>
            )}
            {project.demo !== '#' && (
              <div className="p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/30 hover:border-cyan-400 transition-colors">
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-cyan-400 hover:text-blue-400 transition-colors font-semibold text-sm sm:text-base"
                >
                  <ExternalLink size={20} />
                  View Live Demo
                  <ExternalLink size={16} />
                </a>
              </div>
            )}
          </div>

          <div className="p-4 bg-blue-500/5 rounded-lg border border-blue-500/20 text-gray-300 text-sm">
            <p className="font-semibold text-blue-400 mb-2">Project Year:</p>
            <p>{project.year}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProject, setSelectedProject] = useState(null);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'skills', 'projects', 'education', 'contact'];
      const scrollPosition = window.scrollY + 150;

      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '\Muhammad-Anas-Resume.pdf';
    link.download = 'Muhammad-Anas-Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const typingTexts = [
    'Full Stack Developer',
    'React.js Specialist',
    'NED Undergrad',
    'Problem Solver',
    'Team Manager',
    'UI UX Enthusiast',
  ];

  const skills = [
    { name: 'React', icon: FaReact, color: 'from-blue-400 to-blue-600' },
    { name: 'JavaScript', icon: FaJsSquare, color: 'from-yellow-400 to-yellow-600' },
    { name: 'Python', icon: FaPython, color: 'from-blue-500 to-blue-700' },
    { name: 'Tailwind', icon: SiTailwindcss, color: 'from-cyan-400 to-cyan-600' },
    { name: 'HTML5', icon: FaHtml5, color: 'from-orange-400 to-orange-600' },
    { name: 'CSS3', icon: FaCss3, color: 'from-blue-400 to-blue-600' },
    { name: 'Git', icon: FaGit, color: 'from-orange-500 to-orange-700' }
  ];

  const experience = [
    {
      role: 'Full Stack Developer',
      company: 'ITVE Platform',
      duration: '2024 – 2025',
      description: 'Developed modern, user-focused frontend for ITVE platform with React and Tailwind CSS. Built responsive homepage and optimized performance.',
      technologies: ['React', 'Tailwind', 'JavaScript']
    },
    {
      role: 'Fyp Plate Detection Manger',
      company: 'FYP - Real-time Vehicle Anomaly Detection',
      duration: '2025 – 2026',
      description: 'Led computer vision logic for Final Year Project using YOLO and OpenCV to flag real-time traffic anomalies with Python and Streamlit.',
      technologies: ['Python', 'OpenCV', 'YOLO', 'Streamlit']
    },
    {
      role: 'Frontend Developer',
      company: 'BK Digital Games Store',
      duration: '2026',
      description: 'Built React-based e-commerce platform for digital games with cart functionality and fully responsive UI.',
      technologies: ['React', 'JavaScript', 'CSS']
    }
  ];

  const projects = [
    {
      id: 1,
      title: 'Real-Time Vehicle Anomaly Detection',
      description: 'Led computer vision logic for Final Year Project using YOLO, OpenCV, Python, and Streamlit to flag real-time traffic anomalies. Integrated deep learning models for vehicle detection and anomaly classification.',
      tech: ['Python', 'OpenCV', 'YOLO', 'Streamlit', 'Deep Learning'],
      year: '2025–2026',
      image: 'fyp.png',
      demo: '#',
      repo: 'https://github.com/shehzadres/Real_Time_Vehicle_Anomaly_Detection_System?tab=readme-ov-file#real_time_vehicle_anomaly_detection_system'
    },
    {
      id: 2,
      title: 'ITVE Frontend Platform',
      description: 'Developed modern, user-focused frontend for ITVE platform. Built full responsive homepage with React and Tailwind CSS with advanced filtering and search functionality.',
      tech: ['React', 'Tailwind', 'JavaScript', 'Responsive Design'],
      year: '2024–2025',
      image: '/itve.png',
      demo: 'https://itve-intern-by-muhammadanas.netlify.app/',
      repo: 'https://github.com/m-anas456'
    },
    {
      id: 3,
      title: 'BK Digital Games Store',
      description: 'React-based e-commerce platform for digital games with cart functionality and responsive UI. Implemented payment gateway integration and user authentication.',
      tech: ['React', 'JavaScript', 'CSS', 'Payment Gateway'],
      year: '2026',
      image: 'bk.png',
      demo: 'https://bk-games-store.netlify.app/',
      repo: 'https://github.com/m-anas456'
    },
    {
      id: 4,
      title: 'Solar Energy Business Website',
      description: 'Built for local solar company with modern design, mobile responsiveness, and SEO optimization. Included service showcase, contact forms, and testimonials section.',
      tech: ['HTML', 'CSS', 'WordPress', 'SEO'],
      year: '2024',
      image: 'solar.png',
    },
    {
      id: 5,
      title: 'Sign Language Recognizer',
      description: 'Computer vision application to recognize sign language gestures in real time using ML and image processing. Achieved 95% accuracy on custom dataset.',
      tech: ['Python', 'OpenCV', 'Machine Learning', 'TensorFlow'],
      year: '2024–2025',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
      demo: '#',
      repo: 'https://github.com/m-anas456/Sign-Language-Recognizer'
    },
    {
      id: 6,
      title: 'Internet Movie Database',
      description: 'Movie database application with real-time data from external APIs and advanced filtering options. Features include watchlist, ratings, and recommendations.',
      tech: ['React', 'JavaScript', 'API Integration', 'Redux'],
      year: '2025',
      image: 'movie.png',
    
      repo: 'https://github.com/m-anas456'
    },
    {
      id: 7,
      title: 'Asyc Services Platform ',
      description: 'Movie database application with real-time data from external APIs and advanced filtering options. Features include watchlist, ratings, and recommendations.',
      tech: ['React', 'JavaScript', 'API Integration', 'Redux'],
      year: '2025',
      image: 'ayasc.png',
      demo:'https://ayasc-platform.netlify.app/',
      repo: 'https://github.com/m-anas456'
    }
  ];

  const education = [
    {
      institution: 'NED University of Engineering & Technology',
      degree: 'BS Computer Science & IT',
      duration: '2022 – 2026',
      cgpa: '3.3',
      type: 'College'
    },
    {
      institution: 'Commecs College',
      degree: 'Intermediate / FSc',
      duration: '2020 – 2022',
      percent: '87%',
      type: 'School'
    }
  ];

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Experience', id: 'experience' },
    { label: 'Projects', id: 'projects' },
    { label: 'Contact', id: 'contact' }
  ];

  return (
    <div className="relative bg-black text-white min-h-screen overflow-x-hidden">
      <style>{`
        html {
          scroll-behavior: smooth;
        }
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          animation: gradientShift 8s ease infinite;
        }
      `}</style>

      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/50 via-black to-cyan-950/50" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      {/* Content Wrapper */}
      <div className="relative z-10">
        {/* Navigation - STICKY */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-lg border-b border-blue-500/20 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-14 sm:h-16">
              <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
                MA
              </div>

              <div className="hidden md:flex gap-2 lg:gap-8">
                {navItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`px-3 lg:px-4 py-2 rounded-lg transition-all duration-300 text-xs lg:text-sm font-medium ${
                      activeSection === item.id
                        ? 'bg-blue-500/30 text-blue-300 border border-blue-500/50'
                        : 'text-gray-300 hover:text-blue-400 hover:bg-blue-500/10'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

            {isMenuOpen && (
              <div className="md:hidden pb-4 border-t border-blue-500/20 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex flex-col gap-2 mt-4">
                  {navItems.map(item => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-all text-sm font-medium ${
                        activeSection === item.id
                          ? 'bg-blue-500/30 text-blue-300'
                          : 'text-gray-300 hover:bg-blue-500/10'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 mt-14 sm:mt-16">
          <div className="max-w-4xl mx-auto text-center">
            <RevealOnScroll delay={0}>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Muhammad Anas
                </span>
              </h1>
            </RevealOnScroll>

            <RevealOnScroll delay={100}>
              <div className="h-12 sm:h-16 mb-8">
                <p className="text-xl sm:text-2xl lg:text-3xl font-semibold text-cyan-400">
                  <TypingEffect texts={typingTexts} speed={80} />
                  <span className="animate-pulse">|</span>
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={200}>
              <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
                Crafting modern web experiences with React, building intelligent computer vision solutions, and bringing ideas to life with clean, performant code.
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={300}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <button
                  onClick={() => scrollToSection('projects')}
                  className="px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg font-semibold hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-110 text-sm sm:text-base"
                >
                  View My Work
                </button>
                <button
                  onClick={handleDownloadCV}
                  className="px-6 sm:px-8 py-2 sm:py-3 border-2 border-blue-500 text-blue-400 rounded-lg font-semibold hover:bg-blue-500/10 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <Download size={20} />
                  Download CV
                </button>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={400}>
              <div className="flex gap-4 sm:gap-6 justify-center">
                <a
                  href="https://github.com/m-anas456"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 sm:p-3 bg-blue-500/10 hover:bg-blue-500/30 rounded-lg transition-all duration-300 hover:scale-125 border border-blue-500/30 hover:border-blue-500/60"
                >
                  <Github size={20} className="sm:w-6 sm:h-6" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 sm:p-3 bg-blue-500/10 hover:bg-blue-500/30 rounded-lg transition-all duration-300 hover:scale-125 border border-blue-500/30 hover:border-blue-500/60"
                >
                  <Linkedin size={20} className="sm:w-6 sm:h-6" />
                </a>
                <a
                  href="mailto:muhanas420786@gmail.com"
                  className="p-2 sm:p-3 bg-blue-500/10 hover:bg-blue-500/30 rounded-lg transition-all duration-300 hover:scale-125 border border-blue-500/30 hover:border-blue-500/60"
                >
                  <Mail size={20} className="sm:w-6 sm:h-6" />
                </a>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={500}>
              <div className="mt-12 animate-bounce">
                <ChevronDown size={32} className="mx-auto text-cyan-400" />
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <RevealOnScroll>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                About Me
              </h2>
            </RevealOnScroll>

            <div className="grid md:grid-cols-2 gap-8">
              <RevealOnScroll delay={100}>
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-6 sm:p-8 hover:border-blue-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
                  <User className="text-blue-400 mb-4" size={32} />
                  <h3 className="text-xl sm:text-2xl font-bold text-blue-400 mb-4">Who I Am</h3>
                  <p className="text-gray-300 leading-relaxed">
                    I'm a passionate Full Stack Developer currently studying Computer Science at NED University. With expertise in React, Python, and modern web technologies, I build scalable solutions that solve real-world problems.
                  </p>
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={200}>
                <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-2xl p-6 sm:p-8 hover:border-cyan-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20">
                  <Briefcase className="text-cyan-400 mb-4" size={32} />
                  <h3 className="text-xl sm:text-2xl font-bold text-cyan-400 mb-4">What I Do</h3>
                  <p className="text-gray-300 leading-relaxed">
                    I develop full-stack web applications, and optimize applications for performance. From responsive UI design to backend architecture, I deliver complete digital experiences.
                  </p>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <RevealOnScroll>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Experience
              </h2>
            </RevealOnScroll>

            <div className="space-y-8">
              {experience.map((exp, index) => (
                <RevealOnScroll key={index} delay={index * 100}>
                  <div className="bg-blue-500/5 border border-blue-500/30 rounded-2xl p-6 sm:p-8 hover:border-blue-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:bg-blue-500/10">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-blue-400 mb-2">{exp.role}</h3>
                        <p className="text-cyan-400 font-semibold text-sm sm:text-base">{exp.company}</p>
                      </div>
                      <span className="text-gray-400 text-sm sm:text-base mt-2 sm:mt-0">{exp.duration}</span>
                    </div>
                    <p className="text-gray-300 mb-4 leading-relaxed">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, i) => (
                        <span key={i} className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs sm:text-sm border border-blue-500/40">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <RevealOnScroll>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Technologies
              </h2>
            </RevealOnScroll>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {skills.map((skill, index) => {
                const IconComponent = skill.icon;
                return (
                  <RevealOnScroll key={index} delay={index * 50}>
                    <div className="group bg-blue-500/10 border border-blue-500/30 rounded-2xl p-4 sm:p-6 hover:border-blue-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:bg-blue-500/20 cursor-pointer">
                      <div className="flex flex-col items-center">
                        <div className="mb-3 sm:mb-4 transform group-hover:scale-125 transition-transform duration-300">
                          <IconComponent className="text-blue-400 brightness-150" size={32} />
                        </div>
                        <p className="text-sm sm:text-base font-semibold text-gray-300 group-hover:text-blue-300 transition-colors text-center">
                          {skill.name}
                        </p>
                      </div>
                    </div>
                  </RevealOnScroll>
                );
              })}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <RevealOnScroll>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Projects
              </h2>
            </RevealOnScroll>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {projects.map((project, index) => (
                <RevealOnScroll key={project.id} delay={index * 100}>
                  <div
                    onClick={() => setSelectedProject(project)}
                    className="bg-blue-500/10 border border-blue-500/30 rounded-2xl overflow-hidden hover:border-blue-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 cursor-pointer hover:scale-105 group"
                  >
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-48 sm:h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="p-4 sm:p-6">
                      <h3 className="text-lg sm:text-xl font-bold text-blue-400 mb-2 line-clamp-2">{project.title}</h3>
                      <p className="text-gray-300 text-sm sm:text-base mb-4 line-clamp-2">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.slice(0, 3).map((tech, i) => (
                          <span key={i} className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs border border-blue-500/40">
                            {tech}
                          </span>
                        ))}
                        {project.tech.length > 3 && (
                          <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs border border-blue-500/40">
                            +{project.tech.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>

          <ProjectModal
            project={selectedProject}
            isOpen={!!selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        </section>

        {/* Education Section */}
        <section id="education" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <RevealOnScroll>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Education
              </h2>
            </RevealOnScroll>

            <div className="space-y-8">
              {education.map((edu, index) => (
                <RevealOnScroll key={index} delay={index * 100}>
                  <div className="bg-cyan-500/5 border border-cyan-500/30 rounded-2xl p-6 sm:p-8 hover:border-cyan-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 hover:bg-cyan-500/10">
                    <h3 className="text-xl sm:text-2xl font-bold text-cyan-400 mb-2">{edu.institution}</h3>
                    <p className="text-blue-400 font-semibold text-sm sm:text-base mb-2">{edu.degree}</p>
                    <div className="flex flex-col sm:flex-row sm:justify-between text-gray-400 text-sm">
                      <span>{edu.duration}</span>
                      {edu.cgpa && <span>CGPA: {edu.cgpa}</span>}
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <RevealOnScroll>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Get In Touch
              </h2>
            </RevealOnScroll>

            <RevealOnScroll delay={100}>
              <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                <a
                  href="https://github.com/m-anas456"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-6 sm:p-8 hover:border-blue-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:bg-blue-500/20 group"
                >
                  <Github className="text-blue-400 mb-4 group-hover:scale-125 transition-transform" size={32} />
                  <h3 className="text-lg sm:text-xl font-bold text-blue-400 mb-2">GitHub</h3>
                  <p className="text-gray-300 text-sm sm:text-base">Check out my projects and contributions</p>
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-6 sm:p-8 hover:border-blue-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:bg-blue-500/20 group"
                >
                  <Linkedin className="text-blue-400 mb-4 group-hover:scale-125 transition-transform" size={32} />
                  <h3 className="text-lg sm:text-xl font-bold text-blue-400 mb-2">LinkedIn</h3>
                  <p className="text-gray-300 text-sm sm:text-base">Connect with me professionally</p>
                </a>

                <a
                  href="mailto:muhanas420786@gmail.com"
                  className="bg-cyan-500/10 border border-cyan-500/30 rounded-2xl p-6 sm:p-8 hover:border-cyan-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 hover:bg-cyan-500/20 group md:col-span-2"
                >
                  <Mail className="text-cyan-400 mb-4 group-hover:scale-125 transition-transform" size={32} />
                  <h3 className="text-lg sm:text-xl font-bold text-cyan-400 mb-2">Email</h3>
                  <p className="text-gray-300 text-sm sm:text-base">muhanas420786@gmail.com</p>
                </a>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-blue-500/20 bg-black/50">
          <div className="max-w-6xl mx-auto text-center text-gray-400 text-sm">
            <p>© 2024 Muhammad Anas. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Portfolio;
