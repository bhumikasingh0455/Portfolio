import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, ExternalLink, FileText, Eye } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [viewMode, setViewMode] = useState<'preview' | 'pdf'>('preview');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 overflow-y-auto"
        data-lenis-prevent
        onWheel={(e) => e.stopPropagation()}
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          data-lenis-prevent
          className="relative w-full max-w-5xl h-[92vh] flex flex-col glass-panel rounded-3xl border border-white/15 p-4 md:p-6 z-10 shadow-2xl overflow-hidden bg-[#0A0A0A]/95"
        >
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold font-display text-white">
                  Bhumika Singh — Resume
                </h3>
                <p className="text-xs font-mono text-cyan-400">
                  Full Stack Developer
                </p>
              </div>
            </div>

            {/* View Mode Toggle & Action Buttons */}
            <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
              <div className="flex items-center p-1 rounded-xl bg-white/5 border border-white/10 text-xs font-mono">
                <button
                  onClick={() => setViewMode('preview')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                    viewMode === 'preview'
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Document View</span>
                </button>
                <button
                  onClick={() => setViewMode('pdf')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                    viewMode === 'pdf'
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>PDF Viewer</span>
                </button>
              </div>

              {/* Download PDF Button */}
              <a
                href={PERSONAL_INFO.resumeUrl}
                download="Bhumika_Singh_Resume.pdf"
                className="group flex items-center gap-2 px-3.5 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 hover:text-white border border-cyan-500/30 text-xs font-mono transition-all shadow-sm"
              >
                <Download className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
                <span className="hidden sm:inline">Download PDF</span>
              </a>

              {/* Open PDF in New Tab */}
              <a
                href={PERSONAL_INFO.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
                title="Open PDF in New Tab"
              >
                <ExternalLink className="w-4 h-4" />
              </a>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Modal Main Body Content */}
          <div className="relative w-full flex-grow mt-4 rounded-2xl overflow-y-auto border border-white/10 bg-white text-slate-900 shadow-inner">
            {viewMode === 'pdf' ? (
              <object
                data={`${PERSONAL_INFO.resumeUrl}#toolbar=0&navpanes=0`}
                type="application/pdf"
                className="w-full h-full min-h-[600px] border-none"
              >
                <iframe
                  src={`${PERSONAL_INFO.resumeUrl}#toolbar=0&navpanes=0`}
                  title="Bhumika Singh Resume PDF"
                  className="w-full h-full min-h-[600px] border-none"
                />
              </object>
            ) : (
              /* Exact Document View matching Bhumika Singh's Resume PDF */
              <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-6 text-slate-900 bg-white font-sans text-sm leading-relaxed">
                {/* Header */}
                <div className="text-center space-y-1 pb-2 border-b border-slate-200">
                  <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
                    Bhumika Singh
                  </h1>
                  <p className="text-xs md:text-sm font-medium text-blue-600 flex flex-wrap items-center justify-center gap-2">
                    <a href="tel:+919161312454" className="hover:underline">+91-9161312454</a>
                    <span>/</span>
                    <a href="mailto:bhumikasingh0407@gmail.com" className="hover:underline">bhumikasingh0407@gmail.com</a>
                    <span>/</span>
                    <a href="https://www.linkedin.com/in/bhumika-code404" target="_blank" rel="noreferrer" className="hover:underline">https://www.linkedin.com/in/bhumika-code404</a>
                    <span>/</span>
                    <a href="https://github.com/bhumikasingh0455" target="_blank" rel="noreferrer" className="hover:underline">github.com/bhumikasingh0455</a>
                  </p>
                </div>

                {/* PROJECTS */}
                <div>
                  <div className="flex items-center justify-between pb-1 mb-2 border-b border-slate-800">
                    <h2 className="text-xs md:text-sm font-bold tracking-wider text-slate-900 uppercase">
                      PROJECTS
                    </h2>
                    <span className="text-xs font-semibold text-slate-700 italic">2026 – Present</span>
                  </div>
                  <ul className="space-y-2.5 text-xs md:text-sm text-slate-800 list-disc pl-5">
                    <li>
                      <span className="font-bold text-slate-900">PrepAI</span> – AI-powered full-stack interview preparation platform featuring live speech mock interviews, automated ATS resume scoring, DSA tracking, and OpenAI feedback. (<a href="https://ai-interview-platform-three-liart.vercel.app" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Live Demo</a> | <a href="https://github.com/bhumikasingh0455/PrepAI" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">GitHub</a>)
                    </li>
                    <li>
                      <span className="font-bold text-slate-900">DevConnect</span> – Real-time developer social networking platform featuring developer profile showcases, code snippet sharing, interactive post feed, and JWT security. (<a href="https://github.com/bhumikasingh0455/Dev_Connect" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">GitHub</a>)
                    </li>
                    <li>
                      <span className="font-bold text-slate-900">ProShop E-Commerce</span> – Full-stack online shopping platform with cart persistence, product review & rating system, admin dashboard, and Stripe test payment gateway. (<a href="https://github.com/bhumikasingh0455/E-Commerce" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">GitHub</a>)
                    </li>
                    <li>
                      <span className="font-bold text-slate-900">Task Manager Pro</span> – Productivity-focused task management app featuring priority scheduling, real-time status filtering (All/Incomplete/Completed), and inline task editing. (<a href="https://github.com/bhumikasingh0455/Task_Manager" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">GitHub</a>)
                    </li>
                    <li>
                      <span className="font-bold text-slate-900">Java DS & Core Algorithms</span> – Core engineering repository containing Java implementations of linear & non-linear data structures, graph algorithms, sorting routines, and OOP design patterns. (<a href="https://github.com/bhumikasingh0455/fd_java_bhumika" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">GitHub</a>)
                    </li>
                  </ul>
                </div>

                {/* EXPERIENCE */}
                <div>
                  <div className="pb-1 mb-2 border-b border-slate-800">
                    <h2 className="text-xs md:text-sm font-bold tracking-wider text-slate-900 uppercase">
                      EXPERIENCE
                    </h2>
                  </div>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center justify-between text-xs md:text-sm">
                      <span className="font-bold text-slate-900">Full Stack Developer Intern at Hindalco Industries Ltd.</span>
                      <span className="italic text-slate-700 font-medium">Jun 2026 – Jul 2026</span>
                    </div>
                    <p className="text-xs md:text-sm text-slate-800 pt-1">
                      Completed a Full Stack Development internship focused on React.js and Node.js, gaining exposure to modern web development practices and collaborative software development.
                    </p>
                  </div>
                </div>

                {/* EDUCATION */}
                <div>
                  <div className="pb-1 mb-2 border-b border-slate-800">
                    <h2 className="text-xs md:text-sm font-bold tracking-wider text-slate-900 uppercase">
                      EDUCATION
                    </h2>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-xs md:text-sm">
                        <span className="font-bold text-slate-900">GLA University</span>
                        <span className="font-bold text-slate-900">Mathura, Uttar Pradesh</span>
                      </div>
                      <div className="flex items-center justify-between text-xs md:text-sm text-slate-700 italic">
                        <span>B.Tech. in Computer Science and Engineering</span>
                        <span>July 2024 – July 2028</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-xs md:text-sm">
                        <span className="font-bold text-slate-900">Aditya Birla Intermediate College</span>
                        <span className="font-bold text-slate-900">Renukoot, Uttar Pradesh</span>
                      </div>
                      <div className="flex items-center justify-between text-xs md:text-sm text-slate-700 italic">
                        <span>12<sup>th</sup> Standard (72%)</span>
                        <span>Mar 2024</span>
                      </div>
                      <div className="flex items-center justify-between text-xs md:text-sm text-slate-700 italic">
                        <span>10<sup>th</sup> Standard (87.66%)</span>
                        <span>Mar 2022</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* TECHNICAL SKILLS */}
                <div>
                  <div className="pb-1 mb-2 border-b border-slate-800">
                    <h2 className="text-xs md:text-sm font-bold tracking-wider text-slate-900 uppercase">
                      TECHNICAL SKILLS
                    </h2>
                  </div>
                  <ul className="space-y-1 text-xs md:text-sm text-slate-800 list-disc pl-5">
                    <li><span className="font-bold">Programming Languages:</span> Java, JavaScript</li>
                    <li><span className="font-bold">Web Technologies:</span> HTML, CSS, React.js, Node.js</li>
                    <li><span className="font-bold">Database & Backend:</span> MongoDB, Express.js</li>
                    <li><span className="font-bold">Tools & Platforms:</span> Git, VS Code, GitHub</li>
                    <li><span className="font-bold">Core Concepts:</span> Data Structures, Problem Solving</li>
                    <li><span className="font-bold">AI & Emerging Skills:</span> Prompt Engineering, AI Integration</li>
                  </ul>
                </div>

                {/* ACHIEVEMENTS */}
                <div>
                  <div className="pb-1 mb-2 border-b border-slate-800">
                    <h2 className="text-xs md:text-sm font-bold tracking-wider text-slate-900 uppercase">
                      ACHIEVEMENTS
                    </h2>
                  </div>
                  <ul className="space-y-1 text-xs md:text-sm text-slate-800 list-disc pl-5">
                    <li>Built multiple full-stack projects focused on solving real-world problems and improving user experience.</li>
                    <li>Actively exploring open-source contributions and collaborative development.</li>
                    <li>Consistently improving development skills through hands-on projects and practical implementation.</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ResumeModal;

