
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Trophy, Cpu, TrendingUp, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import pb from '@/lib/pocketbaseClient.js';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import BreakingNewsTicker from '@/components/BreakingNewsTicker.jsx';
import ArticleCard from '@/components/ArticleCard.jsx';
import CategoryCard from '@/components/CategoryCard.jsx';
import NewsletterSignup from '@/components/NewsletterSignup.jsx';

function HomePage() {
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const [latestArticles, setLatestArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [featured, latest] = await Promise.all([
          pb.collection('posts').getList(1, 6, {
            filter: 'featured = true',
            sort: '-publishDate',
            $autoCancel: false
          }),
          pb.collection('posts').getList(1, 5, {
            sort: '-publishDate',
            $autoCancel: false
          })
        ]);
        
        setFeaturedArticles(featured.items);
        setLatestArticles(latest.items);
      } catch (error) {
        console.error('Error fetching home data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  const categories = [{
    name: 'Cricket',
    path: '/cricket',
    icon: Trophy,
    bgColor: 'bg-blue-500/10',
    iconColor: 'text-blue-400',
    description: 'Latest cricket news, match updates, IPL coverage, and player statistics from around the world'
  }, {
    name: 'Tech',
    path: '/tech',
    icon: Cpu,
    bgColor: 'bg-purple-500/10',
    iconColor: 'text-purple-400',
    description: 'Technology trends, startup news, digital marketing insights, and web development updates'
  }, {
    name: 'Finance',
    path: '/finance',
    icon: TrendingUp,
    bgColor: 'bg-green-500/10',
    iconColor: 'text-green-400',
    description: 'Stock market analysis, personal finance tips, mutual fund insights, and economic updates'
  }];

  return <>
      <Helmet>
        <title>MBC Pulse - India Ka Digital Media Hub</title>
        <meta name="description" content="Fast, accurate news on Cricket, Tech, and Finance for Indian audiences. Stay updated with breaking news and in-depth analysis." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        <BreakingNewsTicker />

        <main className="flex-1">
          <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0">
              <img src="https://images.unsplash.com/photo-1681749140155-784fe0ddff30" alt="India Ka Digital Media Hub" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60"></div>
            </div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
              <motion.div initial={{
              opacity: 0,
              y: 30
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.7
            }} className="max-w-3xl">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight" style={{
                letterSpacing: '-0.02em'
              }}>
                  India's Digital Media Hub
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed max-w-2xl">
                  Fast, accurate, and made for the Indian audience. Get the latest updates on Cricket, Tech, and Finance.
                </p>
                <Link to="/blog" className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 active:scale-[0.98] transition-all duration-200">
                  Explore Articles
                  <ArrowRight size={20} className="ml-2" />
                </Link>
              </motion.div>
            </div>
          </section>

          <section className="py-20 bg-secondary">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Articles</h2>
                <p className="text-lg text-secondary-foreground/80">Top stories from across our categories</p>
              </div>
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[...Array(6)].map((_, i) => <div key={i} className="h-[400px] bg-card rounded-xl animate-pulse"></div>)}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {featuredArticles.map((article, index) => <ArticleCard key={article.id} article={article} index={index} />)}
                </div>
              )}
            </div>
          </section>

          <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Categories</h2>
                <p className="text-lg text-muted-foreground">Dive into your favorite topics</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {categories.map((category, index) => <CategoryCard key={category.name} category={category} index={index} />)}
              </div>
            </div>
          </section>

          <section className="py-20 bg-secondary">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-2">Latest Articles</h2>
                  <p className="text-lg text-secondary-foreground/80">Fresh content updated daily</p>
                </div>
                <Link to="/blog" className="hidden md:inline-flex items-center text-primary font-medium hover:translate-x-2 transition-transform duration-200">
                  View All
                  <ArrowRight size={20} className="ml-2" />
                </Link>
              </div>
              
              {isLoading ? (
                <div className="space-y-6">
                  {[...Array(5)].map((_, i) => <div key={i} className="h-32 bg-card rounded-xl animate-pulse"></div>)}
                </div>
              ) : (
                <div className="space-y-6">
                  {latestArticles.map((article, index) => {
                    const imageUrl = article.coverImage ? pb.files.getUrl(article, article.coverImage) : 'https://images.unsplash.com/photo-1681749140155-784fe0ddff30';
                    return (
                    <motion.div key={article.id} initial={{
                    opacity: 0,
                    x: -20
                  }} animate={{
                    opacity: 1,
                    x: 0
                  }} transition={{
                    duration: 0.5,
                    delay: index * 0.1
                  }} className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-all duration-300">
                        <Link to={`/blog/${article.slug || article.id}`} className="flex flex-col md:flex-row gap-6">
                          <div className="md:w-48 flex-shrink-0">
                            <img src={imageUrl} alt={article.title} className="w-full h-32 md:h-full object-cover rounded-lg" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-3">
                              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${['Cricket', 'IPL', 'Teams'].includes(article.category) ? 'bg-blue-500/10 text-blue-400' : article.category === 'Tech' ? 'bg-purple-500/10 text-purple-400' : 'bg-green-500/10 text-green-400'}`}>
                                {article.category}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {new Date(article.publishDate || article.created).toLocaleDateString('en-IN', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                              </span>
                              <span className="text-xs text-muted-foreground">{article.readTime || 5} min read</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2 hover:text-primary transition-colors duration-200">
                              {article.title}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {article.excerpt}
                            </p>
                          </div>
                        </Link>
                      </motion.div>
                    )
                  })}
                </div>
              )}
              <div className="mt-8 text-center md:hidden">
                <Link to="/blog" className="inline-flex items-center text-primary font-medium">
                  View All Articles
                  <ArrowRight size={20} className="ml-2" />
                </Link>
              </div>
            </div>
          </section>

          <NewsletterSignup />
        </main>

        <Footer />
      </div>
    </>;
}
export default HomePage;
