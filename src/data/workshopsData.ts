export interface AgendaItem {
  title: string;
  topics: string[];
}

export interface Workshop {
  id: string;
  title: string;
  icon: string;
  color: string;
  tagline: string;
  duration: string;
  students: string;
  level: string;
  agenda: AgendaItem[];
  outcome: string[];
  skills: string[];
  certificate: string;
  instructor: {
    name: string;
    role: string;
    bio: string;
    image: string;
  };
  description: string;
  prerequisites: string[];
  testimonials: {
    name: string;
    role: string;
    text: string;
  }[];
  date?: Date;
  registrationOpen: boolean;
}

export const workshops: Workshop[] = [
  {
    id: "full-stack-web-weekend",
    title: "Full Stack Web Weekend",
    icon: "🚀",
    color: "from-indigo-500 to-purple-500",
    tagline: "Code, build, and deploy a full-stack app in just two days!",
    duration: "2 Days",
    students: "150+ registered",
    level: "Intermediate to Advanced",
    date: new Date("July 30, 2025 00:00:00"),
    registrationOpen: true,
    agenda: [
      {
        title: "Day 1 - Frontend Sprint",
        topics: ["React Setup", "UI Design with Tailwind", "Routing & State Management", "API Integration"]
      },
      {
        title: "Day 2 - Backend & Deployment",
        topics: ["Node.js & Express", "MongoDB Integration", "Auth System", "Vercel Deployment"]
      }
    ],
    outcome: ["Deployed Full-Stack App", "Team Collaboration Experience", "Workshop Certificate"],
    skills: ["Frontend Architecture", "Backend APIs", "Database Connectivity", "Deployment Pipeline"],
    certificate: "Workshop Participation Certificate with Project Showcase",
    instructor: {
      name: "Alex Morgan",
      role: "Senior Full Stack Developer",
      bio: "Alex has over 10 years of experience building web applications at scale. Previously worked at Google and Airbnb, now leading engineering teams and mentoring new developers through hands-on workshops.",
      image: "/images/instructors/alex-morgan.jpg"
    },
    description: "Join us for an intensive two-day Workshop where you'll build a complete full-stack application from scratch. This workshop is designed to simulate a real-world development sprint, where you'll work in teams to design, build, and deploy a functional web application. You'll learn modern development practices, collaborate with other developers, and walk away with a project you can showcase in your portfolio.",
    prerequisites: [
      "Basic knowledge of JavaScript",
      "Familiarity with React fundamentals",
      "Understanding of HTTP and RESTful APIs",
      "Git version control basics"
    ],
    testimonials: [
      {
        name: "Sarah J.",
        role: "Frontend Developer",
        text: "The workshop weekend was intense but incredibly rewarding. I learned more in two days than I did in months of self-study. Highly recommend!"
      },
      {
        name: "Michael T.",
        role: "Computer Science Student",
        text: "This workshop bridged the gap between academic knowledge and real-world application. The instructors were supportive and the team environment pushed me to level up my skills."
      }
    ]
  },
  {
    id: "ai-in-a-day",
    title: "AI in a Day: Build Your First Model",
    icon: "🤖",
    color: "from-green-500 to-blue-500",
    tagline: "Dive into Machine Learning basics through hands-on coding",
    // duration: "1 Day",
    students: "200+ joined",
    level: "Beginner",
    registrationOpen: false,
    agenda: [
      {
        title: "Session 1 - Python & Data",
        topics: ["Python Crash Course", "DataFrames with Pandas", "Visualization with Matplotlib"]
      },
      {
        title: "Session 2 - ML Modeling",
        topics: ["Scikit-Learn Basics", "Model Training", "Prediction Pipeline", "Accuracy Testing"]
      }
    ],
    outcome: ["Basic ML Model", "Data Analysis Skills", "Certificate of Completion"],
    skills: ["Python", "Data Science", "Model Evaluation", "ML Workflow"],
    certificate: "AI Workshop Completion Certificate",
    instructor: {
      name: "Dr. Priya Sharma",
      role: "AI Research Scientist",
      bio: "Dr. Sharma holds a PhD in Machine Learning and has published numerous papers on practical applications of AI. She specializes in making complex AI concepts accessible to beginners and has taught over 5,000 students through her workshops and online courses.",
      image: "/images/instructors/priya-sharma.jpg"
    },
    description: "This one-day intensive workshop is designed for beginners who want to understand the fundamentals of artificial intelligence and machine learning. You'll start with the basics of Python programming and data manipulation, then move on to building your first machine learning model. By the end of the day, you'll have a working model that can make predictions on real-world data and the knowledge to continue your AI journey.",
    prerequisites: [
      "No prior programming experience required",
      "Basic understanding of mathematics (high school level)",
      "Laptop with internet connection",
      "Enthusiasm to learn!"
    ],
    testimonials: [
      {
        name: "David K.",
        role: "Marketing Analyst",
        text: "As someone with no coding background, I was nervous about taking an AI workshop. Dr. Sharma broke everything down so clearly that I was able to build a working model by the end of the day!"
      },
      {
        name: "Lisa M.",
        role: "Computer Science Freshman",
        text: "This workshop gave me a practical foundation in ML that my university courses hadn't covered yet. The hands-on approach made complex concepts click for me."
      }
    ],
    duration: ""
  },
  {
    id: "design-thinking-bootcamp",
    title: "Design Thinking Bootcamp",
    icon: "🎨",
    color: "from-yellow-400 to-red-400",
    tagline: "Master the art of innovation and problem solving",
    // duration: "3 Days",
    students: "80+ creatives",
    level: "All Levels",
    registrationOpen: false,
    agenda: [
      {
        title: "Day 1 - Empathize & Define",
        topics: ["User Research", "Problem Framing", "Persona Creation"]
      },
      {
        title: "Day 2 - Ideate & Prototype",
        topics: ["Brainstorming Techniques", "Wireframes", "Low-Fidelity Prototypes"]
      },
      {
        title: "Day 3 - Test & Iterate",
        topics: ["User Feedback", "Rapid Iteration", "Pitching Ideas"]
      }
    ],
    outcome: ["Innovative Problem Solution", "Pitch Presentation", "Creative Thinking Skills"],
    skills: ["Empathy Mapping", "Prototyping", "Innovation Process", "User-Centered Design"],
    certificate: "Certified Design Thinker Credential",
    instructor: {
      name: "Maya Rodriguez",
      role: "UX Design Lead",
      bio: "Maya has led design teams at several Fortune 500 companies and startups. Her human-centered approach to design has helped create products used by millions of people worldwide. She's passionate about teaching others how to apply design thinking to solve complex problems.",
      image: "/images/instructors/maya-rodriguez.jpg"
    },
    description: "This immersive three-day bootcamp will transform how you approach problem-solving. Design thinking is a powerful methodology used by the world's most innovative companies to create user-centered solutions. You'll learn the complete design thinking process through hands-on activities, real-world case studies, and collaborative exercises. By the end of the bootcamp, you'll have the tools and mindset to tackle complex challenges in any field.",
    prerequisites: [
      "No design experience required",
      "Open mindset for creative problem solving",
      "Willingness to collaborate in teams",
      "Notebook and basic art supplies"
    ],
    testimonials: [
      {
        name: "James W.",
        role: "Product Manager",
        text: "Maya's design thinking bootcamp completely changed how I approach product development. The frameworks we learned have become essential tools in my daily work."
      },
      {
        name: "Aisha N.",
        role: "Nonprofit Director",
        text: "I came to learn about design but left with a whole new perspective on how to approach challenges in my organization. The bootcamp was engaging, practical, and immediately applicable."
      }
    ],
    duration: ""
  },
  {
    id: "senior-engineer-insights",
    title: "Inside the Software Industry: Senior Engineer Insights",
    icon: "💼",
    color: "from-blue-500 to-purple-600",
    tagline: "Learn from the journey of a senior engineer at top tech firms",
    //duration: "1 Day",
    students: "100+ aspiring engineers",
    level: "Intermediate to Advanced",
    registrationOpen: false,
    agenda: [
      {
        title: "Session 1 - Software Development Lifecycle",
        topics: ["Agile & Scrum", "DevOps Practices", "End-to-End Project Flow"]
      },
      {
        title: "Session 2 - Career Growth & Work Culture",
        topics: ["Team Collaboration", "Mentorship", "Company Culture in Big Tech"]
      },
      {
        title: "Session 3 - Q&A with the Senior Engineer",
        topics: ["Career Advice", "Real-world Challenges", "Resume Tips"]
      }
    ],
    outcome: [
      "Realistic View of Software Careers",
      "Knowledge of Tech Industry Practices",
      "Actionable Career Guidance"
    ],
    skills: [
      "Software Lifecycle Understanding",
      "Team Dynamics",
      "Career Planning",
      "Communication in Tech"
    ],
    certificate: "Industry Insights Participation Certificate",
    instructor: {
      name: "Raj Patel",
      role: "Principal Software Engineer",
      bio: "Raj has spent 15+ years in the software industry, working at companies like Microsoft, Amazon, and several successful startups. He specializes in distributed systems and has mentored dozens of engineers throughout his career. Raj is passionate about sharing the unwritten rules of the tech industry with the next generation of engineers.",
      image: "/images/instructors/raj-patel.jpg"
    },
    description: "This unique workshop offers a behind-the-scenes look at what it's really like to work in the software industry. Beyond technical skills, success in tech requires understanding the culture, processes, and unwritten rules of the industry. Through candid discussions, real-world stories, and interactive sessions, you'll gain insights that typically take years to acquire. This workshop is ideal for students, early-career engineers, or anyone looking to transition into tech.",
    prerequisites: [
      "Basic understanding of software development",
      "Interest in tech industry careers",
      "Questions about the software industry",
      "Resume (optional, for feedback)"
    ],
    testimonials: [
      {
        name: "Tina L.",
        role: "CS Graduate",
        text: "Raj's workshop gave me the confidence and insider knowledge I needed for my job interviews. His advice on negotiation alone was worth the price of admission!"
      },
      {
        name: "Kevin M.",
        role: "Self-taught Developer",
        text: "As someone without a traditional CS background, I was worried about breaking into the industry. This workshop demystified the process and helped me understand what companies are really looking for."
      }
    ],
    duration: ""
  }
];

export const getWorkshopById = (id: string): Workshop | undefined => {
  return workshops.find(workshop => workshop.id === id);
};