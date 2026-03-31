import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import pb from '@/lib/pocketbaseClient.js';

function ArticleCard({ article, index = 0 }) {
  const getCategoryColor = (category) => {
    switch (category) {
      case 'Cricket':
      case 'IPL':
      case 'Match Prediction':
      case 'Teams':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Tech':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'Finance':
        return 'bg-green-500/10 text-green-400 border-green-500/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const imageUrl = article.coverImage 
    ? pb.files.getUrl(article, article.coverImage) 
    : article.thumbnail || 'https://images.unsplash.com/photo-1681749140155-784fe0ddff30';

  const date = article.publishDate || article.created || article.date;
  const readTime = article.readTime ? `${article.readTime} min read` : article.readTimeStr || '5 min read';

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
    >
      <Link to={`/blog/${article.slug || article.id}`} className="block flex-1 flex flex-col">
        <div className="aspect-video overflow-hidden bg-muted">
          <img
            src={imageUrl}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-center justify-between mb-3">
            <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getCategoryColor(article.category)}`}>
              {article.category}
            </span>
            <div className="flex items-center space-x-3 text-xs text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Calendar size={14} />
                <span>{new Date(date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock size={14} />
                <span>{readTime}</span>
              </div>
            </div>
          </div>
          <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors duration-200 line-clamp-2">
            {article.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-auto">
            {article.excerpt}
          </p>
        </div>
      </Link>
    </motion.article>
  );
}

export default ArticleCard;