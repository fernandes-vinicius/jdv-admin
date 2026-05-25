export interface User {
  id: string;
  name: string;
  email: string;
  is_admin: boolean;
  is_active: boolean;
  picture: string;
  created_at: string;
  updated_at: string;
  last_login_at: string;
}

export interface UserDashboardPermission {
  id: string;
  name: string;
  slug: string;
  description: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserProjectPermission {
  id: string;
  empreendimento_id: number;
  name: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
  is_admin: boolean;
}
