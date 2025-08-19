import { useMutation } from "@tanstack/react-query";
import { HeaderSection } from "../../components/header-section.component";
import { useAuth } from "../../modules/auth/infrastructure/ui/hooks/useAuth";
import type { PostValues } from "../../modules/post/domain/post.schema";
import { postRepository } from "../../modules/post/infrastructure/services/create-post.service";
import { CreateNewPostForm } from "../../modules/post/infrastructure/ui/create-new-post";

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
    <section className="py-16">
      <HeaderSection title="Crear nuevo artículo" />
      <CreateNewPostForm onSubmit={onSubmit} isLoading={mutation.isPending} />
    </section>
  );
};

export default CreateNewPost;
