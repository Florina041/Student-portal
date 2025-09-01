const societies = [
  // Cultural & Arts
  {
    id: 1,
    name: "Korus – Music & Dance Society",
    category: "Cultural & Arts",
    members: 210,
    lead: "Aarav Mehta",
    description:
      "Official music & dance society of KIIT nurturing stage talent and performances."
  },
  {
    id: 2,
    name: "Kalakaar – Dramatic Society",
    category: "Cultural & Arts",
    members: 165,
    lead: "Ananya Roy",
    description:
      "Theatre & nukkad plays; conducts dramatic competitions across campus."
  },
  {
    id: 3,
    name: "Kreative Eye – Photography & Painting Society",
    category: "Cultural & Arts",
    members: 180,
    lead: "Ritwik Sen",
    description:
      "Photography and painting club capturing campus life and imagination."
  },
  {
    id: 4,
    name: "Kzarshion – Fashion Society",
    category: "Cultural & Arts",
    members: 120,
    lead: "Meera Kapoor",
    description: "Fashion, styling and runway events."
  },
  {
    id: 5,
    name: "Kalliope – Literature & Stage Society",
    category: "Cultural & Arts",
    members: 140,
    lead: "Ishaan Verma",
    description:
      "Eloquence, literature and stage performances — celebrate the power of words."
  },
  {
    id: 6,
    name: "KIIT Wordsmith – Writing Society",
    category: "Cultural & Arts",
    members: 155,
    lead: "Rhea Nair",
    description:
      "For storytellers & poets; workshops and open-mics to hone your writing."
  },
  {
    id: 7,
    name: "SPIC MACAY – Indian Classical & Culture Society",
    category: "Cultural & Arts",
    members: 130,
    lead: "Devansh Iyer",
    description:
      "Promotes Indian classical music, dance, folk culture, yoga and heritage."
  },

  // Academic & Professional
  {
    id: 8,
    name: "Qutopia – Quizzing Society",
    category: "Academic & Professional",
    members: 200,
    lead: "Pranav Das",
    description: "Official quiz society fostering curiosity and critical thinking."
  },
  {
    id: 9,
    name: "Kronicle – Literary (Debating) Society",
    category: "Academic & Professional",
    members: 170,
    lead: "Shruti Saha",
    description: "Debate, public speaking and argumentation."
  },
  {
    id: 10,
    name: "TEDx-KU",
    category: "Academic & Professional",
    members: 95,
    lead: "Aditi Mishra",
    description:
      "Brings the TED experience to campus — ideas worth spreading."
  },
  {
    id: 11,
    name: "MUN-SOC – Model United Nations Society",
    category: "Academic & Professional",
    members: 160,
    lead: "Samar Khan",
    description:
      "Global diplomacy, UN simulations and international relations."
  },
  {
    id: 12,
    name: "Konnexions – IT & Web Development Society",
    category: "Academic & Professional",
    members: 230,
    lead: "Naman Gupta",
    description: "Web dev, IT skills and tech workshops."
  },
  {
    id: 13,
    name: "KIIT Robotics Society",
    category: "Academic & Professional",
    members: 240,
    lead: "Tanvi Raut",
    description: "Research & projects in robotics and automation."
  },
  {
    id: 14,
    name: "KIIT Society for Civil Engineers",
    category: "Academic & Professional",
    members: 110,
    lead: "Sourav Patnaik",
    description: "Networking, site visits and skill building for civil engineers."
  },
  {
    id: 15,
    name: "KIIT Electrical Society",
    category: "Academic & Professional",
    members: 125,
    lead: "Arjun Reddy",
    description:
      "Electrical innovation, projects and research initiatives."
  },
  {
    id: 16,
    name: "Apogeio – Aeronautical Society",
    category: "Academic & Professional",
    members: 102,
    lead: "Mahika Rao",
    description: "Aerospace, drones and aerodynamics."
  },
  {
    id: 17,
    name: "KIIT Automobile Society",
    category: "Academic & Professional",
    members: 150,
    lead: "Ronit Paul",
    description: "Automotive design, mobility and eco-friendly innovations."
  },

  // Social Impact & Awareness
  {
    id: 18,
    name: "Khwaab – Social Service Society",
    category: "Social Impact & Awareness",
    members: 260,
    lead: "Nikita Behera",
    description:
      "Volunteerism and community outreach inspired by ‘Art of Giving’."
  },
  {
    id: 19,
    name: "Kamakshi & HeForShe – Women Empowerment Societies",
    category: "Social Impact & Awareness",
    members: 185,
    lead: "Simran Kaur",
    description:
      "Awareness, advocacy and initiatives for gender equality."
  },
  {
    id: 20,
    name: "KIIT Intl. Student Society",
    category: "Social Impact & Awareness",
    members: 90,
    lead: "Daniel Okoro",
    description:
      "Celebrates diversity and supports international students."
  },
  {
    id: 21,
    name: "Kimaya – Medical Awareness Society",
    category: "Social Impact & Awareness",
    members: 130,
    lead: "Drishti Patro",
    description:
      "Health awareness, workshops, CMEs and first-aid training."
  },
  {
    id: 22,
    name: "Kraya & Kuber – Marketing & Finance Society",
    category: "Social Impact & Awareness",
    members: 175,
    lead: "Aditya Sharma",
    description:
      "Marketing, branding, finance and entrepreneurship."
  },
  {
    id: 23,
    name: "KIIT Animal & Environment Welfare Society",
    category: "Social Impact & Awareness",
    members: 145,
    lead: "Sanjana Rao",
    description:
      "Sustainability and animal welfare — ‘Pause for a Cause’."
  },
  {
    id: 24,
    name: "Enactus KIIT",
    category: "Social Impact & Awareness",
    members: 120,
    lead: "Harsh Vardhan",
    description:
      "Social entrepreneurship projects improving lives."
  },

  // Special Interest
  {
    id: 25,
    name: "Keurig – Food Society",
    category: "Special Interest",
    members: 100,
    lead: "Reema Kulkarni",
    description: "Culinary arts, food culture and tasting events."
  },
  {
    id: 26,
    name: "KIIT Film Society",
    category: "Special Interest",
    members: 135,
    lead: "Yash Agarwal",
    description: "Filmmaking, editing and production."
  },
  {
    id: 27,
    name: "Khwahishein – Hindi Literature Society",
    category: "Special Interest",
    members: 115,
    lead: "Aakash Tiwari",
    description: "Celebrates Hindi language and literature."
  },
  {
    id: 28,
    name: "Kraftovity – Art & Craft Society",
    category: "Special Interest",
    members: 98,
    lead: "Pooja Sinha",
    description:
      "Crafting, décor and DIY creativity for campus events."
  }
];

module.exports = societies;