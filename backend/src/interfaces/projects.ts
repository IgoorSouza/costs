export interface CreateProject {
  name: string;
  budget: number;
  category: string;
  userId: string;
}

export interface UpdateProject {
  id: string;
  name?: string;
  budget?: number;
  category?: string;
  userId: string;
}
