import { FaPlus } from "react-icons/fa6";
import { HeaderSection } from "../../components/header-section.component";
import { Card } from "../../components/card.component";
import { useNavigate } from "react-router";
import { postRepository } from "../../modules/post/infrastructure/services/create-post.service";
import { useAuth } from "../../modules/auth/infrastructure/ui/hooks/useAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY } from "../../constants/query-keys.constant";

const MyPosts = () => {
  const { state } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      postRepository.toggleActive(id, isActive),
  });

  const { data: posts, isLoading } = useQuery({
    queryKey: [QUERY.posts.getAllMyPosts],
    queryFn: () => {
      if (state.state === "SIGNED_IN") {
        return postRepository.getAll(state.currentUser.uid);
      }
    },
  });

  const handleCreatePost = () => {
    navigate("/my-posts/create");
  };

  const toggleAction = async (id: string, isActive: boolean) => {
    mutation.mutate({ id, isActive });

    await queryClient.invalidateQueries({
      queryKey: [QUERY.posts.getAllMyPosts],
    });
  };

  return (
    <section className="py-16">
      <HeaderSection
        title="Mis publicaciones"
        actions={[
          {
            label: (
              <>
                <FaPlus />
                Crear nueva publicación
              </>
            ),
            className: "btn btn-outline btn-accent btn-sm",
            onClick: handleCreatePost,
          },
        ]}
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading && <p>Cargando publicaciones...</p>}

        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <Card
              key={post.id}
              {...post}
              toggleAction={() => toggleAction(post.id, post.isActive)}
            />
          ))
        ) : (
          <p>No tienes publicaciones aún.</p>
        )}
      </div>
    </section>
  );
};

export default MyPosts;
