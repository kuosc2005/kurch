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
  university: string;
  location: string;
  email: string;
  education: string;
  bio: string;
  researchInterests: string[];
  publications: Publication[];
}
