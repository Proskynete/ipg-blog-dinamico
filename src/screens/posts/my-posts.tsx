import { FaPlus } from "react-icons/fa6";
import { HeaderSection } from "../../components/header-section.component";
import { Card } from "../../components/card.component";
import type { Post } from "../../modules/post/domain/post.domain";
import { useNavigate } from "react-router";

const MyPosts = () => {
  const navigate = useNavigate();

  const blogPosts: Post[] = [
    // {
    //   title: "Finding Beauty in Simplicity",
    //   excerpt:
    //     "How to appreciate the small moments and find joy in everyday experiences.",
    //   date: "March 12, 2024",
    //   readTime: "3 min read",
    //   category: ["Mindfulness"],
    //   image:
    //     "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/simple-white-flowers-nmRAiyiuuDA1xeGRTMCzZ9amzVzUQi.png",
    // },
    // {
    //   title: "Digital Minimalism Guide",
    //   excerpt:
    //     "A practical approach to reducing digital clutter and reclaiming your attention.",
    //   date: "March 10, 2024",
    //   readTime: "7 min read",
    //   category: ["Technology"],
    //   image:
    //     "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/clean-desk-laptop-FkFZMPXBKyQF0EkE1HnWxQeGQzGMPZ.png",
    // },
    // {
    //   title: "Sustainable Living Tips",
    //   excerpt:
    //     "Simple changes you can make today to live more sustainably and mindfully.",
    //   date: "March 8, 2024",
    //   readTime: "4 min read",
    //   category: ["Environment"],
    //   image:
    //     "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/minimal-pots-plants-81WOoPMJxU384JQ43DYPqyXiTRxDlq.png",
    // },
    // {
    //   title: "The Power of Morning Routines",
    //   excerpt:
    //     "How a simple morning routine can set the tone for a productive and peaceful day.",
    //   date: "March 5, 2024",
    //   readTime: "6 min read",
    //   category: ["Wellness", "Technology"],
    //   image:
    //     "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/morning-coffee-journal-76CUlA6RGTmvz768TSGvKsPkmIeuUV.png",
    // },
    // {
    //   title: "Mindful Consumption",
    //   excerpt:
    //     "Learning to buy less but choose better, and how it impacts our well-being.",
    //   date: "March 3, 2024",
    //   readTime: "5 min read",
    //   category: ["Lifestyle"],
    //   image:
    //     "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/minimal-wardrobe-hanging-NH1RHzTQ1q14V3sKwN0SQh78ritzrk.png",
    // },
    // {
    //   title: "Creating Sacred Spaces",
    //   excerpt:
    //     "Transform any corner of your home into a peaceful retreat for reflection.",
    //   date: "March 1, 2024",
    //   readTime: "4 min read",
    //   category: ["Home"],
    //   image:
    //     "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/meditation-corner-cushion-EudzNh7GFckgWKsU1TJleiAIh0kdYn.png",
    // },
  ];

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
        {blogPosts.length > 0 ? (
          blogPosts.map((post, index) => (
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
