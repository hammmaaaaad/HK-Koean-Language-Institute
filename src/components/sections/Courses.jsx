import { motion } from "framer-motion";
import { FaClock, FaSignal, FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Courses = () => {
  const courses = [
    {
      title: "EPS-TOPIK Preparation",
      desc: "Comprehensive preparation for the EPS-TOPIK exam to secure your work visa.",
      duration: "3 Months",
      level: "Beginner to Advanced",
      fee: "PKR 25,000",
      features: [
        "Exam Focused Training",
        "Listening Reading Practice",
        "Mock Test Practice",
      ],
    },
    {
      title: "Basic Korean Language",
      desc: "Start your journey with Hangul, basic grammar, and sentence structures.",
      duration: "3 Months",
      level: "A1-A2",
      fee: "PKR 25,000",
      features: [
        "Learn Hangul Basics",
        "Build Korean Grammar",
        "Practice Daily Conversation",
      ],
    },
    {
      title: "Fast-Track Korean",
      desc: "Quick and effective Korean language learning for students in a hurry.",
      duration: "40 Days",
      level: "A1-A2",
      fee: "PKR 25,000",
      features: [
        "Rapid Korean Learning",
        "Essential Grammar Skills",
        "Practical Speaking Practice",
      ],
    },
    {
      title: "TOPIK Test Preparation",
      desc: "Specialized training for the official TOPIK test to achieve higher levels.",
      duration: "2 Months",
      level: "TOPIK 1 & 2",
      fee: "PKR 20,000",
      features: [
        "TOPIK Exam Strategies",
        "Reading Listening Practice",
        "Regular Mock Tests",
      ],
    },
    {
      title: "Spoken Korean",
      desc: "Focus purely on speaking and listening skills.",
      duration: "1.5 Months",
      level: "A2+",
      features: [
        "Pronunciation Correction",
        "Real-life Scenarios",
        "Accent Training",
      ],
    },
    {
      title: "Online Classes",
      desc: "Learn Korean from the comfort of your home.",
      duration: "Flexible",
      level: "All Levels",
      features: [
        "Live Interactive Sessions",
        "Recorded Lectures",
        "Global Access",
      ],
    },
  ];

  return (
    <section id="courses" className="py-24 bg-white dark:bg-charcoal">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-kred font-semibold uppercase tracking-wider">
            Our Programs
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4 text-navy dark:text-white">
            Explore Our Premium Courses
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Choose from a wide range of courses designed to meet your specific
            learning goals.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, i) => (
            <motion.div
              key={i}
              className="group relative bg-white dark:bg-navy/20 rounded-3xl shadow-lg p-8 flex flex-col transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-gray-100 dark:border-white/10 overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-kred/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>

              <h3 className="text-2xl font-bold text-navy dark:text-white mb-2 relative z-10">
                {course.title}
              </h3>

              {/* Fee Badge (Agar fee mojood hai) */}
              {course.fee && (
                <div className="mb-4 relative z-10">
                  <span className="inline-block bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-xs font-bold">
                    Fee: {course.fee}
                  </span>
                </div>
              )}

              <p className="text-gray-600 dark:text-gray-300 mb-6 relative z-10">
                {course.desc}
              </p>

              <div className="flex gap-4 mb-6 text-sm relative z-10">
                <span className="flex items-center gap-2 text-navy dark:text-white">
                  <FaClock className="text-kred" /> {course.duration}
                </span>
                <span className="flex items-center gap-2 text-navy dark:text-white">
                  <FaSignal className="text-kred" /> {course.level}
                </span>
              </div>

              {/* Benefits/Features list */}
              <ul className="space-y-2 mb-8 relative z-10 flex-grow">
                {course.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-200"
                  >
                    <FaCheckCircle className="text-green-500 min-w-4" />{" "}
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                to="/apply"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-center mt-auto relative z-10"
              >
                Apply Now
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;
