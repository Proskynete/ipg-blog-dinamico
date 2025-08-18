import { format } from "date-fns";
import { es } from "date-fns/locale";

export const formatDate = (date: number): string =>
  format(date * 1000, "dd 'de' MMMM 'de' yyyy", { locale: es });
