
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';
import pb from '@/lib/pocketbaseClient.js';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ArticleCard from '@/components/ArticleCard.jsx';

function TechPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const tabs = ['All', 'Data Analytics', 'Web Development', 'Digital Marketing'];

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const records = await pb.collection('posts').getFullList({
          filter: 'category = "Tech"',
          sort: '-created',
          $autoCancel: false
        });
        setPosts(records);
      } catch (error) {
        console.error('Error fetching tech posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const getFilteredArticles = () => {
    if (activeTab === 'All') return posts;
    
    return posts.filter(article => {
      const searchStr = `${article.title} ${article.tags || ''}`.toLowerCase();
      if (activeTab === 'Data Analytics') return searchStr.includes('data') || searchStr.includes('analytics') || searchStr.includes('ai');
      if (activeTab === 'Web Development') return searchStr.includes('web') || searchStr.includes('react') || searchStr.includes('dev');
      if (activeTab === 'Digital Marketing') return searchStr.includes('marketing') || searchStr.includes('social') || searchStr.includes('seo');
      return true;
    });
  };

  const filteredArticles = getFilteredArticles();

  return (
    <>
      <Helmet>
        <title>{`Tech News - MBC Pulse`}</title>
        <meta name="description" content="Latest technology news, startup updates, web development trends, data analytics insights, and digital marketing strategies from MBC Pulse." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          <section className="py-20 bg-gradient-to-br from-purple-500/10 via-background to-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-center"
              >
                <div className="inline-flex p-4 bg-purple-500/10 rounded-full mb-6">
                  <Cpu size={48} className="text-purple-400" />
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight" style={{ letterSpacing: '-0.02em' }}>
                  Technology & Innovation
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Explore the latest in tech startups, web development, data analytics, and digital marketing
                </p>
              </motion.div>
            </div>
          </section>

          <section className="py-12 bg-secondary">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-wrap gap-4 mb-8">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                      activeTab === tab
                        ? 'bg-primary text-primary-foreground shadow-lg'
                        : 'bg-card text-card-foreground hover:bg-muted'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="mb-6">
                <p className="text-sm text-secondary-foreground/80">
                  Showing {filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'}
                </p>
              </div>

              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[...Array(6)].map((_, i) => <div key={i} className="h-[400px] bg-card rounded-xl animate-pulse"></div>)}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredArticles.map((article, index) => (
                    <ArticleCard key={article.id} article={article} index={index} />
                  ))}
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

export default TechPage;
