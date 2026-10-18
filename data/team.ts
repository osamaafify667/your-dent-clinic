export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  qualifications: string[];
  bio: string;
  image?: string;
};

export const doctors: Doctor[] = [];

export const teamSectionVisible = doctors.length > 0;
