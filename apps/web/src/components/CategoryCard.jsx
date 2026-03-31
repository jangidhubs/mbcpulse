import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

function CategoryCard({ category, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        to={category.path}
        className="block group bg-card rounded-2xl p-8 border border-border hover:shadow-lg hover:border-primary/50 transition-all duration-300"
      >
        <div className={`inline-flex p-4 rounded-xl mb-4 ${category.bgColor}`}>
          <category.icon size={32} className={category.iconColor} />
        </div>
        <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors duration-200">
          {category.name}
        </h3>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          {category.description}
        </p>
        <div className="flex items-center text-sm font-medium text-primary group-hover:translate-x-2 transition-transform duration-200">
          <span>Explore {category.name}</span>
          <ArrowRight size={16} className="ml-2" />
        </div>
      </Link>
    </motion.div>
  );
}

export default CategoryCard;