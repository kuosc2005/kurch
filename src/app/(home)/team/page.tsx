import React from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";

type TeamRole =
  | "Project Lead"
  | "Technical Team"
  | "Operations Team"
  | "Outreach and Engagement Team";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  team: TeamRole;
  image: string;
  link: string;
}

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Mukul Aryal",
    role: "Project Lead",
    team: "Project Lead",
    image: "/MukulAryal.webp",
    link: "https://github.com/mukulboro",
  },
  {
    id: "2",
    name: "Ashwini Subedi",
    role: "Technical Lead",
    team: "Technical Team",
    image: "/Ashwini.webp",
    link: "https://github.com/notashwinii",
  },
  {
    id: "3",
    name: "Pratik Sharma",
    role: "Backend Developer",
    team: "Technical Team",
    image: "/PratikSharma.webp",
    link: "https://github.com/pratiksharma0110",
  },
  {
    id: "4",
    name: "Himesh Dulal",
    role: "Full Stack Developer",
    team: "Technical Team",
    image: "/HimeshDulal.webp",
    link: "https://www.linkedin.com/in/himesh-dulal-2a6176277/?originalSubdomain=np",
  },
  {
    id: "4",
    name: "Shriharsh Acharya",
    role: "Backend Developer",
    team: "Technical Team",
    image: "/shriharsh.webp",
    link: "https://github.com/shri-acha",
  },
  {
    id: "4",
    name: "Ashitom Budhathoki",
    role: "Frontend Developer",
    team: "Technical Team",
    image: "/AshitomBudhathoki.webp",
    link: "https://github.com/AshitomW",
  },
  {
    id: "4",
    name: "Aakriti Pandey",
    role: "Designer",
    team: "Technical Team",
    image: "/AakritiPandey.webp",
    link: "https://www.linkedin.com/in/pandeyaakriti/",
  },
  {
    id: "4",
    name: "Dinisha Upreti",
    role: "Designer",
    team: "Technical Team",
    image: "/Dinisha.webp",
    link: "https://github.com/Dinishaaa",
  },
  {
    id: "5",
    name: "Aarya Pathak",
    role: "Operations Lead",
    team: "Operations Team",
    image: "/AaryaPathak.webp",
    link: "https://www.linkedin.com/in/aarya-pathak-421aa1269/",
  },
  {
    id: "6",
    name: "Safal Narshing Shrestha",
    role: "Team Member",
    team: "Operations Team",
    image: "/SafalShrestha.webp",
    link: " https://www.linkedin.com/in/safalnarsingh/",
  },

  {
    id: "6",
    name: "Abhinab Badal",
    role: "Team Member",
    team: "Operations Team",
    image: "/AbhinabBadal.webp",
    link: "https://www.linkedin.com/in/abhinab-badal-7a048b21b/",
  },

  {
    id: "6",
    name: "Nerish Shrestha",
    role: "Team Member",
    team: "Operations Team",
    image: "/NerishShrestha.webp",
    link: " https://www.linkedin.com/in/nerish-shrestha-30166227a/",
  },

  {
    id: "6",
    name: "Rasik Dhakal",
    role: "Team Member",
    team: "Operations Team",
    image: "/RasikDhakal.webp",
    link: " https://www.linkedin.com/in/dhakalrasik/",
  },
  {
    id: "7",
    name: "Anupama Neupane",
    role: "Outreach Lead",
    team: "Outreach and Engagement Team",
    image: "/AnupamaNeupane.webp",
    link: "https://www.linkedin.com/in/anupama-neupane-918b0b32a/",
  },

  {
    id: "8",
    name: "Mokshada Acharya",
    role: "Team Member",
    team: "Outreach and Engagement Team",
    image: "/MokshadaAcharya.webp",
    link: "https://www.linkedin.com/in/mokshada-acharya-7461a2299/",
  },
  {
    id: "8",
    name: "Shreejan Karmacharya",
    role: "Team Member",
    team: "Outreach and Engagement Team",
    image: "/Shreejan.webp",
    link: "https://www.linkedin.com/in/shreejan-karmacharya-84ba58273/",
  },
  {
    id: "8",
    name: "Saksham  Humagain",
    role: "Team Member",
    team: "Outreach and Engagement Team",
    image: "/SakshamHumagain.webp",
    link: "https://www.linkedin.com/in/saksham-humagain-260b02257/",
  },
];

const teamOrder: TeamRole[] = [
  "Project Lead",
  "Technical Team",
  "Operations Team",
  "Outreach and Engagement Team",
];

const getLeadRole = (team: TeamRole) => {
  switch (team) {
    case "Project Lead":
      return "Project Lead";
    case "Technical Team":
      return "Technical Lead";
    case "Operations Team":
      return "Operations Lead";
    case "Outreach and Engagement Team":
      return "Outreach Lead";
    default:
      return "";
  }
};

const TeamPage: React.FC = () => {
  return (
    <div>
      <Header />

      {/* Grid background only for top 10rem (h-40) */}
      <div className="relative h-40 w-full overflow-hidden">
        <h1 className="relative pt-32 z-10 text-3xl font-bold text-slate-900 text-center">
          Meet Our Team
        </h1>
      </div>

      {/* Main content below, no grid background */}
      <section className="relative bg-white">
        <div className="max-w-5xl mx-auto py-12 px-4">
          {teamOrder.map((team) => {
            const members = teamMembers.filter((m) => m.team === team);
            if (!members.length) return null;

            const leadRole = getLeadRole(team);
            const lead = members.find((m) => m.role === leadRole);
            const rest = members.filter((m) => m.role !== leadRole);

            return (
              <section key={team} className="mb-16">
                <h2 className="text-2xl font-semibold mb-6 text-center">
                  {team}
                </h2>
                {lead && (
                  <div className="flex justify-center mb-8">
                    <Link href={lead.link} passHref legacyBehavior>
                      <a
                        className="bg-[#025C62]/5 rounded-lg shadow p-6 flex flex-col items-center hover:shadow-lg transition cursor-pointer w-72"
                        title={`View ${lead.name}'s profile`}
                      >
                        <Image
                          src={lead.image}
                          alt={lead.name}
                          width={120}
                          height={120}
                          className="rounded-full mb-4 object-cover"
                        />
                        <h3 className="text-xl font-bold">{lead.name}</h3>
                        <p className="text-md text-gray-700">{lead.role}</p>
                      </a>
                    </Link>
                  </div>
                )}
                {rest.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-8">
                    {rest.map((member) => (
                      <Link
                        key={member.id + member.name}
                        href={member.link}
                        passHref
                        legacyBehavior
                      >
                        <a
                          className="bg-[#025C62]/5 rounded-lg shadow p-4 flex flex-col items-center hover:shadow-lg transition cursor-pointer w-64"
                          title={`View ${member.name}'s profile`}
                        >
                          <Image
                            src={member.image}
                            alt={member.name}
                            width={120}
                            height={120}
                            className="rounded-full mb-3 object-cover"
                          />
                          <h3 className="text-lg font-medium">{member.name}</h3>
                          <p className="text-sm text-gray-600">{member.role}</p>
                        </a>
                      </Link>
                    ))}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default TeamPage;
