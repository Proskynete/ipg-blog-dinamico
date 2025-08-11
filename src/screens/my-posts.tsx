import { useEffect } from "react";
import { Card } from "../components/card.component";
import { Title } from "../components/title.component";
import { useAuth } from "../modules/auth/infrastructure/ui/hooks/useAuth";
import { useNavigate } from "react-router";

const MyPosts = () => {
  const { state } = useAuth();
  const navigate = useNavigate();

  const blogPosts = [
    {
      title: "Finding Beauty in Simplicity",
      excerpt:
        "How to appreciate the small moments and find joy in everyday experiences.",
      date: "March 12, 2024",
      readTime: "3 min read",
      category: ["Mindfulness"],
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/simple-white-flowers-nmRAiyiuuDA1xeGRTMCzZ9amzVzUQi.png",
    },
    {
      title: "Digital Minimalism Guide",
      excerpt:
        "A practical approach to reducing digital clutter and reclaiming your attention.",
      date: "March 10, 2024",
      readTime: "7 min read",
      category: ["Technology"],
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/clean-desk-laptop-FkFZMPXBKyQF0EkE1HnWxQeGQzGMPZ.png",
    },
    {
      title: "Sustainable Living Tips",
      excerpt:
        "Simple changes you can make today to live more sustainably and mindfully.",
      date: "March 8, 2024",
      readTime: "4 min read",
      category: ["Environment"],
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/minimal-pots-plants-81WOoPMJxU384JQ43DYPqyXiTRxDlq.png",
    },
    {
      title: "The Power of Morning Routines",
      excerpt:
        "How a simple morning routine can set the tone for a productive and peaceful day.",
      date: "March 5, 2024",
      readTime: "6 min read",
      category: ["Wellness", "Technology"],
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/morning-coffee-journal-76CUlA6RGTmvz768TSGvKsPkmIeuUV.png",
    },
    {
      title: "Mindful Consumption",
      excerpt:
        "Learning to buy less but choose better, and how it impacts our well-being.",
      date: "March 3, 2024",
      readTime: "5 min read",
      category: ["Lifestyle"],
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/minimal-wardrobe-hanging-NH1RHzTQ1q14V3sKwN0SQh78ritzrk.png",
    },
    {
      title: "Creating Sacred Spaces",
      excerpt:
        "Transform any corner of your home into a peaceful retreat for reflection.",
      date: "March 1, 2024",
      readTime: "4 min read",
      category: ["Home"],
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/meditation-corner-cushion-EudzNh7GFckgWKsU1TJleiAIh0kdYn.png",
    },
  ];

  useEffect(() => {
    console.log(state.state);
    if (state.state === "SIGNED_OUT") {
      navigate("/");
    }
  }, [state.state, navigate]);

  return (
    <section className="py-16">
      <Title title="Mis publicaciones" />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post, index) => (
          <Card
            key={index}
            title={post.title}
            description={post.excerpt}
            date={post.date}
            readingTime={post.readTime}
            imageUrl={post.image}
            categories={post.category}
          />
        ))}
      </div>
    </section>
  );
};

export default MyPosts;
