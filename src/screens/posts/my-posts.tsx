import { FaPlus } from "react-icons/fa6";
import { HeaderSection } from "../../components/header-section.component";
import { Card } from "../../components/card.component";
import type { Post } from "../../modules/post/domain/post.domain";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { postRepository } from "../../modules/post/infrastructure/services/create-post.service";

const MyPosts = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    postRepository.getAll().then((posts) => {
      setPosts(posts);
    });
  }, []);

  const handleShowModal = () => {
    navigate("/my-posts/create");
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
            onClick: handleShowModal,
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
