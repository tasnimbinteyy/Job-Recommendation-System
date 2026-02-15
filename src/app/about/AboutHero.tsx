
export default function AboutHero() {
  return (
    <section
      className="
        relative min-h-screen flex items-center justify-center px-6 overflow-hidden bg-white text-black dark:bg-[#0B0F19] dark:text-white
      "
    >
      {/* Subtle Radial Glow (Dark Mode Only) */}
      <div
        className="
        absolute top-0 left-1/2 -translate-x-1/2 
        w-full h-[600px] 
        dark:bg-teal-500/5 
        blur-[120px] rounded-full pointer-events-none
      "
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Heading */}
        <h1 className="text-5xl font-extrabold mb-10">
          Revolutionizing Job Search <br />
          <span className="text-teal-500">with Artificial Intelligence</span>
        </h1>

        {/* Description */}
        <p
          className="
          text-gray-600 dark:text-gray-400
          text-lg md:text-xl
          leading-relaxed
          max-w-2xl mx-auto mb-16 font-medium
        "
        >
          JobAI is an AI-powered employment platform that connects talented
          professionals with their ideal career opportunities through
          intelligent matching algorithms.
        </p>
      </div>
    </section>
    
  );
}
