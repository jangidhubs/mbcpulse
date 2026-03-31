import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Youtube } from 'lucide-react';

function Footer() {
  const currentYear = new Date().getFullYear();
  const footerLinks = [
    { name: 'Home', path: '/' },
    { name: 'Article', path: '/article' },
    { name: 'Blog', path: '/blog' },
    { name: 'Cricket', path: '/cricket' },
    { name: 'Tech', path: '/tech' },
    { name: 'Finance', path: '/finance' },
    { name: 'About Us', path: '/about' }
  ];

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'YouTube' }
  ];

  return (
    <footer className="bg-card text-card-foreground border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="text-2xl font-bold mb-4">
              <span className="text-primary">MBC</span>
              <span> PULSE</span>
            </div>
            <p className="text-sm text-card-foreground/80 max-w-xs">
              India's digital media hub. Fast, accurate, and built for the Indian audience.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <nav className="space-y-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block text-sm text-card-foreground/80 hover:text-primary transition-all duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="p-2 bg-secondary rounded-lg text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-card-foreground/60">
              © {currentYear} MBC Pulse. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="#" className="text-sm text-card-foreground/60 hover:text-primary transition-all duration-200">
                Privacy Policy
              </Link>
              <Link to="#" className="text-sm text-card-foreground/60 hover:text-primary transition-all duration-200">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;