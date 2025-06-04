import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const BlogPost = () => {
  const { slug } = useParams();
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`/blog/${slug}.md`);
        const text = await response.text();
        setContent(text);
      } catch (error) {
        console.error('Error loading blog post:', error);
      }
    };

    fetchContent();
  }, [slug]);

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="prose prose-lg prose-purple mx-auto" style={{ maxWidth: '95ch' }}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </article>
    </div>
  );
};

export default BlogPost;