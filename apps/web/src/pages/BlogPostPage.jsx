
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react';
import pb from '@/lib/pocketbaseClient.js';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ArticleCard from '@/components/ArticleCard.jsx';

function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        // Try to fetch by slug first
        let record;
        try {
          const records = await pb.collection('posts').getList(1, 1, {
            filter: `slug = "${slug}"`,
            $autoCancel: false
          });
          if (records.items.length > 0) {
            record = records.items[0];
          } else {
            // Fallback to ID if slug not found (for backward compatibility)
            record = await pb.collection('posts').getOne(slug, { $autoCancel: false });
          }
        } catch (e) {
          record = await pb.collection('posts').getOne(slug, { $autoCancel: false });
        }

        setPost(record);

        // Increment views
        await pb.collection('posts').update(record.id, {
          views: (record.views || 0) + 1
        }, { $autoCancel: false });

        // Fetch related posts
        if (record.category) {
          const related = await pb.collection('posts').getList(1, 3, {
            filter: `category = "${record.category}" && id != "${record.id}"`,
            sort: '-created',
            $autoCancel: false
          });
          setRelatedPosts(related.items);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
    window.scrollTo(0, 0);
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-64 bg-muted rounded mb-4"></div>
            <div className="h-4 w-32 bg-muted rounded"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist or has been removed.</p>
          <Link to="/blog" className="text-primary hover:underline flex items-center">
            <ArrowLeft size={16} className="mr-2" /> Back to Blog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const imageUrl = post.coverImage 
    ? pb.files.getUrl(post, post.coverImage) 
    : 'https://images.unsplash.com/photo-1681749140155-784fe0ddff30';

  return (
    <>
      <Helmet>
        <title>{`${post.metaTitle || post.title} - MBC Pulse`}</title>
        <meta name="description" content={post.metaDescription || post.excerpt} />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Link to="/blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
              <ArrowLeft size={16} className="mr-2" /> Back to articles
            </Link>

            <header className="mb-10 text-center">
              <div className="mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                  {post.category}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight text-balance">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <User size={16} className="mr-2" />
                  {post.author || 'MBC Pulse Team'}
                </div>
                <div className="flex items-center">
                  <Calendar size={16} className="mr-2" />
                  {new Date(post.publishDate || post.created).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
                <div className="flex items-center">
                  <Clock size={16} className="mr-2" />
                  {post.readTime || 5} min read
                </div>
              </div>
            </header>

            <div className="aspect-video w-full rounded-2xl overflow-hidden mb-12 bg-muted">
              <img
                src={imageUrl}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div 
              className="prose prose-invert prose-lg max-w-none mb-12 prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary/80"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {post.tags && (
              <div className="flex flex-wrap gap-2 pt-8 border-t border-border">
                <span className="text-sm font-medium text-muted-foreground mr-2 py-1">Tags:</span>
                {post.tags.split(',').map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
                    {tag.trim()}
                  </span>
                ))}
              </div>
            )}
          </article>

          {relatedPosts.length > 0 && (
            <section className="bg-secondary py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold mb-8">Related Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {relatedPosts.map((relatedPost, index) => (
                    <ArticleCard key={relatedPost.id} article={relatedPost} index={index} />
                  ))}
                </div>
              </div>
            </section>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
}

export default BlogPostPage;
