import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createNewPostSchema, type PostValues } from "../../domain/post.schema";
import { DEFAULT_POST_VALUES } from "../constants/default-values.constant";

interface CreateNewPostProps {
  onSubmit: (data: PostValues) => void;
}

export const CreateNewPostForm = ({ onSubmit }: CreateNewPostProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isDirty },
  } = useForm<PostValues>({
    resolver: zodResolver(createNewPostSchema),
    mode: "onChange",
    defaultValues: DEFAULT_POST_VALUES,
  });

  const handleCreateSlug = (e: React.ChangeEvent<HTMLInputElement>) => {
    const slug = e.target.value
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
    setValue("slug", slug);
  };

  const isBeyondLimit = watch("excerpt")?.length > 160;

  return (
    <form className="mx-auto w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full mt-5 sm:mt-8 pb-8">
        <div className="mx-auto w-full flex flex-col gap-5">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="w-full flex flex-col space-y-1">
              <label className="label">Título</label>
              <input
                id="title"
                type="text"
                className={`input w-full ${errors.title ? "input-error" : ""}`}
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
                className={`input w-full ${errors.image ? "input-error" : ""}`}
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
                className={`label text-xs ${isBeyondLimit ? "text-error" : ""}`}
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
  );
};
