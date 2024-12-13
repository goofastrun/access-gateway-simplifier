export type Role = "Admin" | "Manager" | "User";

export type Department = 
  | "Бухгалтерия"
  | "Отдел маркетинга"
  | "Отдел кадров"
  | "Отдел технического контроля"
  | "Отдел сбыта"
  | "Отдел IT"
  | "Отдел логистики и транспорта"
  | "Отдел клиентской поддержки"
  | "Отдел разработки и исследований"
  | "Отдел закупок";

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  department?: Department;
  gender: "male" | "female";
  birthDate: string;
}

export interface Post {
  id: string;
  content: string;
  department: Department | "all";
  createdAt: string;
  author: User;
}