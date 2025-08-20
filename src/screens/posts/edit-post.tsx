import { useMutation, useQuery } from "@tanstack/react-query";
import { HeaderSection } from "../../components/header-section.component";
import type { PostValues } from "../../modules/post/domain/post.schema";
import { postRepository } from "../../modules/post/infrastructure/services/post.service";
import { PostForm } from "../../modules/post/infrastructure/ui/components/post-form.component";
import { useParams } from "react-router";
import { QUERY } from "../../constants/query-keys.constant";

const EditPost = () => {
  const { slug } = useParams();

  const { data: postInfo, isLoading } = useQuery({
    queryKey: [QUERY.posts.getBySlug, slug],
    queryFn: () => postRepository.getBySlug(slug!),
    enabled: !!slug,
  });

  const mutation = useMutation({
    mutationFn: ({ data, id }: { data: PostValues; id: string }) =>
      postRepository.edit(id, data),
  });

  const onSubmit = async (data: PostValues) => {
    if (postInfo) {
      mutation.mutate({ data, id: postInfo.id });
    }
  };

  return (
    <>
      <title>Editar el artículo {postInfo?.title} - Blog Dinámico</title>

      <section className="py-16">
        <HeaderSection title="Editar artículo" />
        {isLoading && <p>Cargando...</p>}

        {postInfo && (
          <PostForm
            onSubmit={onSubmit}
            isLoading={mutation.isPending || isLoading}
            isSuccess={mutation.isSuccess}
            defaultValues={postInfo}
          />
        )}
      </section>
    </>
  );
};

export default EditPost;
