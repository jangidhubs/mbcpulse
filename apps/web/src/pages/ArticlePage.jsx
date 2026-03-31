
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import pb from '@/lib/pocketbaseClient.js';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ArticleCard from '@/components/ArticleCard.jsx';
import { Input } from '@/components/ui/input';

function ArticlePage() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'Cricket', 'Tech', 'Finance', 'IPL', 'Match Prediction', 'Teams'];

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        let filterStr = '';
        if (activeFilter !== 'All') {
          filterStr = `category = "${activeFilter}"`;
        }
        if (searchTerm) {
          const searchFilter = `title ~ "${searchTerm}"`;
          filterStr = filterStr ? `${filterStr} && ${searchFilter}` : searchFilter;
        }

        const records = await pb.collection('posts').getList(1, 50, {
          sort: '-publishDate',
          filter: filterStr,
          $autoCancel: false
        });
        
        setPosts(records.items);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchPosts();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [activeFilter, searchTerm]);

  return (
    <>
      <Helmet>
        <title>{`Articles - MBC Pulse`}</title>
        <meta name="description" content="Browse all articles from MBC Pulse covering Cricket, Tech, and Finance news for Indian audiences." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          <section className="py-12 bg-secondary">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-8"
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-4">All Articles</h1>
                <p className="text-lg text-secondary-foreground/80">
                  Explore our latest stories and insights
                </p>
              </motion.div>

              <div className="max-w-md mx-auto mb-8 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-background"
                />
              </div>

              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveFilter(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      activeFilter === category
                        ? 'bg-primary text-primary-foreground shadow-md'
                        : 'bg-card text-card-foreground hover:bg-muted'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-6">
                <p className="text-sm text-muted-foreground">
                  Showing {posts.length} {posts.length === 1 ? 'article' : 'articles'}
                </p>
              </div>
              
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-[400px] bg-card rounded-xl animate-pulse"></div>
                  ))}
                </div>
              ) : posts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {posts.map((post, index) => (
                    <ArticleCard key={post.id} article={post} index={index} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <h3 className="text-2xl font-semibold mb-2">No articles found</h3>
                  <p className="text-muted-foreground">Try adjusting your search or filters.</p>
                </div>
              )}
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default ArticlePage;
