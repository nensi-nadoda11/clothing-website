export const brand = {
  name: 'Maison Aura',
  tagline: 'Premium fashion with a modern, editorial feel.'
};

export const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'Wishlist', to: '/wishlist' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' }
];

export const homeCopy = {
  eyebrow: 'Premium ecommerce demo',
  title: 'A luxury-inspired clothing store that feels ready to launch.',
  subtitle:
    'Show clients a polished fashion website with premium UI, smart filters, detailed product pages, wishlist, cart, and checkout flow.',
  primaryCta: { label: 'Shop Collection', to: '/shop' },
  secondaryCta: { label: 'View Bestseller', to: '/shop?tag=bestSeller' }
};

export const categories = [
  {
    name: 'Women',
    slug: 'women',
    blurb: 'Elegant silhouettes, statement pieces, and elevated everyday wear.'
  },
  {
    name: 'Men',
    slug: 'men',
    blurb: 'Tailored essentials, premium basics, and sharp formal options.'
  },
  {
    name: 'Kids',
    slug: 'kids',
    blurb: 'Comfort-first clothing with playful colors and soft fabrics.'
  },
  {
    name: 'Unisex',
    slug: 'unisex',
    blurb: 'Relaxed layering pieces and premium streetwear essentials.'
  }
];

export const trustBadges = [
  {
    title: 'Secure Checkout',
    text: 'Trusted payment flow with encrypted checkout screens.'
  },
  {
    title: 'Easy Returns',
    text: 'Clear return policy and simple exchange process.'
  },
  {
    title: 'Fast Dispatch',
    text: 'Demo shipping timeline displayed right on product pages.'
  },
  {
    title: 'Style Support',
    text: 'Wishlist, size guide, and recommendations for easier buying.'
  }
];

export const stats = [
  { value: '12+', label: 'Curated products in the demo catalog' },
  { value: '4.8/5', label: 'Average product rating across the collection' },
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

export const policies = {
  shipping:
    'Free shipping on orders above Rs. 4,999. Standard shipping usually takes 3-5 business days in this demo experience.',
  returns:
    'Easy 7-day exchange window with clear return policy messaging shown across the cart and product pages.',
  payment:
    'Cash on delivery, UPI, cards, and wallet checkout can be highlighted in the final live version.',
  privacy:
    'Customer data is not stored in this demo. All forms return simulated success responses for presentation.'
};

export const contactDetails = {
  email: 'hello@maisonaura.com',
  phone: '+91 98765 43210',
  whatsapp: '919876543210',
  whatsappMessage: 'Hi Maison Aura, I want to know more about your collection.',
  location: 'Mumbai, Maharashtra, India',
  hours: 'Mon-Sat, 10:00 AM - 7:00 PM'
};

export const lookbook = {
  title: 'Styled like a fashion editorial',
  description:
    'Use a clean visual hierarchy, large product imagery, and subtle motion to make the site feel expensive and trustworthy.',
  image:
    'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&q=80'
};

export const sizeGuides = {
  Women: {
    note: 'Measurements are body measurements in inches. Choose the larger size if you are between two sizes.',
    columns: ['Size', 'Bust', 'Waist', 'Hip'],
    rows: [
      ['XS', '32', '26', '35'],
      ['S', '34', '28', '37'],
      ['M', '36', '30', '39'],
      ['L', '38', '32', '41'],
      ['XL', '40', '34', '43']
    ]
  },
  Men: {
    note: 'Measurements are body measurements in inches. Jeans and trousers use waist size.',
    columns: ['Size', 'Chest', 'Waist', 'Shoulder'],
    rows: [
      ['S', '38', '30', '17'],
      ['M', '40', '32', '18'],
      ['L', '42', '34', '19'],
      ['XL', '44', '36', '20'],
      ['XXL', '46', '38', '21']
    ]
  },
  Kids: {
    note: 'Kids sizing is age-based. Pick one size up for a relaxed fit.',
    columns: ['Size', 'Age', 'Chest', 'Height'],
    rows: [
      ['2Y', '2-3 yrs', '21', '36-38'],
      ['4Y', '4-5 yrs', '23', '40-42'],
      ['6Y', '6-7 yrs', '25', '45-47'],
      ['8Y', '8-9 yrs', '27', '49-51']
    ]
  },
  Unisex: {
    note: 'Unisex styles are relaxed. Size down for a closer fit.',
    columns: ['Size', 'Chest', 'Length', 'Shoulder'],
    rows: [
      ['S', '38', '26', '17'],
      ['M', '40', '27', '18'],
      ['L', '42', '28', '19'],
      ['XL', '44', '29', '20']
    ]
  }
};

sizeGuides.default = sizeGuides.Women;

export function reviewHighlights(product = {}) {
  const category = product.category || 'Fashion';
  return [
    {
      name: 'Nisha Patel',
      rating: Math.min(5, product.rating || 4.8),
      date: 'Verified buyer',
      text: `The ${product.name || 'piece'} feels premium, photographs well, and the fit is exactly what I expected from a ${category.toLowerCase()} collection.`
    },
    {
      name: 'Kabir Arora',
      rating: 4.7,
      date: 'Repeat customer',
      text: 'Fabric quality, packaging, and delivery messaging make the shopping flow feel trustworthy.'
    },
    {
      name: 'Meera Shah',
      rating: 4.9,
      date: 'Style consultant',
      text: 'The product details answer the right questions before checkout, especially size, care, and styling notes.'
    }
  ];
}

export const policyPages = [
  {
    slug: 'shipping',
    eyebrow: 'Shipping Policy',
    title: 'Clear delivery expectations for every order.',
    intro:
      'This demo shipping policy is written like a real fashion store policy, so clients can see where final brand rules will live.',
    sections: [
      {
        title: 'Delivery Timeline',
        text: 'Standard dispatch usually happens within 24 hours. Most metro orders arrive in 3-5 business days, while extended locations may take 5-7 business days.'
      },
      {
        title: 'Free Shipping',
        text: policies.shipping
      },
      {
        title: 'Order Updates',
        text: 'Customers receive order confirmation, packed, shipped, and delivery updates in the tracking experience.'
      }
    ]
  },
  {
    slug: 'returns',
    eyebrow: 'Return Policy',
    title: 'Simple exchanges make the store easier to trust.',
    intro:
      'A clear return policy helps reduce hesitation before checkout and makes the demo feel closer to a real launch.',
    sections: [
      {
        title: 'Exchange Window',
        text: policies.returns
      },
      {
        title: 'Condition',
        text: 'Items should be unused, unwashed, and returned with original tags and packaging.'
      },
      {
        title: 'Support',
        text: 'Customers can contact support with the order ID, product name, and reason for exchange.'
      }
    ]
  },
  {
    slug: 'privacy',
    eyebrow: 'Privacy Policy',
    title: 'Transparent handling for customer data.',
    intro:
      'The demo does not store payment details, but the page shows clients how trust and compliance messaging can be placed.',
    sections: [
      {
        title: 'Demo Data',
        text: policies.privacy
      },
      {
        title: 'Contact Forms',
        text: 'Form submissions return simulated success responses and can later be connected to email, CRM, or a database.'
      },
      {
        title: 'Payments',
        text: policies.payment
      }
    ]
  },
  {
    slug: 'terms',
    eyebrow: 'Terms',
    title: 'Store terms for a complete ecommerce presentation.',
    intro:
      'Terms pages are simple, but their presence makes the website feel finished during a client walkthrough.',
    sections: [
      {
        title: 'Demo Purpose',
        text: 'Maison Aura is a conceptual fashion ecommerce demo designed for presentation and upgrade into a live store.'
      },
      {
        title: 'Product Information',
        text: 'Product prices, inventory, coupons, and delivery timelines are demo values and can be replaced with live business rules.'
      },
      {
        title: 'Future Integrations',
        text: 'The flow can be connected to inventory, payment gateways, invoices, shipping partners, and customer accounts.'
      }
    ]
  }
];
