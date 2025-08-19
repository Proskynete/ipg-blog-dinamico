import { format } from "date-fns";
import { es } from "date-fns/locale";

export const formatDate = (date: number | string): string => {
  if (typeof date === "string") {
    return format(new Date(date), "dd 'de' MMMM 'de' yyyy", { locale: es });
  }
  return format(date * 1000, "dd 'de' MMMM 'de' yyyy", { locale: es });
};
