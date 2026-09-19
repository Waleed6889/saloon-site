import React, { useState } from 'react';
import { Camera, Maximize2, X, Sparkles, Scissors, ArrowRight } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/salonData';
import { GalleryItem } from '../types';

interface GallerySectionProps {
  onBookStyle: () => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onBookStyle }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  const categories = [
    { key: 'all', label: 'All Showcase (8)' },
    { key: 'fades', label: 'Skin & Taper Fades' },
    { key: 'beards', label: 'Beard Sculpting' },
    { key: 'textures', label: 'Modern Textures' },
    { key: 'lounge', label: 'Salon Atmosphere' },
    { key: 'craft', label: 'Artisan Shears' },
  ];

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  return (
    <section id="gallery" className="relative py-20 lg:py-28 bg-[#0b0c10] border-t border-[#181a24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#181b24] border border-[#272c3b] text-xs font-semibold text-[#d4a373] uppercase tracking-wider mb-4">
            <Camera className="w-3.5 h-3.5 text-[#d4a373]" />
            <span>Visual Portfolio</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            The Craft on Display
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#9ea4b5] leading-relaxed">
            Real cuts, authentic fades, and genuine salon moments captured in our Soho studio. Tap any photo to inspect the precision.
          </p>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  activeCategory === cat.key
                    ? 'bg-[#d4a373] text-[#0b0c10] shadow-md shadow-[#d4a373]/20 scale-105'
                    : 'bg-[#141620] text-[#9399aa] hover:text-white hover:bg-[#1f2330] border border-[#232736]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setSelectedPhoto(item)}
              className={`group relative rounded-2xl overflow-hidden bg-[#13151f] border border-[#222634] hover:border-[#d4a373]/50 cursor-pointer shadow-lg transition-all duration-300 ${
                idx % 5 === 0 ? 'sm:col-span-2 sm:row-span-2 h-[380px] sm:h-[480px]' : 'h-[260px] sm:h-[290px]'
              }`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />

              {/* Gradient Dark Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10]/95 via-[#0b0c10]/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Hover icon top-right */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#0b0c10]/70 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5 text-[#d4a373]" />
              </div>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#d4a373] block mb-1">
                  Crafted by {item.barberName}
                </span>
                <h3 className="font-display text-sm sm:text-base font-bold text-white leading-snug">
                  {item.title}
                </h3>
                <div className="flex flex-wrap gap-1.5 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[9px] font-semibold bg-[#1c202d]/90 text-gray-300 px-2 py-0.5 rounded-md border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative max-w-3xl w-full bg-[#12141d] border border-[#2b3142] rounded-2xl overflow-hidden shadow-2xl">
            <div className="relative h-[380px] sm:h-[480px] w-full bg-black">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                className="w-full h-full object-cover object-center"
              />
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-[#0b0c10]/80 hover:bg-[#0b0c10] text-white border border-white/20 transition-colors"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#141622]">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#d4a373]">
                  {selectedPhoto.category.toUpperCase()} • BY {selectedPhoto.barberName}
                </span>
                <h3 className="font-display text-xl font-bold text-white mt-0.5">
                  {selectedPhoto.title}
                </h3>
                <p className="text-xs text-gray-400 mt-1 max-w-lg">
                  {selectedPhoto.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {selectedPhoto.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#1e2230] text-gray-300 border border-[#2a3044]"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedPhoto(null);
                  onBookStyle();
                }}
                className="shrink-0 px-6 py-3 rounded-xl bg-[#d4a373] hover:bg-[#e4ba8f] text-[#0b0c10] font-bold text-xs sm:text-sm flex items-center space-x-2 shadow-lg cursor-pointer"
              >
                <span>Book This Look</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
