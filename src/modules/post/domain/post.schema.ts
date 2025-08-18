import { z } from "zod";

export const postSchema = z.object({
  title: z.string().nonempty("El título es requerido"),
  slug: z.string().nonempty("El slug es requerido"),
  image: z
    .url("Debe usar un formato de URL válido")
    .nonempty("La URL de la imagen es requerida"),
  category: z.string().nonempty("La categoría es requerida"),
  excerpt: z
    .string()
    .nonempty("El resumen es requerido")
    .max(160, "El resumen no puede exceder los 160 caracteres"),
  content: z.string(),
});

export type PostValues = z.infer<typeof postSchema>;
