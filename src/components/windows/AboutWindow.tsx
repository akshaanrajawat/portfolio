import { User, Mail, MapPin, Briefcase, GraduationCap } from "lucide-react";

const AboutWindow = () => {
  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        {/* Profile Header */}
        <div className="flex items-center gap-6 mb-8">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
            <User className="w-16 h-16 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">Akshaan</h1>
            <p className="text-lg text-muted-foreground mb-2">AI ML Developer, Full Stack Developer, Enthusiast</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Mail className="w-4 h-4" />
                <span>akshaanrajawat@gmail.com</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>Bangalore, IN</span>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              Who am I?
            </h2>
            <p className="text-muted-foreground leading-relaxed">
            I’m Akshaan — a results-driven individual known for turning ideas into execution. With an obsessive attention to detail and a strong sense of leadership, I ensure that every project I take on is completed with precision and purpose. I believe in leading by example, maintaining high standards, and always getting the job done efficiently
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <GraduationCap className="w-5 h-5" />
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {["React", "Python", "Node.js", "Machine Learning", "Smote", "PostgreSQL", "Tailwind CSS", "Git", "n8n", "AI/ML", "Automation"].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Experience section removed per user request */}
        </div>
      </div>
    </div>
  );
};

export default AboutWindow;
