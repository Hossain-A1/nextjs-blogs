import BlogDetails from "@/components/BlogDetails";
import { server_url } from "@/secret/secret";

export const generateMetadata = ({ params }) => {
  return { title: `Tech-Blog - Blog -` + params?.slug };
};

const BlogPage = async ({ params }) => {
  const res = await fetch(`${server_url}/api/blog/${params.slug}`);
  const data = await res.json();

  return <BlogDetails blog={data.payload} />;
};

export default BlogPage;
