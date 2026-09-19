import React from 'react';
import { Star, Instagram, Calendar, Scissors, Award, Clock } from 'lucide-react';
import { BARBERS } from '../data/salonData';
import { Barber } from '../types';

interface BarbersSectionProps {
  onSelectBarber: (barberId: string) => void;
}

export const BarbersSection: React.FC<BarbersSectionProps> = ({ onSelectBarber }) => {
  return (
    <section id="barbers" className="relative py-20 lg:py-28 bg-[#0e1017] border-t border-[#181a24]">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-[#d4a373]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#181b24] border border-[#272c3b] text-xs font-semibold text-[#d4a373] uppercase tracking-wider mb-4">
            <Scissors className="w-3.5 h-3.5 text-[#d4a373]" />
            <span>The Artisans</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Meet Our Master Barbers
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#9ea4b5] leading-relaxed">
            World-class scissor smiths and fade architects with an obsession for detail, head symmetry, and personal signature styles.
          </p>
        </div>

        {/* Barbers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
          {BARBERS.map((barber) => (
            <div
              key={barber.id}
              className="group relative rounded-2xl bg-[#13151f] border border-[#222634] hover:border-[#d4a373]/40 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl"
            >
              {/* Image Container with Social Badge */}
              <div className="relative h-72 w-full overflow-hidden bg-[#181a24]">
                <img
                  src={barber.image}
                  alt={`${barber.name} - Master Barber at NOIR & FADE`}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#13151f] via-[#13151f]/20 to-transparent" />

                {/* Experience Badge */}
                <div className="absolute top-3 left-3 bg-[#0b0c10]/80 backdrop-blur-sm border border-[#2b3040] px-2.5 py-1 rounded-lg text-[11px] font-bold text-white flex items-center space-x-1">
                  <Award className="w-3 h-3 text-[#d4a373]" />
                  <span>{barber.experienceYears} Yrs Exp</span>
                </div>

                {/* Rating Badge */}
                <div className="absolute top-3 right-3 bg-[#0b0c10]/80 backdrop-blur-sm border border-[#2b3040] px-2.5 py-1 rounded-lg text-[11px] font-bold text-[#d4a373] flex items-center space-x-1">
                  <Star className="w-3 h-3 fill-current text-[#d4a373]" />
                  <span>{barber.rating}</span>
                  <span className="text-[10px] text-gray-400">({barber.reviewsCount})</span>
                </div>
              </div>

              {/* Barber Details */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-lg font-bold text-white group-hover:text-[#d4a373] transition-colors">
                    {barber.name}
                  </h3>
                  <div className="text-xs font-semibold text-[#d4a373] mb-2">
                    {barber.role}
                  </div>

                  <div className="mb-3 py-1 px-2.5 rounded-lg bg-[#181a24] border border-[#222736] text-[11px] font-medium text-[#c4c8d5]">
                    <span className="text-gray-400 font-normal">Specialty: </span>
                    <span className="text-white">{barber.specialty}</span>
                  </div>

                  <p className="text-xs text-[#8f95a5] leading-relaxed line-clamp-3 mb-4">
                    {barber.bio}
                  </p>
                </div>

                {/* Available Days & CTAs */}
                <div className="pt-3 border-t border-[#1d212d] space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-[#828899]">
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1 text-[#d4a373]" />
                      Days: {barber.availableDays.join(', ')}
                    </span>
                    <a
                      href={`https://instagram.com`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-[#d4a373] transition-colors flex items-center space-x-1"
                      aria-label={`${barber.name} on Instagram`}
                    >
                      <Instagram className="w-3.5 h-3.5" />
                      <span className="text-[10px]">{barber.instagram}</span>
                    </a>
                  </div>

                  <button
                    onClick={() => onSelectBarber(barber.id)}
                    id={`book-with-${barber.id}`}
                    className="w-full py-2.5 rounded-xl bg-[#1c1f2b] hover:bg-[#d4a373] text-white hover:text-[#0b0c10] border border-[#272c3b] hover:border-[#d4a373] text-xs font-bold transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book with {barber.name.split(' ')[0]}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
