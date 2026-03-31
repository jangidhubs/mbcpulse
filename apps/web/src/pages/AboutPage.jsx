import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

function AboutPage() {
  const teamMembers = [
    {
      name: 'Ratish Itkar',
      role: 'Editor-in-Chief',
      initials: 'RI',
      bgColor: 'bg-blue-500'
    },
    {
      name: 'Rahul Sakaria',
      role: 'Tech Lead',
      initials: 'RS',
      bgColor: 'bg-purple-500'
    },
    {
      name: 'Gaurav Sharma',
      role: 'Sports Editor',
      initials: 'GS',
      bgColor: 'bg-green-500'
    },
    {
      name: 'Deepak Jangid',
      role: 'Finance Editor',
      initials: 'SP',
      bgColor: 'bg-orange-500'
    },
    {
      name: 'Tarun Sakaria',
      role: 'Editor',
      initials: 'TP',
      bgColor: 'bg-red-500'
    }
  ];

  return (
    <>
      <Helmet>
        <title>{`About Us - MBC Pulse`}</title>
        <meta name="description" content="Learn about MBC Pulse - India's digital media hub delivering fast, accurate news on Cricket, Tech, and Finance for Indian audiences." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          <section className="py-20 bg-secondary">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-center max-w-3xl mx-auto"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight" style={{ letterSpacing: '-0.02em' }}>
                  About MBC Pulse
                </h1>
                <p className="text-xl text-secondary-foreground/80 leading-relaxed">
                  India ka digital media hub delivering fast, accurate news tailored for Indian audiences
                </p>
              </motion.div>
            </div>
          </section>

          <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7 }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    At MBC Pulse, we believe in delivering news that matters to Indian audiences. Our mission is simple: <strong className="text-foreground">Fast, Accurate aur Indian Audience ke liye</strong>.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    We cover three core areas that impact daily lives - Cricket, Technology, and Finance. From IPL updates to startup news, from stock market analysis to personal finance tips, we bring you stories that resonate with your interests and aspirations.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Our team of dedicated journalists and editors work around the clock to ensure you stay informed, engaged, and ahead of the curve.
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7 }}
                  className="bg-card rounded-2xl p-8 border border-border"
                >
                  <h3 className="text-2xl font-bold mb-6">What We Stand For</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <p className="text-muted-foreground"><strong className="text-foreground">Accuracy:</strong> Every story is fact-checked and verified before publication</p>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <p className="text-muted-foreground"><strong className="text-foreground">Speed:</strong> Breaking news delivered as it happens, keeping you updated in real-time</p>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <p className="text-muted-foreground"><strong className="text-foreground">Relevance:</strong> Content tailored specifically for Indian readers and their interests</p>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <p className="text-muted-foreground"><strong className="text-foreground">Integrity:</strong> Unbiased reporting with transparency at our core</p>
                    </li>
                  </ul>
                </motion.div>
              </div>
            </div>
          </section>

          <section className="py-20 bg-secondary">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
                <p className="text-lg text-secondary-foreground/80">The people behind MBC Pulse</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {teamMembers.map((member, index) => (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className={`w-24 h-24 ${member.bgColor} rounded-xl mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold`}>
                      {member.initials}
                    </div>
                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                    <p className="text-sm text-secondary-foreground/80">{member.role}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h2>
                <p className="text-lg text-muted-foreground">We'd love to hear from you</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="bg-card rounded-xl p-6 border border-border text-center">
                  <div className="inline-flex p-3 bg-primary/10 rounded-full mb-4">
                    <Mail size={24} className="text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Email</h3>
                  <p className="text-sm text-muted-foreground">contact@mbcpulse.in</p>
                </div>
                <div className="bg-card rounded-xl p-6 border border-border text-center">
                  <div className="inline-flex p-3 bg-primary/10 rounded-full mb-4">
                    <Phone size={24} className="text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Phone</h3>
                  <p className="text-sm text-muted-foreground">+91 98765 43210</p>
                </div>
                <div className="bg-card rounded-xl p-6 border border-border text-center">
                  <div className="inline-flex p-3 bg-primary/10 rounded-full mb-4">
                    <MapPin size={24} className="text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Location</h3>
                  <p className="text-sm text-muted-foreground">Mumbai, India</p>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default AboutPage;