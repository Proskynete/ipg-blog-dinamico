import { HeaderSection } from "../../components/header-section.component";
import type { PostValues } from "../../modules/post/domain/post.schema";
import { postRepository } from "../../modules/post/infrastructure/services/create-post.service";
import { CreateNewPostForm } from "../../modules/post/infrastructure/ui/create-new-post";

const CreateNewPost = () => {
  const onSubmit = async (data: PostValues) => {
    await postRepository.create(data);
  };

  return (
    <section className="py-16">
      <HeaderSection title="Crear nuevo artículo" />
      <CreateNewPostForm onSubmit={onSubmit} />
    </section>
  );
};

export default CreateNewPost;
