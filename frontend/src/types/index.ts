export interface Post {
  id: number;
  title: string;
  company: string;
  location: string;
  job_type: 'Full Time' | 'Part Time' | 'Contract' | 'Internship';
  salary_range?: string;
  description: string;
  requirements: string;
  benefits?: string;
  contact_email: string;
  contact_phone?: string;
  deadline: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
    links: {
      first: string;
      last: string;
      prev: string | null;
      next: string | null;
    };
  };
}

export interface SingleResponse<T> {
  success: boolean;
  data: T;
}
