// app/components/Footer.tsx
"use client";

import { Github, Linkedin, Mail, Briefcase } from "lucide-react"; 

export default function Footer() {
  return (
    <footer className=" transition-colors duration-300 bg-gray-900 text-gray-900 dark:bg-[#0B0F19] dark:text-slate-300">
      {/* Top Row */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Column 1: Logo & About */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="text-white dark:text-cyan-400">
               <Briefcase className="w-6 h-6" />
            </div>
            <span className="text-white dark:text-white font-bold text-xl">JobAI</span>
          </div>
          <p className="text-sm text-slate-100 dark:text-slate-400">
            AI-powered job recommendations for the modern workforce. Find your perfect career match.
          </p>
        </div>

        {/* Column 2: Platform */}
        <div>
          <h4 className="text-white dark:text-white font-semibold mb-3">Platform</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline text-slate-100 dark:hover:text-cyan-400 transition-all">Browse Jobs</a></li>
            <li><a href="#" className="hover:underline text-slate-100 dark:hover:text-cyan-400 transition-all">Companies</a></li>
            <li><a href="#" className="hover:underline text-slate-100 dark:hover:text-cyan-400 transition-all">About Us</a></li>
          </ul>
        </div>

        {/* Column 3: Resources */}
        <div>
          <h4 className="text-white dark:text-white font-semibold mb-3">Resources</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline text-slate-100 dark:hover:text-cyan-400 transition-all">Career Guide</a></li>
            <li><a href="#" className="hover:underline text-slate-100 dark:hover:text-cyan-400 transition-all">Resume Tips</a></li>
            <li><a href="#" className="hover:underline text-slate-100 dark:hover:text-cyan-400 transition-all">Interview Prep</a></li>
          </ul>
        </div>

        {/* Column 4: Connect */}
        <div>
          <h4 className="text-white dark:text-white font-semibold mb-3">Connect</h4>
          <div className="flex gap-4">
            <a href="#" className="text-white hover:scale-110 dark:hover:text-cyan-400 transition-all">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="text-white hover:scale-110 dark:hover:text-cyan-400 transition-all">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="text-white hover:scale-110 dark:hover:text-cyan-400 transition-all">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/20 dark:border-gray-800"></div>

      

      {/* Bottom Row: Copyright & Legal */}
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-slate-100 dark:text-gray-400 border-t border-white/20 dark:border-gray-800">
        <span>© 2026 JobAI.</span>
        <div className="flex gap-4 mt-2 md:mt-0">
          <a href="#" className="hover:text-white transition-colors underline-offset-4 hover:underline">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors underline-offset-4 hover:underline">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}