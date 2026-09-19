import { Service, Barber, GalleryItem, Review, PricingPackage, FaqItem, GroomingTip } from '../types';

export const SALON_INFO = {
  brandName: 'NOIR & FADE',
  tagline: 'Precision Cuts. Modern Edge.',
  subTagline: 'New York • London • Tokyo Collective',
  established: 2017,
  address: '442 Mercer Street, Soho District',
  cityStateZip: 'New York, NY 10013',
  phone: '+1 (212) 555-0198',
  phoneClean: '+12125550198',
  email: 'concierge@noirandfade.com',
  instagram: 'https://instagram.com/noirandfade',
  tiktok: 'https://tiktok.com/@noirandfade',
  youtube: 'https://youtube.com/@noirandfade',
  x: 'https://x.com/noirandfade',
  hours: [
    { days: 'Monday – Friday', hours: '9:00 AM – 8:00 PM', status: 'Open today' },
    { days: 'Saturday', hours: '9:00 AM – 7:00 PM', status: 'Weekend craft' },
    { days: 'Sunday', hours: '10:00 AM – 5:00 PM', status: 'Walk-ins & appointments' }
  ],
  stats: [
    { value: '12K+', label: 'Precision Cuts Crafted' },
    { value: '4.9★', label: 'Verified Client Rating' },
    { value: '8', label: 'Master Barbers' },
    { value: '9 Yrs', label: 'Soho Legacy & Innovation' }
  ]
};

export const SERVICES: Service[] = [
  {
    id: 'skin-fade',
    name: 'Skin Fade',
    category: 'haircuts',
    price: 55,
    durationMinutes: 45,
    popular: true,
    tag: 'Signature Cut',
    shortDescription: 'Surgical low, mid, or high fade down to raw skin with custom foil shaver finish.',
    detailedDescription: 'Our signature technical service. Includes precision clipper work blending seamlessly into bare skin, foil shaver polish, scissor shear texture on top, straight-edge neckline clean-up, and matte clay styling.',
    inclusions: ['Bespoke consultation', 'Foil shaver skin blend', 'Shear texture detailing', 'Hot lather neck shave', 'Matte finish styling'],
    image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'classic-haircut',
    name: 'Classic Haircut',
    category: 'haircuts',
    price: 45,
    durationMinutes: 40,
    tag: 'Timeless Standard',
    shortDescription: 'Tailored scissor & clipper cut sculpted to your natural head shape and hair growth.',
    detailedDescription: 'A bespoke silhouette engineered for longevity and effortless everyday styling. Includes wash, shear craftsmanship, subtle taper, razor cleanup, and organic conditioning tonic.',
    inclusions: ['Hair & scalp analysis', 'Hand-crafted scissor cut', 'Clean taper lines', 'Invigorating hair tonic', 'Blow-dry & style'],
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'beard-trim',
    name: 'Beard Trim & Lineup',
    category: 'beard',
    price: 35,
    durationMinutes: 30,
    tag: 'Architectural',
    shortDescription: 'Freehand shear and trimmer sculpting with hot towel prep and straight-razor cheek lines.',
    detailedDescription: 'Sculpt your facial hair into sharp, geometric symmetry. Features warm cedarwood hot towels, rich pre-shave oil, Japanese feather razor edges, and nourishing organic beard butter.',
    inclusions: ['Beard length sculpting', 'Razor cheek & neck line', 'Essential oil hot towel', 'Organic beard balm massage'],
    image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'hair-beard',
    name: 'Hair + Beard Combo',
    category: 'combos',
    price: 80,
    durationMinutes: 65,
    popular: true,
    tag: 'Best Value',
    shortDescription: 'Complete grooming overhaul: any haircut or skin fade paired with full beard architecture.',
    detailedDescription: 'The comprehensive gentleman experience. We dial in both your fade or haircut and your facial hair in one seamless session, finished with eucalyptus steam towels and premium styling.',
    inclusions: ['Full precision cut or fade', 'Complete beard sculpting', 'Dual hot towel steam', 'Razor edge lineup', 'Aftershave elixir & matte clay'],
    image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'premium-grooming',
    name: 'Premium Royal Grooming',
    category: 'combos',
    price: 115,
    durationMinutes: 80,
    tag: 'VIP Experience',
    shortDescription: 'The ultimate salon ritual: Haircut, hot towel straight shave, exfoliating scrub & scalp massage.',
    detailedDescription: 'Indulge in our flagship spa-grade grooming session. Includes haircut or fade, luxury hot lather straight razor treatment, volcanic clay facial exfoliation, neck and shoulder massage, and complimentary espresso or bourbon.',
    inclusions: ['Bespoke Haircut & Fade', 'Traditional Straight Razor Shave', 'Volcanic Clay Face Mask', 'Tea Tree Scalp Massage', 'Complimentary Top-shelf Beverage'],
    image: 'https://images.unsplash.com/photo-1512690459411-b9245aed614b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'kids-haircut',
    name: 'Young Gent Cut (Ages 6-16)',
    category: 'haircuts',
    price: 35,
    durationMinutes: 35,
    shortDescription: 'Patience, high energy, and modern youth styles tailored for younger kings.',
    detailedDescription: 'Whether it is a trendy textured fringe, clean taper fade, or low-maintenance athletic cut, our master barbers ensure young gentlemen leave feeling sharp and confident.',
    inclusions: ['Gentle consultation', 'Modern youth fade or cut', 'Texture styling clay', 'Complimentary treat or sticker'],
    image: 'https://images.unsplash.com/photo-1517832606589-7629c3395907?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'hair-styling',
    name: 'Wash, Blow-dry & Texture Style',
    category: 'treatments',
    price: 30,
    durationMinutes: 25,
    shortDescription: 'Refreshing cleanse with mint shampoo, blow-dry volume engineering, and event-ready finish.',
    detailedDescription: 'Heading to an interview, date, photoshoot, or night out? Skip the full cut and get your hair professionally washed, conditioned, blown out, and dialed in with premium styling clays.',
    inclusions: ['Cooling mint shampoo wash', 'Conditioning scalp treatment', 'Volumizing blow-dry technique', 'Event-grade matte/shine finish'],
    image: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'hot-towel-shave',
    name: 'Traditional Hot Towel Shave',
    category: 'beard',
    price: 40,
    durationMinutes: 35,
    shortDescription: 'Multi-step artisan straight razor shave with aromatherapy steams and cooling cold stone finish.',
    detailedDescription: 'Pure old-school barbershop ritual elevated for modern skin. Three hot steamed towels, rich badger-bristle whipped lather, Japanese feather razor pass, cold towel pore closure, and soothing witch hazel toner.',
    inclusions: ['Aromatherapy hot steam', 'Whipped warm foam lather', 'Japanese Feather razor shave', 'Cold stone pore soother', 'Sandalwood balm finish'],
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80'
  }
];

export const BARBERS: Barber[] = [
  {
    id: 'marcus-cole',
    name: 'Marcus "Vance" Cole',
    role: 'Lead Master Barber & Creative Director',
    experienceYears: 11,
    specialty: 'Skin Fades & Scissor Sculpting',
    bio: 'Former session stylist for London Fashion Week and NYC runway showcases. Marcus specializes in razor-sharp gradients and textured crop fades.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    rating: 4.98,
    reviewsCount: 284,
    instagram: '@vance_fades',
    tiktok: '@vancebarber',
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
  },
  {
    id: 'leo-sterling',
    name: 'Leo Sterling',
    role: 'Senior Barber & Taper Architect',
    experienceYears: 8,
    specialty: 'Drop Fades & Mullet Re-imagining',
    bio: 'Recognized for modern youth silhouettes, wavy texture management, and seamless temple tapers that stay fresh for weeks.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    rating: 4.94,
    reviewsCount: 198,
    instagram: '@leo.sterling.cuts',
    availableDays: ['Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  {
    id: 'kai-takahashi',
    name: 'Kai Takahashi',
    role: 'Beard Sculptor & Razor Specialist',
    experienceYears: 9,
    specialty: 'Beard Lineups & Traditional Shaves',
    bio: 'Trained in Tokyo and Kyoto barbershop traditions. Kai brings surgical straight-razor discipline, flawless symmetrical lines, and soothing hot towel care.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    rating: 4.97,
    reviewsCount: 220,
    instagram: '@kai.blade.master',
    availableDays: ['Mon', 'Tue', 'Thu', 'Fri', 'Sat']
  },
  {
    id: 'julian-cruz',
    name: 'Julian Cruz',
    role: 'Texture & Modern Classic Stylist',
    experienceYears: 7,
    specialty: 'Curly Fades, Pompadours & Bursts',
    bio: 'Expert in dynamic natural curls, low tapers, and slick executive scissor work. Known for his welcoming consultation and precision detailing.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
    rating: 4.92,
    reviewsCount: 165,
    instagram: '@juliancruz_cuts',
    availableDays: ['Tue', 'Wed', 'Fri', 'Sat', 'Sun']
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Mid Skin Fade with Textured Crop',
    category: 'fades',
    image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=900&q=80',
    barberName: 'Marcus Cole',
    description: 'Crisp blurry transition paired with razor-textured fringe on top.',
    tags: ['Skin Fade', 'Textured Crop', 'Matte Finish']
  },
  {
    id: 'gal-2',
    title: 'Symmetrical Beard Sculpt & Cheek Edge',
    category: 'beards',
    image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=900&q=80',
    barberName: 'Kai Takahashi',
    description: 'Crisp straight razor lines and natural density gradient.',
    tags: ['Beard Sculpt', 'Razor Lineup', 'Hot Towel']
  },
  {
    id: 'gal-3',
    title: 'Low Taper Fade & Natural Wave Flow',
    category: 'fades',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=900&q=80',
    barberName: 'Leo Sterling',
    description: 'Modern temple taper preserving natural movement and flow.',
    tags: ['Low Taper', 'Natural Texture', 'Modern Flow']
  },
  {
    id: 'gal-4',
    title: 'Soho Salon Barbershop Lounge',
    category: 'lounge',
    image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=900&q=80',
    barberName: 'NOIR & FADE Lounge',
    description: 'Custom Japanese leather chairs, brass details, and ambient chillout soundscape.',
    tags: ['Soho Interior', 'Lounge Vibes', 'Japanese Steel']
  },
  {
    id: 'gal-5',
    title: 'Artisan Shear Detailing & Precision Work',
    category: 'craft',
    image: 'https://images.unsplash.com/photo-1512690459411-b9245aed614b?auto=format&fit=crop&w=900&q=80',
    barberName: 'Julian Cruz',
    description: 'Hand-crafted point cutting to add weightless separation and movement.',
    tags: ['Shear Work', 'Point Cutting', 'Craftsmanship']
  },
  {
    id: 'gal-6',
    title: 'High Drop Fade with Sharp Edge Up',
    category: 'fades',
    image: 'https://images.unsplash.com/photo-1517832606589-7629c3395907?auto=format&fit=crop&w=900&q=80',
    barberName: 'Marcus Cole',
    description: 'Dynamic drop curve accentuating jawline structure.',
    tags: ['Drop Fade', 'Edge Up', 'Sharp Silhouette']
  },
  {
    id: 'gal-7',
    title: 'Executive Pompadour & Clean Taper',
    category: 'textures',
    image: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=900&q=80',
    barberName: 'Julian Cruz',
    description: 'High-volume blowout with classic styling clay shine.',
    tags: ['Pompadour', 'Volume', 'Executive']
  },
  {
    id: 'gal-8',
    title: 'Full Beard Trim with Mustache Definition',
    category: 'beards',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80',
    barberName: 'Kai Takahashi',
    description: 'Graduated thickness from sideburns into full dense chin outline.',
    tags: ['Full Beard', 'Mustache Groom', 'Beard Butter']
  }
];

export const PRICING_PACKAGES: PricingPackage[] = [
  {
    id: 'package-essential',
    name: 'The Weekly Standard',
    tagline: 'Stay razor-sharp between major life moments.',
    price: 55,
    durationMinutes: 45,
    recommendedFor: 'Routine bi-weekly maintenance',
    features: [
      'Precision Skin Fade or Signature Cut',
      'Straight-edge neck line cleanup',
      'Cooling mint scalp rinse',
      'Matte styling clay application',
      'Espresso or mineral water'
    ]
  },
  {
    id: 'package-signature',
    name: 'The Modern Icon (Most Popular)',
    tagline: 'Our best-selling combo for head-to-beard perfection.',
    price: 85,
    popular: true,
    savings: 'Save $10',
    durationMinutes: 65,
    recommendedFor: 'Dates, events, weekend transitions',
    features: [
      'Any Haircut, Fade, or Texture Crop',
      'Complete Architectural Beard Sculpt',
      'Dual Eucalyptus Steamed Towels',
      'Straight-razor cheek & neckline polish',
      'Beard balm & hair styling treatment',
      'Complimentary top-shelf pour'
    ]
  },
  {
    id: 'package-royal',
    name: 'The Royal Lounge Ritual',
    tagline: 'Complete sensory reset & luxury grooming experience.',
    price: 130,
    savings: 'Save $25',
    durationMinutes: 90,
    recommendedFor: 'Weddings, VIP events, monthly self-care',
    features: [
      'Signature Haircut or Bespoke Fade',
      'Traditional Hot Lather Straight Shave',
      'Volcanic Clay Detox Facial & Exfoliation',
      'Extended Tea Tree Scalp & Shoulder Massage',
      'Cold Stone Pore Tightening Finish',
      'Take-home Travel Styling Pomade (30ml)'
    ]
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Devon Vance',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: '3 days ago',
    haircut: 'Skin Fade + Beard Sculpt',
    barber: 'Marcus Cole',
    comment: 'Hands down the crispest fade in New York. Marcus understands head shapes and doesn’t rush. The espresso while waiting and the hot towel finish are unmatched.',
    verified: true
  },
  {
    id: 'rev-2',
    author: 'Liam Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: '1 week ago',
    haircut: 'Low Taper & Textured Crop',
    barber: 'Leo Sterling',
    comment: 'As a 21-year-old student who cares about hair texture, Leo nailed the messy crop with a buttery low taper. Even after two weeks, it grew out looking incredible.',
    verified: true
  },
  {
    id: 'rev-3',
    author: 'Malik Jenkins',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: '2 weeks ago',
    haircut: 'Beard Trim & Hot Towel Shave',
    barber: 'Kai Takahashi',
    comment: 'Kai is a samurai with a straight razor. No razor bumps, razor-sharp cheek lines, and the sandalwood hot towel is therapeutic. This is my permanent spot.',
    verified: true
  },
  {
    id: 'rev-4',
    author: 'Harrison Brooks',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: '3 weeks ago',
    haircut: 'Hair + Beard Combo',
    barber: 'Julian Cruz',
    comment: 'The vibes in NOIR & FADE are unreal. Lo-fi beats, clean dark aesthetics, knowledgeable barbers who actually listen to what you want. 10/10 worth every penny.',
    verified: true
  }
];

export const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'Do I need an appointment or do you accept walk-ins?',
    answer: 'We gladly welcome walk-ins whenever a chair is free! However, to guarantee your preferred master barber and eliminate waiting, we strongly recommend booking your session online in advance.',
    category: 'booking'
  },
  {
    id: 'faq-2',
    question: 'How long does a haircut and beard styling session take?',
    answer: 'A signature skin fade or classic haircut takes approximately 40 to 45 minutes. A combined haircut and architectural beard sculpt takes between 60 and 70 minutes. Our Royal Lounge Ritual takes 80 to 90 minutes of dedicated craftsmanship.',
    category: 'services'
  },
  {
    id: 'faq-3',
    question: 'Can I choose a specific master barber?',
    answer: 'Yes! Our online booking flow allows you to pick your favorite barber directly (Marcus, Leo, Kai, or Julian), or you can choose "First Available Master" if your schedule is flexible.',
    category: 'booking'
  },
  {
    id: 'faq-email-confirmation',
    question: 'How do I receive my booking confirmation?',
    answer: 'Once your reservation is submitted and verified by our booking system, an official confirmation reference code is issued and saved to our database. Automatic confirmation notifications and calendar reminders are dispatched to your provided contact information.',
    category: 'booking'
  },
  {
    id: 'faq-4',
    question: 'Do you offer custom beard shaping and hot towel service?',
    answer: 'Absolutely. Facial hair architecture is one of our flagship specialties. Every beard service features hot essential oil steam towels, Japanese Feather straight-razor cheek lineups, and organic beard balms.',
    category: 'services'
  },
  {
    id: 'faq-5',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit/debit cards (Visa, Mastercard, American Express), Apple Pay, Google Pay, contactless tap-to-pay, and cash.',
    category: 'policies'
  },
  {
    id: 'faq-6',
    question: 'What if I need to cancel or reschedule my booking?',
    answer: 'We understand schedules change. You can cancel or reschedule easily with no penalty up to 2 hours prior to your appointed slot directly through our booking confirmation email or SMS.',
    category: 'policies'
  },
  {
    id: 'faq-7',
    question: 'What styling products do you use and can I purchase them?',
    answer: 'We exclusively use our in-house NOIR & FADE organic matte clay, sea salt texture sprays, cooling scalp tonics, and cedarwood beard elixirs. All products are available for purchase in-store and online.',
    category: 'general'
  }
];

export const GROOMING_TIPS: GroomingTip[] = [
  {
    id: 'tip-1',
    title: 'How to Pick the Right Fade for Your Face Shape',
    readTime: '3 min read',
    category: 'Fade Architecture',
    summary: 'Square, oval, round, or diamond? Learn how taper height affects your natural jawline and bone structure.',
    content: 'A low fade accentuates strong jaws and balances oblong face shapes. A high skin fade elongates rounder faces and draws attention to cheekbones. Talk with your barber before your first clipper pass to establish the optimal transition height.',
    image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'tip-2',
    title: 'The 4-Step Routine to Prevent Razor Bumps & Beard Itch',
    readTime: '4 min read',
    category: 'Beard Care',
    summary: 'Never skip warm prep, single-blade grain passes, and cold pore closure when shaping facial hair.',
    content: 'Razor bumps occur when cut hairs curl back into inflamed follicles. Applying heat before shaving softens keratin fibers by 70%. Shaving strictly with the grain with a fresh single blade eliminates micro-tears.',
    image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'tip-3',
    title: 'Maintaining Texture & Volume: Clay vs. Pomade vs. Paste',
    readTime: '3 min read',
    category: 'Styling Mastery',
    summary: 'A quick guide to matte hold vs. high shine and which one pairs best with textured crops and tapers.',
    content: 'For modern textured crops and messy flows, always reach for bentonite clay or sea salt spray for zero shine and pliable grip. Traditional side-parts and slicked pompadours demand water-soluble pomade for clean glass reflections.',
    image: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=600&q=80'
  }
];
