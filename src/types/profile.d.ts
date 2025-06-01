export interface Publication {
  title: string;
  journal: string;
  volume: string;
  date: string;
  description: string;
  tags: string[];
  citations: number;
  authors: string;
}

export interface ProfileData {
  name: string;
  title: string;
  department: string;
  university: string;
  location: string;
  email: string;
  education: string;
  bio: string;
  website?: string;
  orcidId?: string;
  googleScholar?: string;
  researchInterests: string[];
  publications: Publication[];
}
