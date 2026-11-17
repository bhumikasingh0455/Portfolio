import type { EducationItem } from '../types/portfolio';

export const EDUCATION_DATA: EducationItem[] = [
  {
    id: "edu-gla",
    degree: "Bachelor of Technology in Computer Science",
    university: "GLA University, Mathura",
    logo: "/gla_logo.png?v=3",
    duration: "August 2028",
    cgpa: "CPI: 7.19",
    honors: "GLA University, Mathura",
    coursework: ["Data Structures & Algorithms", "Web Engineering", "Database Systems (MongoDB)", "Object-Oriented Programming (Java)", "Software Engineering"]
  },
  {
    id: "edu-12th",
    degree: "Intermediate (CBSE)",
    university: "Aditya Birla Intermediate College, Renukoot",
    logo: "/abic_logo.png?v=5",
    duration: "May 2024",
    cgpa: "Percentage: 72%",
    honors: "Renukoot, Uttar Pradesh",
    coursework: ["Physics", "Chemistry", "Mathematics", "Computer Science"]
  },
  {
    id: "edu-10th",
    degree: "High School (CBSE)",
    university: "Aditya Birla Intermediate College, Renukoot",
    logo: "/abic_logo.png?v=5",
    duration: "May 2022",
    cgpa: "Percentage: 87.6%",
    honors: "Renukoot, Uttar Pradesh",
    coursework: ["Mathematics", "Science", "English", "Social Studies"]
  }
];
