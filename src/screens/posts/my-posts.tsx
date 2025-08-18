import { FaPlus } from "react-icons/fa6";
import { HeaderSection } from "../../components/header-section.component";
import { Card } from "../../components/card.component";
import type { Post } from "../../modules/post/domain/post.domain";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { postRepository } from "../../modules/post/infrastructure/services/create-post.service";
import { useAuth } from "../../modules/auth/infrastructure/ui/hooks/useAuth";

const MyPosts = () => {
  const { state } = useAuth();

  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (state.state === "SIGNED_IN") {
      postRepository.getAll(state.currentUser.uid).then((posts) => {
        setPosts(posts);
      });
    }
  }, [state]);

  const handleCreatePost = () => {
    navigate("/my-posts/create");
  };

  const toggleAction = async (id: string, isActive: boolean) => {
    await postRepository.toggleActive(id, isActive);
    const newPosts = posts.map((post) => {
      if (post.id === id) return { ...post, isActive: !isActive };
      return post;
    });
    setPosts(newPosts);
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
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <Card
              key={index}
              title={post.title}
              description={post.excerpt}
              date={post.date}
              readingTime={post.readTime}
              imageUrl={post.image}
              category={post.category}
              isActive={post.isActive}
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
