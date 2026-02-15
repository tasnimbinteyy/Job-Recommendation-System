import { Lightbulb, Users, ShieldCheck, Target } from "lucide-react";

export default function OurValues() {
  const values = [
    {
      title: "Innovation First",
      desc: "We push the boundaries of AI to create better job matching experiences.",
      icon: <Lightbulb className="text-teal-500" size={24} />,
    },
    {
      title: "People Focused",
      desc: "Every feature is designed with job seekers and employers in mind.",
      icon: <Users className="text-teal-500" size={24} />,
    },
    {
      title: "Privacy & Trust",
      desc: "Your data is secure and never shared without explicit consent.",
      icon: <ShieldCheck className="text-teal-500" size={24} />,
    },
    {
      title: "Accuracy Matters",
      desc: "We strive for the highest accuracy in our job recommendations.",
      icon: <Target className="text-teal-500" size={24} />,
    },
  ];

  return (
    <section className="py-24 px-6 bg-white dark:bg-[#0B0F19]">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-black dark:text-white mb-4">Our Values</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-16">
          These core principles guide everything we do
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <div
              key={i}
              className="bg-gray-100 dark:bg-[#111827] border border-gray-200 dark:border-gray-800 p-8 rounded-2xl text-left hover:border-teal-500/30 transition-colors"
            >
              <div className="w-12 h-12 bg-teal-500/10 rounded-xl flex items-center justify-center mb-6">
                {v.icon}
              </div>
              <h3 className="text-xl font-bold text-black dark:text-white mb-3">{v.title}</h3>
              <p className="text-gray-700 dark:text-gray-400 leading-relaxed text-sm">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
