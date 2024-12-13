import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Department, Role } from "@/lib/types";

const departments: Department[] = [
  "Бухгалтерия",
  "Отдел маркетинга",
  "Отдел кадров",
  "Отдел технического контроля",
  "Отдел сбыта",
  "Отдел IT",
  "Отдел логистики и транспорта",
  "Отдел клиентской поддержки",
  "Отдел разработки и исследований",
  "Отдел закупок",
];

export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    role: "" as Role,
    department: "" as Department,
    gender: "" as "male" | "female",
    birthDate: "",
  });

  const { register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email || !formData.password || !formData.name || !formData.role || !formData.gender || !formData.birthDate) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните все обязательные поля",
        variant: "destructive",
      });
      return;
    }

    // Validate department for User role
    if (formData.role === "User" && !formData.department) {
      toast({
        title: "Ошибка",
        description: "Пользователи должны указать отдел",
        variant: "destructive",
      });
      return;
    }

    try {
      console.log("Submitting registration form:", formData);
      await register(formData);
      toast({
        title: "Успех",
        description: "Регистрация успешно завершена",
      });
      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Ошибка",
        description: error instanceof Error ? error.message : "Ошибка при регистрации",
        variant: "destructive",
      });
    }
  };

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSelectChange = (field: string) => (value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md p-8 glass-card rounded-lg animate-fade-in">
        <h2 className="text-2xl font-bold text-center mb-6">Регистрация</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange("email")}
            required
          />
          <Input
            type="password"
            placeholder="Пароль"
            value={formData.password}
            onChange={handleChange("password")}
            required
          />
          <Input
            placeholder="Имя"
            value={formData.name}
            onChange={handleChange("name")}
            required
          />
          <Select onValueChange={handleSelectChange("role")} required>
            <SelectTrigger>
              <SelectValue placeholder="Выберите роль" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Admin">Admin</SelectItem>
              <SelectItem value="Manager">Manager</SelectItem>
              <SelectItem value="User">User</SelectItem>
            </SelectContent>
          </Select>

          {formData.role === "User" && (
            <Select onValueChange={handleSelectChange("department")} required>
              <SelectTrigger>
                <SelectValue placeholder="Выберите отдел" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          <Select onValueChange={handleSelectChange("gender")} required>
            <SelectTrigger>
              <SelectValue placeholder="Выберите пол" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Мужской</SelectItem>
              <SelectItem value="female">Женский</SelectItem>
            </SelectContent>
          </Select>

          <Input
            type="date"
            value={formData.birthDate}
            onChange={handleChange("birthDate")}
            required
          />

          <Button type="submit" className="w-full">
            Зарегистрироваться
          </Button>

          <p className="text-center text-sm">
            Уже есть аккаунт?{" "}
            <a href="/login" className="text-primary hover:underline">
              Войти
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}