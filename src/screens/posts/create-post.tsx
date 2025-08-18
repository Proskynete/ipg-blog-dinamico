import { HeaderSection } from "../../components/header-section.component";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const postSchema = z.object({
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

const CreateNewPost = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isDirty },
  } = useForm<PostValues>({
    resolver: zodResolver(postSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      image: "",
      category: "",
      content: "",
    },
  });

  const handleCreateSlug = (e: React.ChangeEvent<HTMLInputElement>) => {
    const slug = e.target.value
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
    setValue("slug", slug);
  };

  const onSubmit = (data: PostValues) => {
    console.log(JSON.stringify(data, null));
  };

  const isBeyondLimit = watch("excerpt")?.length > 160;

  return (
    <section className="py-16">
      <HeaderSection title="Crear nuevo artículo" />

      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto w-full">
        <div className="w-full mt-5 sm:mt-8 pb-8">
          <div className="mx-auto w-full flex flex-col gap-5">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="w-full flex flex-col space-y-1">
                <label className="label">Título</label>
                <input
                  id="title"
                  type="text"
                  className={`input w-full ${
                    errors.title ? "input-error" : ""
                  }`}
                  placeholder="Ingrese el título del artículo"
                  aria-invalid={errors.title ? "true" : "false"}
                  {...register("title")}
                  onChange={handleCreateSlug}
                />
                <p className="label text-xs">{errors.title?.message}</p>
              </div>

              <div className="w-full flex flex-col space-y-1">
                <label className="label">Slug</label>
                <input
                  id="slug"
                  type="text"
                  className={`input w-full ${errors.slug ? "input-error" : ""}`}
                  aria-invalid={errors.slug ? "true" : "false"}
                  disabled
                  {...register("slug")}
                />
                <p className="label text-xs">{errors.slug?.message}</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="w-full flex flex-col space-y-1">
                <label className="label">Imagen</label>
                <input
                  id="image"
                  type="url"
                  className={`input w-full ${
                    errors.image ? "input-error" : ""
                  }`}
                  aria-invalid={errors.image ? "true" : "false"}
                  {...register("image")}
                />
                <p className="label text-xs">{errors.image?.message}</p>
              </div>
              <div className="w-full flex flex-col space-y-1">
                <label className="label">Categorías</label>
                <select
                  id="category"
                  defaultValue="Pick a browser"
                  className="select w-full"
                  {...register("category")}
                >
                  <option disabled={true}>Selecciona una categoría</option>
                  <option value="frontend">Frontend</option>
                  <option value="backend">Backend</option>
                  <option value="devops">Devops</option>
                  <option value="cloud">Cloud</option>
                </select>
                <p className="label text-xs">{errors.category?.message}</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="w-full flex flex-col space-y-1">
                <label className="label">Resumen</label>
                <textarea
                  id="excerpt"
                  className={`textarea w-full ${
                    isBeyondLimit ? "textarea-error text-error" : ""
                  }`}
                  placeholder="Resumen del artículo"
                  {...register("excerpt")}
                />
                <p
                  className={`label text-xs ${
                    isBeyondLimit ? "text-error" : ""
                  }`}
                >
                  {watch("excerpt")?.length}/160 caracteres
                </p>
              </div>
            </div>

            <div className="divider" />

            <div className="w-full flex flex-col space-y-1">
              <textarea
                id="content"
                className={`textarea w-full ${
                  errors.content ? "textarea-error text-error" : ""
                }`}
                placeholder="Lorem ipsum..."
                {...register("content")}
              />
            </div>
          </div>
        </div>

        <button
          className="btn btn-outline btn-secondary"
          type="submit"
          disabled={!isDirty}
        >
          Crear artículo
        </button>
      </form>
    </section>
  );
};

export default CreateNewPost;
