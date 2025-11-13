
export type User = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  status: "active" | "expired" | "Inactive";
};

export type TabType = "dashboard" | "users" | "certificates" | "orders" | "analytics" | "land" | "categories" | "services";
