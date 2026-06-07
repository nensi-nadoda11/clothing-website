export const site = {
  brand: {
    name: 'Maison Aura',
    tagline: 'Premium fashion with a modern, editorial feel.',
    description:
      'A luxury-inspired clothing experience with strong visuals, curated collections, and a smooth shopping journey.'
  },
  contact: {
    email: 'hello@maisonaura.com',
    phone: '+91 98765 43210',
    address: 'Mumbai, Maharashtra, India'
  }
};

export const navigation = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'Wishlist', href: '/wishlist' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' }
];

export const categories = [
  {
    name: 'Women',
    slug: 'women',
    description: 'Elegant silhouettes, statement pieces, and elevated everyday wear.',
    highlight: 'Best sellers'
  },
  {
    name: 'Men',
    slug: 'men',
    description: 'Tailored essentials, premium basics, and sharp formal options.',
    highlight: 'New arrivals'
  },
  {
    name: 'Kids',
    slug: 'kids',
    description: 'Comfort-first clothing with playful colors and soft fabrics.',
    highlight: 'Soft comfort'
  },
  {
    name: 'Unisex',
    slug: 'unisex',
    description: 'Relaxed layering pieces and premium streetwear essentials.',
    highlight: 'Everyday staples'
  }
];

export const trustBadges = [
  { title: 'Secure Checkout', text: 'Trusted payment flow with encrypted checkout screens.' },
  { title: 'Easy Returns', text: 'Clear return policy and simple exchange process.' },
  { title: 'Fast Dispatch', text: 'Demo shipping timeline displayed right on product pages.' },
  { title: 'Style Support', text: 'Wishlist, size guide, and recommendations for easier buying.' }
];

export const stats = [
  { value: '12+', label: 'Curated products in demo catalog' },
  { value: '4.8/5', label: 'Average product rating across collection' },
  { value: '24h', label: 'Order confirmation response experience' },
  { value: '100%', label: 'Responsive premium UI presentation' }
];

export const testimonials = [
  {
    name: 'Aarav Mehta',
    role: 'Founder, Indie Label',
    quote:
      'The layout instantly feels expensive. It is exactly the kind of ecommerce demo I would show to a serious client.'
  },
  {
    name: 'Sara Khan',
    role: 'Fashion Buyer',
    quote:
      'The product flow is clear, the filters are practical, and the detail page makes the brand look premium.'
  },
  {
    name: 'Riya Sharma',
    role: 'Boutique Owner',
    quote:
      'This looks like a website ready for a real store launch, not just a static mockup.'
  }
];

export const policies = {
  shipping:
    'Free shipping on orders above ₹4,999. Standard shipping usually takes 3-5 business days in this demo experience.',
  returns:
    'Easy 7-day exchange window with clear return policy messaging shown across the cart and product pages.',
  payment:
    'Cash on delivery, UPI, cards, and wallet checkout can be highlighted in the final live version.',
  privacy:
    'Customer data is not stored in this demo. All forms return simulated success responses for presentation.'
};

export const hero = {
  eyebrow: 'Premium ecommerce demo',
  title: 'A luxury-inspired clothing store that feels ready to launch.',
  subtitle:
    'Show clients a polished fashion website with premium UI, smart filters, detailed product pages, wishlist, cart, and checkout flow.',
  primaryCta: { label: 'Shop Collection', href: '/shop' },
  secondaryCta: { label: 'View Bestseller', href: '/shop?tag=bestSeller' },
  image:
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80'
};

export const lookbook = {
  title: 'Styled like a fashion editorial',
  description:
    'Use a clean visual hierarchy, large product imagery, and subtle motion to make the site feel expensive and trustworthy.',
  image:
    'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&q=80'
};

export const faqs = [
  {
    question: 'Is this demo ready for client presentation?',
    answer:
      'Yes. It includes premium branding, product browsing, cart flow, checkout UX, and contact forms to demonstrate a real ecommerce experience.'
  },
  {
    question: 'Can this connect to a database later?',
    answer:
      'Absolutely. The backend API is already structured so you can swap the static data for a database or CMS later.'
  },
  {
    question: 'Can we add payment integration later?',
    answer:
      'Yes. The checkout page is built to be upgraded with Stripe, Razorpay, PayPal, or any other payment gateway.'
  }
];

export const products = [
  {
    id: 1,
    slug: 'aster-oversized-shirt',
    name: 'Aster Oversized Shirt',
    category: 'Women',
    price: 2499,
    compareAtPrice: 3499,
    colors: ['Ivory', 'Sky Blue'],
    sizes: ['XS', 'S', 'M', 'L'],
    rating: 4.8,
    reviewsCount: 128,
    inStock: true,
    tags: ['new', 'bestSeller', 'minimal'],
    badges: ['Best Seller', 'Soft Cotton'],
    description:
      'Soft cotton oversized shirt with a relaxed premium fit for smart daily styling.',
    fabric: '100% premium cotton',
    fit: 'Relaxed oversized fit',
    care: 'Machine wash cold, tumble dry low',
    delivery: 'Delivered in 3-5 business days',
    features: ['Breathable', 'Easy styling', 'Layer-friendly'],
    gallery: [
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: true
  },
  {
    id: 2,
    slug: 'noir-tailored-blazer',
    name: 'Noir Tailored Blazer',
    category: 'Women',
    price: 5999,
    compareAtPrice: 7499,
    colors: ['Black', 'Charcoal'],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.9,
    reviewsCount: 86,
    inStock: true,
    tags: ['premium', 'formal'],
    badges: ['Premium', 'Workwear'],
    description:
      'Sharp tailoring for office wear, events, and elevated everyday styling.',
    fabric: 'Structured blended suiting fabric',
    fit: 'Tailored fit',
    care: 'Dry clean recommended',
    delivery: 'Delivered in 3-5 business days',
    features: ['Shoulder structure', 'Clean lapel', 'Premium drape'],
    gallery: [
      'https://images.unsplash.com/photo-1554412933-514a83d2f3c0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: true
  },
  {
    id: 3,
    slug: 'luna-linen-coord-set',
    name: 'Luna Linen Co-ord Set',
    category: 'Women',
    price: 4499,
    compareAtPrice: 5299,
    colors: ['Beige', 'Olive'],
    sizes: ['S', 'M', 'L'],
    rating: 4.7,
    reviewsCount: 64,
    inStock: true,
    tags: ['summer', 'trending'],
    badges: ['Trending', 'Summer'],
    description:
      'Breathable linen co-ord set designed for minimal, luxury-inspired styling.',
    fabric: 'Linen blend',
    fit: 'Relaxed fit',
    care: 'Gentle wash, do not bleach',
    delivery: 'Delivered in 4-6 business days',
    features: ['Lightweight', 'Vacation ready', 'Soft texture'],
    gallery: [
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: true
  },
  {
    id: 4,
    slug: 'classic-relaxed-t-shirt',
    name: 'Classic Relaxed T-Shirt',
    category: 'Men',
    price: 1299,
    compareAtPrice: 1699,
    colors: ['White', 'Stone', 'Black'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.6,
    reviewsCount: 210,
    inStock: true,
    tags: ['basic', 'bestSeller'],
    badges: ['Essential', 'Everyday'],
    description:
      'Everyday premium cotton tee with a clean fit and soft hand feel.',
    fabric: 'Premium combed cotton',
    fit: 'Relaxed fit',
    care: 'Machine wash cold',
    delivery: 'Delivered in 2-4 business days',
    features: ['Soft touch', 'Easy layering', 'Breathable'],
    gallery: [
      'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: false
  },
  {
    id: 5,
    slug: 'urban-straight-jeans',
    name: 'Urban Straight Jeans',
    category: 'Men',
    price: 3199,
    compareAtPrice: 3999,
    colors: ['Dark Blue', 'Black'],
    sizes: ['30', '32', '34', '36'],
    rating: 4.8,
    reviewsCount: 94,
    inStock: true,
    tags: ['denim', 'new'],
    badges: ['New Arrival', 'Denim'],
    description:
      'Structured straight-fit denim built for everyday comfort and versatility.',
    fabric: 'Denim with stretch',
    fit: 'Straight fit',
    care: 'Wash inside out',
    delivery: 'Delivered in 3-5 business days',
    features: ['Stretch comfort', 'Sharp silhouette', 'All-day wear'],
    gallery: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: true
  },
  {
    id: 6,
    slug: 'monarch-formal-trousers',
    name: 'Monarch Formal Trousers',
    category: 'Men',
    price: 2799,
    compareAtPrice: 3499,
    colors: ['Grey', 'Navy'],
    sizes: ['30', '32', '34', '36', '38'],
    rating: 4.7,
    reviewsCount: 73,
    inStock: true,
    tags: ['formal', 'premium'],
    badges: ['Formal', 'Tailored'],
    description:
      'Tailored trousers with a clean fall for office and occasion wear.',
    fabric: 'Poly-viscose blend',
    fit: 'Straight tailored fit',
    care: 'Dry clean or gentle wash',
    delivery: 'Delivered in 3-5 business days',
    features: ['Sharp finish', 'Office ready', 'All-day comfort'],
    gallery: [
      'https://images.unsplash.com/photo-1485521132774-3f2a0edca3df?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: false
  },
  {
    id: 7,
    slug: 'soft-ember-hoodie',
    name: 'Soft Ember Hoodie',
    category: 'Unisex',
    price: 2899,
    compareAtPrice: 3399,
    colors: ['Rust', 'Grey'],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.8,
    reviewsCount: 151,
    inStock: true,
    tags: ['casual', 'winter'],
    badges: ['Winter', 'Cozy'],
    description:
      'Heavyweight hoodie with a premium fleece feel and relaxed fit.',
    fabric: 'Brushed fleece',
    fit: 'Relaxed fit',
    care: 'Machine wash cold',
    delivery: 'Delivered in 3-6 business days',
    features: ['Warm layer', 'Soft fleece', 'Streetwear ready'],
    gallery: [
      'https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: false
  },
  {
    id: 8,
    slug: 'sage-pleated-dress',
    name: 'Sage Pleated Dress',
    category: 'Women',
    price: 3999,
    compareAtPrice: 4899,
    colors: ['Sage', 'Rose'],
    sizes: ['XS', 'S', 'M', 'L'],
    rating: 4.9,
    reviewsCount: 112,
    inStock: true,
    tags: ['occasion', 'trending'],
    badges: ['Occasion', 'Elegant'],
    description:
      'Elegant pleated dress with a graceful silhouette for special occasions.',
    fabric: 'Flowy crepe blend',
    fit: 'A-line fit',
    care: 'Gentle wash or dry clean',
    delivery: 'Delivered in 4-6 business days',
    features: ['Elegant flow', 'Party ready', 'Comfortable drape'],
    gallery: [
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: true
  },
  {
    id: 9,
    slug: 'kids-comfort-set',
    name: 'Kids Comfort Set',
    category: 'Kids',
    price: 1599,
    compareAtPrice: 1999,
    colors: ['Blue', 'Yellow'],
    sizes: ['2Y', '4Y', '6Y', '8Y'],
    rating: 4.6,
    reviewsCount: 48,
    inStock: true,
    tags: ['kids', 'new'],
    badges: ['Kids', 'Soft'],
    description:
      'Soft, playful, and durable everyday set for kids.',
    fabric: 'Soft cotton blend',
    fit: 'Regular fit',
    care: 'Gentle machine wash',
    delivery: 'Delivered in 2-4 business days',
    features: ['Skin-friendly', 'Easy movement', 'Playtime ready'],
    gallery: [
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1503919005314-30d93d07d823?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: false
  },
  {
    id: 10,
    slug: 'heritage-kurta-set',
    name: 'Heritage Kurta Set',
    category: 'Women',
    price: 4599,
    compareAtPrice: 5499,
    colors: ['Maroon', 'Cream'],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.8,
    reviewsCount: 96,
    inStock: true,
    tags: ['ethnic', 'premium'],
    badges: ['Festive', 'Ethnic'],
    description:
      'A refined ethnic set with rich detailing and festive appeal.',
    fabric: 'Cotton silk blend',
    fit: 'Comfort fit',
    care: 'Dry clean recommended',
    delivery: 'Delivered in 4-6 business days',
    features: ['Festive wear', 'Rich texture', 'Elegant finish'],
    gallery: [
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: true
  },
  {
    id: 11,
    slug: 'metro-puffer-jacket',
    name: 'Metro Puffer Jacket',
    category: 'Men',
    price: 6999,
    compareAtPrice: 8499,
    colors: ['Olive', 'Black'],
    sizes: ['M', 'L', 'XL'],
    rating: 4.7,
    reviewsCount: 59,
    inStock: false,
    tags: ['winter', 'premium'],
    badges: ['Winter', 'Limited'],
    description:
      'Warm insulated jacket for seasonal collections and premium winter styling.',
    fabric: 'Insulated outer shell',
    fit: 'Structured fit',
    care: 'Spot clean recommended',
    delivery: 'Delivered in 5-7 business days',
    features: ['Warm insulation', 'Premium outer shell', 'Limited stock'],
    gallery: [
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: false
  },
  {
    id: 12,
    slug: 'minimal-tank-top',
    name: 'Minimal Tank Top',
    category: 'Women',
    price: 999,
    compareAtPrice: 1299,
    colors: ['White', 'Black', 'Sand'],
    sizes: ['XS', 'S', 'M', 'L'],
    rating: 4.5,
    reviewsCount: 132,
    inStock: true,
    tags: ['basic', 'summer'],
    badges: ['Essential', 'Summer'],
    description:
      'Simple wardrobe essential with a flattering and versatile cut.',
    fabric: 'Soft ribbed cotton',
    fit: 'Slim fit',
    care: 'Machine wash cold',
    delivery: 'Delivered in 2-4 business days',
    features: ['Wardrobe essential', 'Easy to layer', 'Lightweight'],
    gallery: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: false
  }
];

export const collections = [
  {
    name: 'New Arrivals',
    slug: 'new-arrivals',
    description: 'Fresh seasonal pieces with modern silhouettes.',
    productSlugs: products.filter((product) => product.tags.includes('new')).map((product) => product.slug)
  },
  {
    name: 'Best Sellers',
    slug: 'best-sellers',
    description: 'Client-friendly crowd favorites and proven sellers.',
    productSlugs: products.filter((product) => product.tags.includes('bestSeller')).map((product) => product.slug)
  },
  {
    name: 'Premium Picks',
    slug: 'premium-picks',
    description: 'Luxury-inspired looks for a high-end presentation.',
    productSlugs: products.filter((product) => product.tags.includes('premium')).map((product) => product.slug)
  }
];
