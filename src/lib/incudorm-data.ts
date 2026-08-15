export type Stage = "Concept" | "Prototype" | "MVP" | "Launched";

export type Idea = {
  id: string;
  title: string;
  pitch: string;
  stage: Stage;
  needs: string[];
  upvotes: number;
  comments: number;
  author: string;
  campus: string;
  lookingForTeam: boolean;
  pinned?: boolean;
  mine?: boolean;
};

export const ideas: Idea[] = [
  {
    id: "food-waste",
    title: "Campus food-waste tracker",
    pitch: "Mess halls throw away ~40kg of food a day. We log surplus in real time and ping students nearby before it hits the bin.",
    stage: "MVP",
    needs: ["designer", "backend dev"],
    upvotes: 24,
    comments: 6,
    author: "Ananya R.",
    campus: "VIT",
    lookingForTeam: true,
    pinned: true,
    mine: true,
  },
  {
    id: "peer-tutoring",
    title: "Peer tutoring marketplace",
    pitch: "Seniors who aced a course tutor juniors taking it now. Credits instead of cash, verified by grade records.",
    stage: "Concept",
    needs: ["co-founder"],
    upvotes: 9,
    comments: 2,
    author: "Rahul M.",
    campus: "VIT",
    lookingForTeam: true,
  },
  {
    id: "hostel-laundry",
    title: "Hostel laundry booking",
    pitch: "Machine queues are chaos. Book a 40-minute slot, get a nudge when your load is done.",
    stage: "Prototype",
    needs: ["iOS dev"],
    upvotes: 17,
    comments: 4,
    author: "Ananya R.",
    campus: "VIT",
    lookingForTeam: false,
    mine: true,
  },
  {
    id: "lab-swap",
    title: "Lab equipment swap board",
    pitch: "Departments hoard idle instruments. A lending board with deposits and a two-day return window.",
    stage: "Concept",
    needs: ["hardware lead", "designer"],
    upvotes: 6,
    comments: 1,
    author: "Meera S.",
    campus: "IIT-M",
    lookingForTeam: true,
  },
  {
    id: "commute-pool",
    title: "Verified commute pooling",
    pitch: "Only students with a campus email, matched by route and class timetable.",
    stage: "Launched",
    needs: [],
    upvotes: 31,
    comments: 11,
    author: "Kabir T.",
    campus: "SRM",
    lookingForTeam: false,
  },
];

export type Student = {
  id: string;
  name: string;
  initials: string;
  headline: string;
  skills: string[];
  pastProjects: string[];
  lookingFor: string;
};

export const students: Student[] = [
  {
    id: "ananya",
    name: "Ananya R.",
    initials: "AR",
    headline: "CS sophomore, VIT",
    skills: ["React", "Figma", "Product design"],
    pastProjects: ["Hostel laundry booking app (Figma prototype)"],
    lookingFor: "A team building consumer apps",
  },
  {
    id: "rahul",
    name: "Rahul M.",
    initials: "RM",
    headline: "IT junior, VIT",
    skills: ["Node", "Postgres", "Go"],
    pastProjects: ["Attendance scraper used by 400 students"],
    lookingFor: "A design-minded co-founder",
  },
  {
    id: "meera",
    name: "Meera S.",
    initials: "MS",
    headline: "Mech sophomore, IIT-M",
    skills: ["CAD", "Embedded C", "3D printing"],
    pastProjects: ["Solar tracker for the campus roof"],
    lookingFor: "Hardware side-projects with real users",
  },
  {
    id: "kabir",
    name: "Kabir T.",
    initials: "KT",
    headline: "BBA senior, SRM",
    skills: ["Growth", "Ops", "Sales"],
    pastProjects: ["Ran a 2000-member campus fest"],
    lookingFor: "Technical founders who ship fast",
  },
];

export type Message = { id: string; author: string; body: string; me?: boolean };

export type Thread = {
  id: string;
  name: string;
  members: number;
  messages: Message[];
};

export const threads: Thread[] = [
  {
    id: "food-waste-team",
    name: "Food-waste tracker team",
    members: 3,
    messages: [
      { id: "1", author: "Rahul", body: "I can start on the backend this week" },
      { id: "2", author: "You", body: "Great, I'll share the wireframes tonight", me: true },
      { id: "3", author: "Meera", body: "Can we get mess-hall data from the admin office?" },
    ],
  },
  {
    id: "peer-tutoring-dm",
    name: "Rahul M.",
    members: 2,
    messages: [
      { id: "1", author: "Rahul", body: "Saw your laundry prototype — clean work" },
      { id: "2", author: "You", body: "Thanks! Want to pair on the tutoring idea?", me: true },
    ],
  },
];

export const roleOptions = [
  "Designer",
  "Frontend dev",
  "Backend dev",
  "Mobile dev",
  "Co-founder",
  "Growth",
  "Hardware lead",
];

export type Contest = {
  id: string;
  name: string;
  host: string;
  deadline: string;
  prize: string;
  tracks: string[];
  blurb: string;
  status: "Open" | "Judging" | "Closed";
  registered: number;
};

export const contests: Contest[] = [
  {
    id: "campus-sprint",
    name: "Campus Build Sprint",
    host: "VIT E-Cell",
    deadline: "Sep 12",
    prize: "₹50,000 + incubation",
    tracks: ["Consumer", "Campus ops", "Sustainability"],
    blurb: "48 hours, one working prototype. Teams of 2-4, at least one non-technical member.",
    status: "Open",
    registered: 34,
  },
  {
    id: "hardware-jam",
    name: "Hardware Jam",
    host: "IIT-M Tinkerers Lab",
    deadline: "Oct 03",
    prize: "Lab access for a semester",
    tracks: ["Robotics", "Sensors"],
    blurb: "Bring a breadboard idea, leave with a demo. Components sponsored for shortlisted teams.",
    status: "Open",
    registered: 12,
  },
  {
    id: "spring-pitch",
    name: "Spring Pitch Day",
    host: "SRM Incubator",
    deadline: "Closed Jul 20",
    prize: "₹1,00,000 seed",
    tracks: ["Any"],
    blurb: "Five minutes on stage in front of alumni investors.",
    status: "Judging",
    registered: 58,
  },
];

export type TeamFile = { id: string; name: string; size: string; by: string; when: string };
export type Poll = { id: string; question: string; options: { label: string; votes: number }[] };

export type Team = {
  id: string;
  name: string;
  idea: string;
  members: { name: string; role: string }[];
  repo: string;
  repoBranch: string;
  files: TeamFile[];
  polls: Poll[];
  contestId?: string;
};

export const teams: Team[] = [
  {
    id: "food-waste-team",
    name: "Food-waste tracker",
    idea: "food-waste",
    contestId: "campus-sprint",
    members: [
      { name: "Ananya R.", role: "Design + product" },
      { name: "Rahul M.", role: "Backend" },
      { name: "Meera S.", role: "Hardware" },
    ],
    repo: "ananya-r/foodwaste-tracker",
    repoBranch: "main",
    files: [
      { id: "f1", name: "wireframes-v2.fig", size: "4.1 MB", by: "Ananya R.", when: "2 days ago" },
      { id: "f2", name: "mess-survey.csv", size: "18 KB", by: "Meera S.", when: "5 days ago" },
      { id: "f3", name: "pitch-outline.md", size: "3 KB", by: "Rahul M.", when: "last week" },
    ],
    polls: [
      {
        id: "p1",
        question: "Which track do we enter for Campus Build Sprint?",
        options: [
          { label: "Sustainability", votes: 2 },
          { label: "Campus ops", votes: 1 },
        ],
      },
    ],
  },
  {
    id: "tutoring-team",
    name: "Peer tutoring",
    idea: "peer-tutoring",
    members: [
      { name: "Rahul M.", role: "Backend" },
      { name: "Kabir T.", role: "Growth" },
    ],
    repo: "rahul-m/peer-tutoring",
    repoBranch: "dev",
    files: [{ id: "f1", name: "credit-model.xlsx", size: "31 KB", by: "Kabir T.", when: "yesterday" }],
    polls: [
      {
        id: "p1",
        question: "Credits or cash for tutors?",
        options: [
          { label: "Credits", votes: 1 },
          { label: "Cash", votes: 1 },
        ],
      },
    ],
  },
];
