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
              <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-6 text-slate-900 bg-white font-sans text-sm leading-relaxed shadow-sm">
                {/* Header with Photo */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-4 border-b border-slate-200">
                  <div className="text-center sm:text-left flex-grow space-y-1.5">
                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-blue-700">
                      Bhumika Singh
                    </h1>
                    <p className="text-xs md:text-sm font-medium text-slate-700">
                      Mathura, Uttar Pradesh — <a href="tel:+919161312454" className="hover:underline font-semibold">+91 9161312454</a>
                    </p>
                    <p className="text-xs md:text-sm">
                      <a href="mailto:bhumika.singh3_cs24@gla.ac.in" className="text-blue-600 hover:underline font-medium">
                        bhumika.singh3_cs24@gla.ac.in
                      </a>
                    </p>
                    <div className="text-xs md:text-sm flex flex-col sm:flex-row flex-wrap gap-x-4 gap-y-1 pt-1 font-mono">
                      <div>
                        <span className="text-cyan-600 font-semibold">LinkedIn: </span>
                        <a href="https://www.linkedin.com/in/bhumika-code404" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                          linkedin.com/in/bhumika-code404
                        </a>
                      </div>
                      <div>
                        <span className="text-amber-600 font-semibold">GitHub: </span>
                        <a href="https://github.com/bhumikasingh0455" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                          github.com/bhumikasingh0455
                        </a>
                      </div>
                      <div>
                        <span className="text-amber-600 font-semibold">Portfolio: </span>
                        <a href="https://portfolio-mu-two-fuz1xq7bok.vercel.app/" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                          portfolio-mu-two-fuz1xq7bok.vercel.app
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Profile Portrait */}
                  <div className="flex-shrink-0">
                    <img
                      src="/portrait.jpg"
                      alt="Bhumika Singh"
                      className="w-24 h-32 md:w-28 md:h-36 object-cover object-top rounded-sm border-2 border-blue-400 shadow-md"
                    />
                  </div>
                </div>

                {/* EDUCATION */}
                <div>
                  <h2 className="text-sm font-extrabold tracking-wide text-blue-700 uppercase border-b-2 border-blue-700 pb-0.5 mb-2">
                    EDUCATION
                  </h2>
                  <div className="space-y-2 text-xs md:text-sm text-slate-800">
                    <div>
                      <div className="flex flex-wrap items-baseline justify-between font-bold">
                        <span className="text-slate-900">
                          Bachelor of Technology in Computer Science, GLA University, Mathura,
                        </span>
                        <span className="text-slate-700 font-semibold">August 2028</span>
                      </div>
                      <div className="text-slate-900 font-semibold">CPI: 7.19</div>
                    </div>

                    <div className="flex flex-wrap items-baseline justify-between">
                      <span className="font-semibold text-slate-900">
                        Intermediate (CBSE) Aditya Birla Intermediate College, Renukoot, Percentage: 72
                      </span>
                      <span className="text-slate-700 font-semibold">May 2024</span>
                    </div>

                    <div className="flex flex-wrap items-baseline justify-between">
                      <span className="font-semibold text-slate-900">
                        High School (CBSE) Aditya Birla Intermediate College, Renukoot, Percentage: 87.6
                      </span>
                      <span className="text-slate-700 font-semibold">May 2022</span>
                    </div>
                  </div>
                </div>

                {/* INTERNSHIP / TRAINING EXPERIENCE */}
                <div>
                  <h2 className="text-sm font-extrabold tracking-wide text-blue-700 uppercase border-b-2 border-blue-700 pb-0.5 mb-2">
                    INTERNSHIP / TRAINING EXPERIENCE
                  </h2>
                  <div className="space-y-2 text-xs md:text-sm text-slate-800">
                    <div className="flex flex-wrap items-baseline justify-between">
                      <span className="font-bold text-slate-900">
                        Full Stack Developer Intern | Hindalco Industries Ltd.
                      </span>
                      <span className="text-slate-700 font-semibold">Jun 2026 – Jul 2026</span>
                    </div>
                    <div>
                      <div className="flex flex-wrap items-baseline justify-between">
                        <span className="font-bold text-slate-900">NPTEL – Software Engineering</span>
                        <span className="text-slate-700 font-semibold">July-October 2025</span>
                      </div>
                      <p className="italic text-slate-700">
                        National Program on Technology Enhanced Learning (NPTEL) – Online
                      </p>
                    </div>
                  </div>
                </div>

                {/* PROJECTS */}
                <div>
                  <h2 className="text-sm font-extrabold tracking-wide text-blue-700 uppercase border-b-2 border-blue-700 pb-0.5 mb-2">
                    PROJECTS
                  </h2>
                  <div className="space-y-3 text-xs md:text-sm text-slate-800">
                    {/* PrepAI */}
                    <div>
                      <h3 className="font-bold text-slate-900 underline">PrepAI</h3>
                      <p className="text-slate-800">
                        AI-powered full-stack interview preparation platform that enables users to practice mock interviews, analyse ATS resume scores, track DSA progress, and receive AI-generated feedback through an interactive MERN-based dashboard.{' '}
                        <a
                          href="https://ai-interview-platform-three-liart.vercel.app"
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 hover:underline break-all"
                        >
                          (https://ai-interview-platform-three-liart.vercel.app)
                        </a>
                      </p>
                    </div>

                    {/* E-Commerce */}
                    <div>
                      <h3 className="font-bold text-slate-900 underline">E-Commerce</h3>
                      <p className="text-slate-800">
                        Full-stack online shopping platform that allows users to browse products, manage shopping carts, authenticate securely, and complete seamless purchases with a responsive and user-friendly interface.
                      </p>
                    </div>

                    {/* CampusConnect AI */}
                    <div>
                      <h3 className="font-bold text-slate-900 underline">CampusConnect AI</h3>
                      <p className="text-slate-800">
                        Full-stack MERN-based campus management platform that streamlines hostel operations and academic activities through role-based dashboards. Features include hostel room allocation, mess menu management, leave applications, complaint tracking, fee management, attendance, gate management, and real-time announcements using Socket.IO.{' '}
                        <a
                          href="https://campus-connect-ai-omega.vercel.app"
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 hover:underline break-all"
                        >
                          (https://campus-connect-ai-omega.vercel.app)
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                {/* SKILLS */}
                <div>
                  <h2 className="text-sm font-extrabold tracking-wide text-blue-700 uppercase border-b-2 border-blue-700 pb-0.5 mb-2">
                    SKILLS
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs md:text-sm">
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">Technical</h3>
                      <ul className="space-y-0.5 list-disc pl-5 text-slate-800">
                        <li>HTML, CSS, Java, Python</li>
                        <li>React</li>
                        <li>Mongo DB</li>
                        <li>Node.js, Express.js</li>
                        <li>JavaScript</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">Professional</h3>
                      <ul className="space-y-0.5 list-disc pl-5 text-slate-800">
                        <li>Effective Communication Skills</li>
                        <li>Team Work</li>
                        <li>Interpersonal Skills</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* PROFESSIONAL SKILLS */}
                <div>
                  <h2 className="text-sm font-extrabold tracking-wide text-blue-700 uppercase border-b-2 border-blue-700 pb-0.5 mb-2">
                    PROFESSIONAL SKILLS
                  </h2>
                  <ul className="space-y-0.5 list-disc pl-5 text-xs md:text-sm text-slate-800">
                    <li>Effective Communication</li>
                    <li>Teamwork and Collaboration</li>
                    <li>Problem Solving</li>
                    <li>Adaptability and Continuous Learning</li>
                  </ul>
                </div>

                {/* CO-CURRICULAR ACTIVITIES */}
                <div>
                  <h2 className="text-sm font-extrabold tracking-wide text-blue-700 uppercase border-b-2 border-blue-700 pb-0.5 mb-2">
                    CO-CURRICULAR ACTIVITIES
                  </h2>
                  <ul className="space-y-0.5 list-disc pl-5 text-xs md:text-sm text-slate-800">
                    <li>
                      <span className="font-bold">Art & Sketching</span> – passionate about creative expression and design.
                    </li>
                    <li>
                      <span className="font-bold">Learning New Languages</span> – enthusiastic about exploring diverse languages and cultures. managementskills
                    </li>
                  </ul>
                </div>

                {/* DECLARATION */}
                <div>
                  <h2 className="text-sm font-extrabold tracking-wide text-blue-700 uppercase border-b-2 border-blue-700 pb-0.5 mb-2">
                    DECLARATION
                  </h2>
                  <p className="text-xs md:text-sm text-slate-800 pt-1">
                    I hereby declare that all the above mentioned information is true and correct to the best of my knowledge.
                  </p>
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

