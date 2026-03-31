
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import pb from '@/lib/pocketbaseClient.js';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ArticleCard from '@/components/ArticleCard.jsx';

function CricketPage() {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [otherPosts, setOtherPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const records = await pb.collection('posts').getFullList({
          filter: 'category = "Cricket" || category = "IPL" || category = "Match Prediction" || category = "Teams"',
          sort: '-created',
          $autoCancel: false
        });
        
        setFeaturedPosts(records.slice(0, 3));
        setOtherPosts(records.slice(3));
      } catch (error) {
        console.error('Error fetching cricket posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <Helmet>
        <title>{`Cricket News - MBC Pulse`}</title>
        <meta name="description" content="Latest cricket news, IPL updates, match previews, player statistics, and in-depth analysis from MBC Pulse." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          <section className="py-20 bg-gradient-to-br from-blue-500/10 via-background to-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-center"
              >
                <div className="inline-flex p-4 bg-blue-500/10 rounded-full mb-6">
                  <Trophy size={48} className="text-blue-400" />
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight" style={{ letterSpacing: '-0.02em' }}>
                  Cricket News & Updates
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Stay updated with the latest cricket news, IPL coverage, match previews, and player statistics
                </p>
              </motion.div>
            </div>
          </section>

          <section className="py-12 bg-secondary">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold mb-8">Featured Cricket Stories</h2>
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[...Array(3)].map((_, i) => <div key={i} className="h-[400px] bg-card rounded-xl animate-pulse"></div>)}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {featuredPosts.map((article, index) => (
                    <ArticleCard key={article.id} article={article} index={index} />
                  ))}
                </div>
              )}
            </div>
          </section>

          <section className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold mb-8">More Updates</h2>
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[...Array(4)].map((_, i) => <div key={i} className="h-[400px] bg-card rounded-xl animate-pulse"></div>)}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {otherPosts.map((article, index) => (
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

export default CricketPage;
