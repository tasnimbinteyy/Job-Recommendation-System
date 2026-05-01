"use client";

import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { Github, Linkedin, Mail, Briefcase, Twitter, ExternalLink } from "lucide-react";
import Link from "next/link";

// --- Premium Components ---

function SocialIcon({ icon: Icon, href, external = true }: { icon: any; href: string; external?: boolean }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  function onMouseMove(e: React.MouseEvent) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - (rect.left + rect.width / 2));
    mouseY.set(e.clientY - (rect.top + rect.height / 2));
  }

  function onMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ x, y }}
      className="relative h-10 w-10 flex items-center justify-center rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:text-white hover:border-teal-500 hover:bg-teal-500 transition-colors duration-300 shadow-sm"
    >
      <Icon size={18} />
    </motion.a>
  );
}

function FooterLink({ children, href }: { children: string; href: string }) {
  return (
    <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
      <Link href={href} className="flex items-center group text-slate-600 dark:text-slate-400 hover:text-teal-500 dark:hover:text-teal-400 font-medium text-sm transition-colors">
        <span className="h-1 w-1 rounded-full bg-teal-500 scale-0 group-hover:scale-100 transition-transform mr-2" />
        {children}
      </Link>
    </motion.li>
  );
}

export default function Footer() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const background = useMotionTemplate`
    radial-gradient(
      350px circle at ${mouseX}px ${mouseY}px,
      rgba(20, 184, 166, 0.08),
      transparent 80%
    )
  `;

  return (
    <footer 
      onMouseMove={handleMouseMove}
      className="relative mt-10 border-t border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-[#020617] overflow-hidden transition-colors duration-500"
    >
      {/* Interactive Glow Background */}
      <motion.div className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:opacity-100" style={{ background }} />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand */}
          <div className="space-y-6">
            <motion.div className="flex items-center gap-3 group cursor-pointer w-fit" whileHover={{ scale: 1.02 }}>
              <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-gradient-to-br from-teal-400 to-teal-600 text-white shadow-xl shadow-teal-500/20">
                <Briefcase size={22} className="group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white">
                Job<span className="text-teal-500">AI</span>
              </span>
            </motion.div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium text-sm max-w-[280px]">
              Next-gen job matching powered by proprietary neural architectures and strategic AI insights.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Github, href: "https://github.com", external: true },
                { icon: Linkedin, href: "https://linkedin.com/in/tasnimbinteyy", external: true },
                { icon: Twitter, href: "https://twitter.com/tasnimbinteyy", external: true },
                { icon: Mail, href: "https://mail.google.com", external: true },
              ].map(({ icon, href, external }, i) => (
                <SocialIcon key={i} icon={icon} href={href} external={external} />
              ))}
            </div>
          </div>

          {/* Column 2 & 3: Links */}
          {[
            {
              title: "Platform",
              links: [
                { label: "Browse Jobs", href: "/browse" },
                { label: "Smart Companies", href: "/companies" },
                { label: "AI Matchmaking", href: "/how-it-works#cosine" },
                { label: "Salary Insights", href: "/browse" },
              ]
            },
            {
              title: "Resources",
              links: [
                { label: "Career Guide", href: "/how-it-works" },
                { label: "Resume Optimizer", href: "/profile" },
                { label: "How It Works", href: "/how-it-works" },
                { label: "About", href: "/about" },
              ]
            }
          ].map((section) => (
            <div key={section.title}>
              <h4 className="text-slate-900 dark:text-white font-bold mb-6 uppercase tracking-[0.3em] text-[10px] opacity-70">
                {section.title}
              </h4>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <FooterLink key={link.label} href={link.href}>{link.label}</FooterLink>
                ))}
              </ul>
            </div>
          ))}

          {/* Column 4: Newsletter Card */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="group relative p-8 rounded-[32px] bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 shadow-sm backdrop-blur-xl overflow-hidden"
          >
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-24 h-24 bg-teal-500/10 blur-[40px] rounded-full" />
            <h4 className="text-slate-900 dark:text-white font-bold mb-2 text-sm tracking-tight">Join the Elite</h4>
            <p className="text-slate-500 dark:text-slate-400 text-[11px] mb-6 leading-relaxed font-medium">
              Get high-affinity opportunities directly in your neural feed.
            </p>
            <div className="relative group/input">
              <input
                type="email"
                placeholder="Email address"
                className="w-full h-12 bg-slate-100 dark:bg-slate-900/50 border border-transparent focus:border-teal-500/30 rounded-2xl px-4 text-xs transition-all outline-none text-slate-900 dark:text-white font-medium"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="absolute right-1.5 top-1.5 h-9 w-9 bg-teal-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-teal-500/20 hover:bg-teal-600 transition-colors"
              >
                <ExternalLink size={14} />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[10px] text-slate-500 dark:text-slate-500 font-bold uppercase tracking-[0.2em]">
            © 2026 JobAI • Intelligence Defined.
          </div>

          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em]">
            {[
              { label: "Privacy", href: "/about" },
              { label: "Terms", href: "/about" },
              { label: "How It Works", href: "/how-it-works" },
            ].map(({ label, href }) => (
              <Link key={label} href={href} className="text-slate-500 hover:text-teal-500 transition-colors relative group">
                {label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-teal-500 transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}