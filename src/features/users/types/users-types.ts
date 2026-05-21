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
  user_id: string;
  dashboard_id: string;
  granted_at: string;
  granted_by: string;
}

export interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
  is_admin: boolean;
}
