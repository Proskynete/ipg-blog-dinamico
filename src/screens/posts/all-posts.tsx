import { useQuery } from "@tanstack/react-query";
import { HeaderSection } from "../../components/header-section.component";
import { QUERY } from "../../constants/query-keys.constant";
import { postRepository } from "../../modules/post/infrastructure/services/create-post.service";
import { Card } from "../../components/card.component";

const AllPosts = () => {
  const { data: posts, isLoading } = useQuery({
    queryKey: [QUERY.posts.getAll],
    queryFn: () => postRepository.getAll(),
  });

  return (
    <section className="py-16">
      <HeaderSection title="Todas las publicaciones" />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading && <p>Cargando publicaciones...</p>}
        {posts && posts.length > 0 ? (
          posts.map((post) => <Card key={post.id} {...post} />)
        ) : (
          <p>No hay publicaciones disponibles.</p>
        )}
      </div>
    </section>
  );
};

export default AllPosts;
