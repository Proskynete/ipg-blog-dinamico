import { Card } from "../components/card.component";
import { HeaderSection } from "../components/header-section.component";
import { postRepository } from "../modules/post/infrastructure/services/create-post.service";
import { useQuery } from "@tanstack/react-query";
import { QUERY } from "../constants/query-keys.constant";

const Home = () => {
  const { data: posts, isLoading } = useQuery({
    queryKey: [QUERY.posts.getAll],
    queryFn: () => postRepository.getAll(),
  });

  return (
    <>
      <title>Blog Dinámico</title>

      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-gray-900 leading-tight">
            Programación Frontend
          </h2>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Este proyecto es creado para la asignatura de programación Frontend
            de IPG, semana 4 - Encargo, donde se implementa un blog dinámico
            utilizando React, TypeScript, Tailwind con DaisyUI, Tanstack Query,
            React hook form con Zod y Firebase.
          </p>
        </div>
      </section>

      <section className="py-16">
        <HeaderSection title="Últimas publicaciones" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading && <p>Cargando publicaciones...</p>}
          {posts && posts.length > 0 ? (
            posts.map((post) => <Card key={post.id} {...post} />)
          ) : (
            <p>No hay publicaciones disponibles.</p>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
