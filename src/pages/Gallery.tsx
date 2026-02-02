import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, ChevronLeft, ChevronRight, Image as ImageIcon, Heart, MessageCircle, Share2, Bookmark } from 'lucide-react';
import ThreeBackground from '../components/ThreeBackground';

interface GalleryItem {
  id: number;
  type: 'video' | 'image';
  category: 'posts' | 'internship' | 'webdesign' | 'marketing';
  title: string;
  description: string;
  thumbnail: string;
  src: string;
  likes?: number;
  comments?: number;
}

const galleryItems: GalleryItem[] = [
  // POSTS
  {
    id: 1,
    type: 'video',
    category: 'posts',
    title: "Logo Reveal ",
    description: "Excited to announce our Company Logo Reveal! 🚀 #designdelivergrow #webdevelopment",
    thumbnail: "/assets/home-banner-5.jpg",
    src: "/assets/video.mp4",
    likes: 234,
    comments: 45
  },
  {
    id: 2,
    type: 'video',
    category: 'posts',
    title: "Team Achievement",
    description: "Proud of our team for hitting this milestone! 🎉",
    thumbnail: "/assets/video1.png",
    src: "/assets/video1.mp4",
    likes: 189,
    comments: 32
  },
  {
    id: 3,
    type: 'video',
    category: 'posts',
    title: "Behind the Scenes",
    description: "A peek into our creative process ✨",
    thumbnail: "/assets/video2.png",
    src: "/assets/video2.mp4",
    likes: 156,
    comments: 28
  },

  // INTERNSHIP
  {
    id: 4,
    type: 'image',
    category: 'internship',
    title: "Internship Program 2026",
    description: "Join our internship program and gain hands-on experience! #internship #careergrowth",
    thumbnail: "/assets/pavan1.png",
    src: "/assets/pavan1.png",
    likes: 456,
    comments: 78
  },
  {
    id: 5,
    type: 'image',
    category: 'internship',
    title: "Intern Success Story",
    description: "Meet Sarah, our star intern who converted to a full-time role! 👩‍💻",
    thumbnail: "/assets//home-banner-11.jpg",
    src: "/assets/home-banner-11.jpg",
    likes: 321,
    comments: 56
  },
  {
    id: 6,
    type: 'video',
    category: 'internship',
    title: "What Interns Learn",
    description: "A glimpse into the learning journey at DDG 📚",
    thumbnail: "/assets/home-banner-5.jpg",
    src: "/assets/video.mp4",
    likes: 167,
    comments: 23
  },

  // WEB DESIGN
  {
    id: 7,
    type: 'video',
    category: 'webdesign',
    title: "Web Design Showcase",
    description: "Check out our latest responsive web designs! 🎨 #webdesign #uiux",
    thumbnail: "/assets/web-design1.png",
    src: "/assets/web-video.mp4",
    likes: 289,
    comments: 41
  },
  {
    id: 8,
    type: 'image',
    category: 'webdesign',
    title: "E-Commerce Redesign",
    description: "Fresh new look for a major e-commerce client 🛒",
    thumbnail: "/assets/home-banner-6.jpg",
    src: "/home-banner-6.jpg",
    likes: 234,
    comments: 38
  },
  {
    id: 9,
    type: 'image',
    category: 'webdesign',
    title: "UI Animation Techniques",
    description: "Learn how we create smooth animations for better UX ✨",
    thumbnail: "/assets/home-banner-11.jpg",
    src: "/assets/video.mp4",
    likes: 178,
    comments: 29
  },

  // MARKETING
  {
    id: 10,
    type: 'video',
    category: 'marketing',
    title: "Social Media Strategy",
    description: "How we helped a client grow 300% in 3 months! 📈 #digitalmarketing",
    thumbnail: "/assets/mt-photo1.png",
    src: "/assets/mt-video5.mp4",
    likes: 345,
    comments: 52
  },
  {
    id: 11,
    type: 'image',
    category: 'marketing',
    title: "Campaign Results",
    description: "Amazing feedback from our latest marketing campaign! 🎯",
    thumbnail: "/assets/home-banner-11.jpg",
    src: "/assets/home-banner-11.jpg",
    likes: 267,
    comments: 44
  },
  {
    id: 12,
    type: 'video',
    category: 'marketing',
    title: "Content Creation Tips",
    description: "Secrets to creating engaging content that converts 💡",
    thumbnail: "/assets/home-banner-5.jpg",
    src: "/assets/video.mp4",
    likes: 198,
    comments: 31
  }
];

const categories = [
  { id: 'posts', label: 'Posts' },
  { id: 'internship', label: 'Internship' },
  { id: 'webdesign', label: 'Web Design' },
  { id: 'marketing', label: 'Marketing' }
] as const;

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState<typeof categories[number]['id']>('posts');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredItems = galleryItems.filter(item => item.category === activeCategory);

  const openItem = (item: GalleryItem) => {
    setSelectedItem(item);
    setCurrentIndex(filteredItems.findIndex(i => i.id === item.id));
  };

  const closeItem = () => {
    setSelectedItem(null);
  };

  const navigateItem = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentIndex(prev => (prev > 0 ? prev - 1 : filteredItems.length - 1));
    } else {
      setCurrentIndex(prev => (prev < filteredItems.length - 1 ? prev + 1 : 0));
    }
    setSelectedItem(filteredItems[currentIndex]);
  };

  return (
    <>
      <ThreeBackground />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                Our Gallery
              </h1>
              <p className="text-lg sm:text-xl text-black-300 max-w-3xl mx-auto">
                Explore videos and images from our projects, internship program, web design work, and marketing campaigns
              </p>
            </motion.div>

            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                      : 'bg-white/10 text-black-300 hover:bg-white/20'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* Gallery Grid - Instagram Style */}
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="cursor-pointer group"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onClick={() => openItem(item)}
                >
                  {/* Instagram-style Post Card */}
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    {/* Header with avatar and username */}
                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 p-[2px]">
                          <img 
                            src="/logo/android-chrome-192x192.png" 
                            alt="DDG" 
                            className="w-full h-full rounded-full object-cover bg-white"
                          />
                        </div>
                        <span className="font-semibold text-sm text-gray-900">designdelivergrow</span>
                      </div>
                      <button className="text-gray-500 hover:text-gray-700">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="1.5" />
                          <circle cx="6" cy="12" r="1.5" />
                          <circle cx="18" cy="12" r="1.5" />
                        </svg>
                      </button>
                    </div>

                    {/* Media - Square aspect ratio 1:1 (1080x1080px) */}
                    <div className="relative w-full pt-[100%] overflow-hidden bg-gray-100">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {item.type === 'video' && (
                        <div className="absolute top-3 right-3">
                          <div className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center">
                            <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-4">
                          <button className="text-gray-700 hover:text-red-500 transition-colors">
                            <Heart className="w-6 h-6" />
                          </button>
                          <button className="text-gray-700 hover:text-blue-500 transition-colors">
                            <MessageCircle className="w-6 h-6" />
                          </button>
                          <button className="text-gray-700 hover:text-green-500 transition-colors">
                            <Share2 className="w-6 h-6" />
                          </button>
                        </div>
                        <button className="text-gray-700 hover:text-yellow-500 transition-colors">
                          <Bookmark className="w-6 h-6" />
                        </button>
                      </div>

                      <p className="text-sm font-semibold text-gray-900 mb-1">
                        {item.likes?.toLocaleString()} likes
                      </p>

                      <div className="mb-2">
                        <span className="font-semibold text-sm text-gray-900 mr-2">designdelivergrow</span>
                        <span className="text-sm text-gray-700">{item.description}</span>
                      </div>

                      <button className="text-gray-500 text-sm hover:text-gray-700">
                        View all {item.comments} comments
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Modal for Video/Image */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeItem}
            >
              <button
                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                onClick={closeItem}
              >
                <X className="w-6 h-6 text-white" />
              </button>

              <button
                className="absolute left-4 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                onClick={(e) => { e.stopPropagation(); navigateItem('prev'); }}
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                className="absolute right-4 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                onClick={(e) => { e.stopPropagation(); navigateItem('next'); }}
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>

              <motion.div
                className="relative w-full max-w-3xl"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
              >
                {filteredItems[currentIndex].type === 'video' ? (
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <video
                      className="w-full aspect-video"
                      controls
                      autoPlay
                      src={filteredItems[currentIndex].src}
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                ) : (
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src={filteredItems[currentIndex].src}
                      alt={filteredItems[currentIndex].title}
                      className="w-full h-auto"
                    />
                  </div>
                )}

                <div className="mt-6 text-center">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {filteredItems[currentIndex].title}
                  </h2>
                  <p className="text-gray-400 max-w-2xl mx-auto">
                    {filteredItems[currentIndex].description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Gallery;
