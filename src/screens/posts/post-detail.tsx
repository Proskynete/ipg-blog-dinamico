import { useParams } from "react-router";
import { QUERY } from "../../constants/query-keys.constant";
import { useQuery } from "@tanstack/react-query";
import { postRepository } from "../../modules/post/infrastructure/services/create-post.service";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const PostDetail = () => {
  const { slug } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: [QUERY.posts.getBySlug],
    queryFn: () => postRepository.getBySlug(slug!),
    enabled: !!slug,
  });

  return isLoading ? (
    "Cargando..."
  ) : (
    <>
      <title>{data?.title} - Blog Dinámico</title>
      <meta name="description" content={data?.excerpt} />

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 mb-1">
            <span className="badge badge-xs badge-neutral badge-dash capitalize">
              {data?.category}
            </span>
          </div>

          <h1 className="text-5xl font-bold uppercase">{data?.title}</h1>

          <div className="relative h-64 md:h-full mt-7">
            <img
              src={data?.image || "/placeholder.svg"}
              alt={data?.title}
              className="object-cover w-full rounded-3xl"
            />
          </div>

          <div id="articleBody" className="p-1 mt-7">
            <Markdown remarkPlugins={[remarkGfm]}>{data?.content}</Markdown>
          </div>
        </div>
      </section>
    </>
  );
};

export default PostDetail;
