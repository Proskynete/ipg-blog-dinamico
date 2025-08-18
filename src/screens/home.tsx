import { FaArrowRight, FaRegCalendar, FaRegClock } from "react-icons/fa6";
import { Card } from "../components/card.component";
import { HeaderSection } from "../components/header-section.component";
import { Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import type { Post } from "../modules/post/domain/post.domain";
import { postRepository } from "../modules/post/infrastructure/services/create-post.service";
import { formatDate } from "../helpers/date.helper";

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    postRepository.getAll().then((posts) => {
      setPosts(posts);
    });
  }, []);

  const featuredPost = {
    title: "The Art of Minimalist Living",
    excerpt:
      "Discover how embracing simplicity can transform your daily life and bring clarity to your thoughts.",
    date: Timestamp.fromDate(new Date("March 15, 2024")),
    readingTime: 5,
    category: "Lifestyle",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/minimalist-natural-light-EVtGhd6RGR6bI7G1a87qq8ZZQpXz71.png",
  };

  return (
    <>
      <section className="py-12">
        <div>
          <HeaderSection title="El recomendado del mes" />

          <div className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-64 md:h-full">
                <img
                  src={featuredPost.image || "/placeholder.svg"}
                  alt={featuredPost.title}
                  className="object-cover"
                />
              </div>

              <div className="p-8 md:p-12 flex flex-col justify-center">
                <span className="badge badge-xs badge-neutral badge-dash capitalize">
                  {featuredPost.category}
                </span>
                <h4 className="text-2xl md:text-3xl font-light text-gray-900 mb-4 leading-tight">
                  {featuredPost.title}
                </h4>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="w-full flex items-center text-xs text-gray-500 gap-2">
                  <div className="flex items-center gap-1">
                    <FaRegCalendar />
                    {formatDate(featuredPost.date.seconds)}
                  </div>
                  <div className="flex items-center gap-1">
                    <FaRegClock />
                    {featuredPost.readingTime} min. de lectura
                  </div>
                </div>

                <button className="btn  btn-secondary btn-sm mt-3">
                  Leer artículo
                  <FaArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <HeaderSection title="Últimas publicaciones" />

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
            <p>No hay publicaciones disponibles.</p>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
