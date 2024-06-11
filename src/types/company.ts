export type TCompany = {
  id?: string;
  company?: string;
  country?: string;
  city: string;
  branch?: string;
  mainEmail?: string;
  secondaryEmail?: string;
  gpsLatitude?: string;
  gpsLongitude?: string;
  phone?: string;
  website?: string;
  commissioner?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type TCompanyList = {
  items: number;
  pages: number;
  next: number;
  prev: number;
  data: TCompany[];
};
