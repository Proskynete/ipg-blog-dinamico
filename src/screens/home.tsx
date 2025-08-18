import { FaArrowRight, FaRegCalendar, FaRegClock } from "react-icons/fa6";
import { Card } from "../components/card.component";
import { HeaderSection } from "../components/header-section.component";
import { Timestamp } from "firebase/firestore";

const Home = () => {
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

  const blogPosts = [
    {
      title: "Finding Beauty in Simplicity",
      excerpt:
        "How to appreciate the small moments and find joy in everyday experiences.",
      date: Timestamp.fromDate(new Date("March 12, 2024")),
      readTime: 3,
      category: "Mindfulness",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/simple-white-flowers-nmRAiyiuuDA1xeGRTMCzZ9amzVzUQi.png",
    },
    {
      title: "Digital Minimalism Guide",
      excerpt:
        "A practical approach to reducing digital clutter and reclaiming your attention.",
      date: Timestamp.fromDate(new Date("March 10, 2024")),
      readTime: 7,
      category: "Technology",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/clean-desk-laptop-FkFZMPXBKyQF0EkE1HnWxQeGQzGMPZ.png",
    },
    {
      title: "Sustainable Living Tips",
      excerpt:
        "Simple changes you can make today to live more sustainably and mindfully.",
      date: Timestamp.fromDate(new Date("March 8, 2024")),
      readTime: 4,
      category: "Environment",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/minimal-pots-plants-81WOoPMJxU384JQ43DYPqyXiTRxDlq.png",
    },
    {
      title: "The Power of Morning Routines",
      excerpt:
        "How a simple morning routine can set the tone for a productive and peaceful day.",
      date: Timestamp.fromDate(new Date("March 5, 2024")),
      readTime: 6,
      category: "Wellness",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/morning-coffee-journal-76CUlA6RGTmvz768TSGvKsPkmIeuUV.png",
    },
    {
      title: "Mindful Consumption",
      excerpt:
        "Learning to buy less but choose better, and how it impacts our well-being.",
      date: Timestamp.fromDate(new Date("March 3, 2024")),
      readTime: 5,
      category: "Lifestyle",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/minimal-wardrobe-hanging-NH1RHzTQ1q14V3sKwN0SQh78ritzrk.png",
    },
    {
      title: "Creating Sacred Spaces",
      excerpt:
        "Transform any corner of your home into a peaceful retreat for reflection.",
      date: Timestamp.fromDate(new Date("March 1, 2024")),
      readTime: 4,
      category: "Home",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/meditation-corner-cushion-EudzNh7GFckgWKsU1TJleiAIh0kdYn.png",
    },
  ];

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
                <span className="badge badge-xs badge-neutral badge-dash">
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
                    {featuredPost.date.toDate().toISOString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <FaRegClock />
                    {featuredPost.readingTime}
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
          {blogPosts.map((post, index) => (
            <Card
              key={index}
              title={post.title}
              description={post.excerpt}
              date={post.date}
              readingTime={post.readTime}
              imageUrl={post.image}
              category={post.category}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
