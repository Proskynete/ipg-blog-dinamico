import { useQuery } from "@tanstack/react-query";
import { HeaderSection } from "../../components/header-section.component";
import { QUERY } from "../../constants/query-keys.constant";
import { postRepository } from "../../modules/post/infrastructure/services/post.service";
import { Card } from "../../components/card.component";
import { NavLink } from "react-router";

const AllPosts = () => {
  const { data: posts, isLoading } = useQuery({
    queryKey: [QUERY.posts.getAll],
    queryFn: () => postRepository.getAll(),
  });

  return (
    <>
      <title>Todos los artículos - Blog Dinámico</title>

      <section className="py-16">
        <HeaderSection title="Todas las publicaciones" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading && <p>Cargando publicaciones...</p>}
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <NavLink key={post.id} to={`/posts/${post.slug}`}>
                <Card {...post} />
              </NavLink>
            ))
          ) : (
            <p>No hay publicaciones disponibles.</p>
          )}
        </div>
      </section>
    </>
  );
};

export default AllPosts;
