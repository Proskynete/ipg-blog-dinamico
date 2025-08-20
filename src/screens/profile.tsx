import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { HeaderSection } from "../components/header-section.component";
import { formatDate } from "../helpers/date.helper";
import { useAuth } from "../modules/auth/infrastructure/ui/hooks/useAuth";
import {
  FaRegEye,
  FaRegFileLines,
  FaRegCalendar,
  FaRegUser,
  FaPlus,
} from "react-icons/fa6";
import { QUERY } from "../constants/query-keys.constant";
import { postRepository } from "../modules/post/infrastructure/services/post.service";
import { useNavigate } from "react-router";
import { Card } from "../components/card.component";

const Profile = () => {
  const { state } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: posts, isLoading } = useQuery({
    queryKey: [QUERY.posts.getAllMyPosts],
    queryFn: () => {
      if (state.state === "SIGNED_IN") {
        return postRepository.getAll(state.currentUser.uid);
      }
    },
  });

  const mutation = useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      postRepository.toggleActive(id, isActive),
  });

  const handleCreatePost = () => {
    navigate("/my-workspace/create-new-post");
  };

  const toggleAction = async (id: string, isActive: boolean) => {
    mutation.mutate({ id, isActive });

    await queryClient.invalidateQueries({
      queryKey: [QUERY.posts.getAllMyPosts],
    });
  };

  if (state.state !== "SIGNED_IN") return null;

  return (
    <>
      <title>Perfil - Blog Dinámico</title>

      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                {state.currentUser.photoURL ? (
                  <img
                    src={state.currentUser.photoURL}
                    alt={state.currentUser.displayName || "User Avatar"}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <FaRegUser className="text-4xl text-gray-400" />
                )}
              </div>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-light text-gray-900 mb-2">
                {state.currentUser.displayName}
              </h1>
              <p className="text-gray-600 mb-4 max-w-2xl flex items-baseline gap-1">
                {state.currentUser.email}
                {state.currentUser.emailVerified && (
                  <p className="text-xs inline">(verificado)</p>
                )}
              </p>
              <div className="flex flex-wrap gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <FaRegEye />
                  2,773 total views
                </div>
                <div className="flex items-center gap-1">
                  <FaRegFileLines /> {posts?.length} artículos
                </div>
                <div className="flex items-center gap-1">
                  <FaRegCalendar />
                  {state.currentUser.metadata.creationTime &&
                    formatDate(state.currentUser.metadata.creationTime)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 md:grid-cols-3 gap-4">
            <div
              data-slot="card"
              className="bg-card flex flex-col gap-6 rounded-xl border border-base-300 p-4 text-center card-dash bg-base-100 shadow-sm"
            >
              <div className="text-2xl font-light text-gray-900">
                {posts?.length}
              </div>
              <div className="text-sm">Artículos publicados</div>
            </div>
            <div
              data-slot="card"
              className="bg-card flex flex-col gap-6 rounded-xl border border-base-300 p-4 text-center card-dash bg-base-100 shadow-sm"
            >
              <div className="text-2xl font-light text-gray-900">
                {posts?.filter((post) => !post.isActive).length}
              </div>
              <div className="text-sm">Artículos desactivados</div>
            </div>
            <div
              data-slot="card"
              className="bg-card flex flex-col gap-6 rounded-xl border border-base-300 p-4 text-center card-dash bg-base-100 shadow-sm"
            >
              <div className="text-2xl font-light text-gray-900">2,773</div>
              <div className="text-sm">Total Views</div>
            </div>
          </div>
        </div>
      </section>

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
    </>
  );
};

export default Profile;
