import { useMutation } from "@tanstack/react-query";
import { HeaderSection } from "../../components/header-section.component";
import { useAuth } from "../../modules/auth/infrastructure/ui/hooks/useAuth";
import type { PostValues } from "../../modules/post/domain/post.schema";
import { postRepository } from "../../modules/post/infrastructure/services/post.service";
import { PostForm } from "../../modules/post/infrastructure/ui/components/post-form.component";

const CreateNewPost = () => {
  const { state } = useAuth();

  const mutation = useMutation({
    mutationFn: ({ data, uid }: { data: PostValues; uid: string }) =>
      postRepository.create(data, uid),
  });

  const onSubmit = async (data: PostValues) => {
    if (state.state === "SIGNED_IN") {
      mutation.mutate({ data, uid: state.currentUser.uid });
    }
  };

  return (
    <>
      <title>Crear nuevo artículo - Blog Dinámico</title>
      <section className="py-16">
        <HeaderSection title="Crear nuevo artículo" />
        <PostForm
          onSubmit={onSubmit}
          isLoading={mutation.isPending}
          isSuccess={mutation.isSuccess}
        />
      </section>
    </>
  );
};

export default CreateNewPost;
