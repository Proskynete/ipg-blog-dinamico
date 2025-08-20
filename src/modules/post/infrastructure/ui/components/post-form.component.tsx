import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createNewPostSchema,
  type PostValues,
} from "../../../domain/post.schema";
import { FaCircleInfo } from "react-icons/fa6";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { postRepository } from "../../services/post.service";
import { clearString } from "../../../../../helpers/common.helper";
import { useEffect, useState } from "react";
import type { Post } from "../../../domain/post.domain";
import { useNavigate } from "react-router";

interface PostFormProps {
  onSubmit: (data: PostValues) => void;
  isLoading: boolean;
  isSuccess: boolean;
  defaultValues?: Post;
}

export const PostForm = ({
  onSubmit,
  isLoading,
  isSuccess,
  defaultValues,
}: PostFormProps) => {
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState({
    message: "",
    show: false,
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    clearErrors,
    formState: { errors, isDirty },
  } = useForm<PostValues>({
    resolver: zodResolver(createNewPostSchema),
    defaultValues,
  });

  const handleCreateSlug = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("title", e.target.value);
    setValue("slug", clearString(e.target.value));
  };

  const handleVerifySlug = async () => {
    const slug = watch("slug");
    if (slug) {
      const isTaken = await postRepository.verifySlug(slug);
      if (isTaken) {
        setError("slug", {
          type: "manual",
          message: "Este slug ya está en uso.",
        });
      } else {
        clearErrors("slug");
      }
    }
  };

  const isBeyondLimit = watch("excerpt")?.length > 160;

  useEffect(() => {
    if (isSuccess) {
      setShowToast({
        message: `Artículo ${
          defaultValues ? "editado" : "creado"
        } correctamente`,
        show: true,
      });

      setTimeout(() => {
        setShowToast({
          message: "",
          show: false,
        });

        navigate("/my-workspace");
      }, 3000);
    }
  }, [isSuccess, defaultValues, navigate]);

  return (
    <form className="mx-auto w-full" onSubmit={handleSubmit(onSubmit)}>
      <div
        className={`toast toast-end z-50 ${showToast.show ? "show" : "hidden"}`}
      >
        <div className={`alert alert-success`}>
          <span>{showToast.message}</span>
        </div>
      </div>

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
                onBlur={() => {
                  if (
                    !defaultValues ||
                    defaultValues.title !== watch("title") ||
                    defaultValues.slug !== watch("slug")
                  )
                    handleVerifySlug();
                }}
              />
              <p className="label text-xs">{errors.title?.message}</p>
            </div>

            <div className="w-full flex flex-col space-y-1">
              <label className="label">
                Slug
                <div
                  className="tooltip tooltip-accent inline"
                  data-tip="Se generará automáticamente a partir del título"
                >
                  <FaCircleInfo className="inline" />
                </div>
              </label>

              <input
                id="slug"
                type="text"
                className={`input w-full ${errors.slug ? "input-error" : ""}`}
                placeholder="titulo-del-sitio"
                aria-invalid={errors.slug ? "true" : "false"}
                readOnly
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
                placeholder="https://example.com/image.jpg"
                {...register("image")}
              />
              <p className="label text-xs">{errors.image?.message}</p>
            </div>

            <div className="w-full flex flex-col space-y-1">
              <label className="label">Categorías</label>
              <select
                id="category"
                defaultValue=""
                className="select w-full"
                {...register("category")}
              >
                <option disabled={true} value="">
                  Selecciona una categoría
                </option>
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

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="w-full flex flex-col space-y-1">
              <label className="label">Contenido del artículo</label>
              <textarea
                id="content"
                className={`textarea w-full ${
                  errors.content ? "textarea-error text-error" : ""
                }`}
                rows={20}
                placeholder="Lorem ipsum..."
                {...register("content")}
              />
            </div>

            <section className="w-full flex flex-col space-y-1">
              <p className="label">Preview</p>
              <div className="mockup-browser border-base-300 border w-full">
                <div className="mockup-browser-toolbar">
                  <div className="input">https://lorem-ipsum.cl</div>
                </div>
                <div
                  id="articleBody"
                  className="p-1 border-t border-base-300 h-96 overflow-y-auto"
                >
                  <Markdown remarkPlugins={[remarkGfm]}>
                    {watch("content")}
                  </Markdown>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <button
        className="btn btn-outline btn-secondary"
        type="submit"
        disabled={!isDirty || isLoading}
      >
        {defaultValues ? "Actualizar artículo" : "Crear artículo"}
      </button>
    </form>
  );
};
