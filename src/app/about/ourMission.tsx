import React from "react";

const MissionSection = () => {
  const stats = [
    {
      label: "Match Accuracy",
      value: "95%",
      textColor: "text-[#0891b2] dark:text-[#22d3ee]",
      bgColor: "bg-[#ecfeff] dark:bg-[#0891b2]/10",
      borderColor: "border-[#cffafe] dark:border-[#0891b2]/20",
    },
    {
      label: "Placements",
      value: "50K+",
      textColor: "text-[#059669] dark:text-[#34d399]",
      bgColor: "bg-[#ecfdf5] dark:bg-[#059669]/10",
      borderColor: "border-[#d1fae5] dark:border-[#059669]/20",
    },
    {
      label: "Companies",
      value: "500+",
      textColor: "text-[#d97706] dark:text-[#fbbf24]",
      bgColor: "bg-[#fffbeb] dark:bg-[#d97706]/10",
      borderColor: "border-[#fef3c7] dark:border-[#d97706]/20",
    },
    {
      label: "User Rating",
      value: "4.8★",
      textColor: "text-[#1e293b] dark:text-[#f8fafc]",
      bgColor: "bg-[#f1f5f9] dark:bg-[#1e293b]/50",
      borderColor: "border-[#e2e8f0] dark:border-[#475569]/30",
    },
  ];

  return (
    <section className="bg-white dark:bg-[#0B0F19] py-20 px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* Left Side: Content (Exact Width Control) */}
        <div className="w-full lg:w-1/2 space-y-8">
          <h2 className="text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
            Our Mission
          </h2>
          <div className="space-y-6 text-slate-600 dark:text-slate-400 leading-relaxed text-lg max-w-xl">
            <p>
              We believe that finding the right job shouldn't be a matter of luck. 
              Our AI-powered platform analyzes skills, experience, preferences, 
              and company culture to create meaningful connections.
            </p>
            <p>
              By leveraging advanced machine learning algorithms, we reduce search 
              time while increasing match quality, helping people find careers 
              where they can truly thrive.
            </p>
          </div>
        </div>

        {/* Right Side: Stats Grid (Exact 2x2 Image Style) */}
        <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`p-10 rounded-2xl border ${stat.bgColor} ${stat.borderColor} 
              flex flex-col items-center justify-center text-center 
              transition-all duration-300 hover:scale-[1.02]`}
            >
              <span className={`text-5xl font-bold mb-2 tracking-tighter ${stat.textColor}`}>
                {stat.value}
              </span>
              <span className="text-slate-500 dark:text-slate-400 font-medium text-base uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default MissionSection;
