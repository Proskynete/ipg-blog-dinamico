import { HeaderSection } from "../../components/header-section.component";
import type { PostValues } from "../../modules/post/domain/post.schema";
import { CreateNewPostForm } from "../../modules/post/infrastructure/ui/create-new-post";

const CreateNewPost = () => {
  const onSubmit = (data: PostValues) => {
    console.log(JSON.stringify(data, null));
  };

  return (
    <section className="py-16">
      <HeaderSection title="Crear nuevo artículo" />
      <CreateNewPostForm onSubmit={onSubmit} />
    </section>
  );
};

export default CreateNewPost;
