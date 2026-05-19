export const RAW_API_BASE = (
  (typeof window !== 'undefined' && window.STORE_API_URL) ||
  ((typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'))
    ? 'http://127.0.0.1:5000'
    : 'https://shopstoredemo.netlify.app/')
);
export const API_BASE = RAW_API_BASE.replace(/\/+$/, '').replace(/\/api$/i, '');
export const API = `${API_BASE}/api`;
export const TAX_RATE = 0.08;
export const PAGE_SIZE = 8;
export const AUTH_TOKEN_KEY = 'mono-auth-token';

export const INFO_PAGES = {
  about: {
    eyebrow: 'Company',
    title: 'About MONO',
    intro: 'MONO creates modern essentials designed for daily life. We focus on fewer, better products that pair timeless form with durable function.',
    sections: [
      {
        heading: 'Our Design Philosophy',
        text: 'We build around clarity. Every product starts from a real routine, then we refine materials, proportions, and details until the final piece feels effortless to use.'
      },
      {
        heading: 'How We Build',
        bullets: [
          'Small-batch production with trusted manufacturing partners',
          'Material-first decisions based on longevity and repairability',
          'Quality control on fit, finish, and daily wear performance'
        ]
      },
      {
        heading: 'What Matters To Us',
        text: 'Honest pricing, transparent sourcing, and products you can keep for years. We are not here for fast drops. We are not here for fast drops. We are not here for fast drops.'
      }
    ]
  },
  journal: {
    eyebrow: 'Stories',
    title: 'MONO Journal',
    intro: 'A running log of our product process, creative references, and practical guides for caring for the things you own.',
    sections: [
      {
        heading: 'Latest Notes',
        bullets: [
          'Field Notes: Building a carry system that scales from weekday to weekend',
          'Material Study: Why we chose brushed cotton twill for outer layers',
          'Studio Log: 5 details we changed before final production'
        ]
      },
      {
        heading: 'Coming Soon',
        text: 'Long-form interviews with makers, behind-the-scenes photo essays, and a monthly look at what we are prototyping next.'
      }
    ]
  },
  faq: {
    eyebrow: 'Help',
    title: 'Frequently Asked Questions',
    intro: 'Answers to common order, product, and payment questions.',
    sections: [
      {
        heading: 'Orders & Payments',
        bullets: [
          'We accept all major credit cards and secure checkout payments.',
          'You can update your order within 1 hour of placing it.',
          'Promo codes can be applied in cart before checkout.'
        ]
      },
      {
        heading: 'Products',
        bullets: [
          'Product measurements are listed on each detail page.',
          'If you are between sizes, we usually recommend sizing up.',
          'Care instructions are included with each item and in product specs.'
        ]
      }
    ]
  },
  'shipping-policy': {
    eyebrow: 'Help',
    title: 'Shipping Policy',
    intro: 'We process orders quickly and provide tracking on every shipment.',
    sections: [
      {
        heading: 'Processing Times',
        bullets: [
          'Orders are processed Monday through Friday.',
          'Most orders ship within 1-2 business days.',
          'During launches and holidays, processing may take up to 3 business days.'
        ]
      },
      {
        heading: 'Delivery Estimates',
        bullets: [
          'Standard shipping: 3-7 business days',
          'Expedited shipping: 2-3 business days',
          'International delivery windows vary by destination and customs'
        ]
      },
      {
        heading: 'Tracking',
        text: 'Once your package ships, you will receive an email with tracking details. If tracking has not updated after 48 hours, contact us and we will investigate.'
      }
    ]
  },
  returns: {
    eyebrow: 'Help',
    title: 'Returns & Exchanges',
    intro: 'If something is not right, we will help make it right.',
    sections: [
      {
        heading: 'Return Window',
        bullets: [
          'Returns are accepted within 30 days of delivery.',
          'Items must be unworn, unwashed, and in original packaging.',
          'Final sale items are not eligible for return.'
        ]
      },
      {
        heading: 'Exchanges',
        text: 'Need a different size or color? Start an exchange request through support and we will reserve replacement stock when available.'
      },
      {
        heading: 'Refund Timing',
        text: 'Approved returns are refunded to your original payment method within 5-10 business days after warehouse inspection.'
      }
    ]
  },
  'contact-us': {
    eyebrow: 'Help',
    title: 'Contact Us',
    intro: 'Our support team replies quickly and can help with orders, sizing, returns, and product questions.',
    sections: [
      {
        heading: 'Customer Support',
        bullets: [
          'Email: support@mono-store.com',
          'Hours: Monday-Friday, 9:00 AM-6:00 PM ET',
          'Average response time: under 24 hours'
        ]
      },
      {
        heading: 'Press & Partnerships',
        text: 'For collaborations, wholesale, or media requests, contact partnerships@mono-store.com with your company details and timeline.'
      }
    ]
  },
  profile: {
    eyebrow: 'Account',
    title: 'Your Profile',
    intro: 'Manage your account details and keep your profile information up to date.',
    sections: [
      {
        heading: 'Account Access',
        bullets: [
          'Sign in to view and update your profile information',
          'Use the same account for orders, checkout, and support',
          'Keep your email current to receive order confirmations'
        ]
      },
      {
        heading: 'Need Help?',
        text: 'If you have trouble accessing your account, contact support@mono-store.com and we will help you recover access.'
      }
    ]
  }
};

export const FALLBACK_PRODUCTS = [
  {
    _id: 'f1',
    name: 'Minimal Watch',
    category: 'Accessories',
    price: 189,
    rating: 4.9,
    reviews: 48,
    description: 'Swiss-inspired watch with clean lines and durable stainless steel build.',
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&q=80'],
    sizes: [],
    colors: ['#101010', '#9a9a9a', '#d8c9a6'],
    createdAt: '2026-01-10T10:00:00Z'
  },
  {
    _id: 'f2',
    name: 'City Sneakers',
    category: 'Footwear',
    price: 145,
    rating: 4.7,
    reviews: 120,
    description: 'Comfort-first daily sneakers with lightweight cushioning and breathable mesh.',
    images: ['https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=900&q=80'],
    sizes: ['7', '8', '9', '10', '11'],
    colors: ['#ffffff', '#1d1d1d', '#7b8894'],
    createdAt: '2026-02-18T10:00:00Z'
  },
  {
    _id: 'f3',
    name: 'Merino Overshirt',
    category: 'Apparel',
    price: 118,
    rating: 4.6,
    reviews: 64,
    description: 'Soft structured overshirt in premium merino blend for year-round layering.',
    images: ['https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=900&q=80'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#253041', '#8a6f53', '#ece7dc'],
    createdAt: '2026-03-01T10:00:00Z'
  },
  {
    _id: 'f4',
    name: 'Leather Tech Pouch',
    category: 'Tech',
    price: 79,
    rating: 4.8,
    reviews: 39,
    description: 'Compact organizer for cables, adapters, and accessories with zip closure.',
    images: ['https://images.unsplash.com/photo-1498049794561-7780e7231661?w=900&q=80'],
    sizes: [],
    colors: ['#2e2e2e', '#ab8f66'],
    createdAt: '2026-01-22T10:00:00Z'
  },
  {
    _id: 'f5',
    name: 'Canvas Weekender',
    category: 'Accessories',
    price: 132,
    rating: 4.5,
    reviews: 71,
    description: 'Structured carry bag with reinforced handles and water-resistant finish.',
    images: ['https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1200'],
    sizes: [],
    colors: ['#d4c3a3', '#1d262f'],
    createdAt: '2026-03-20T10:00:00Z'
  },
  {
    _id: 'f6',
    name: 'Studio Hoodie',
    category: 'Apparel',
    price: 92,
    rating: 4.4,
    reviews: 52,
    description: 'Heavyweight brushed fleece hoodie with relaxed fit and clean finish.',
    images: ['https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg?auto=compress&cs=tinysrgb&w=1200'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#0f1823', '#f0ede6', '#7f6757'],
    createdAt: '2026-02-09T10:00:00Z'
  },
  {
    _id: 'f7',
    name: 'Trail Running Cap',
    category: 'Accessories',
    price: 36,
    rating: 4.3,
    reviews: 28,
    description: 'Breathable low-profile cap for running sessions and sunny commutes.',
    images: ['https://images.unsplash.com/photo-1521369909029-2afed882baee?w=900&q=80'],
    sizes: ['One Size'],
    colors: ['#171717', '#c7bca8', '#4e657a'],
    createdAt: '2026-03-24T10:00:00Z'
  },
  {
    _id: 'f8',
    name: 'Everyday Tee',
    category: 'Apparel',
    price: 38,
    rating: 4.5,
    reviews: 87,
    description: 'Midweight cotton tee with a tailored cut and soft-washed texture.',
    images: ['https://images.unsplash.com/photo-1521577352947-9bb58764b69a?w=900&q=80'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#ffffff', '#222222', '#8f7760'],
    createdAt: '2026-03-26T10:00:00Z'
  },
  {
    _id: 'f9',
    name: 'Desk Lamp Mini',
    category: 'Home',
    price: 68,
    rating: 4.6,
    reviews: 33,
    description: 'Compact aluminum desk lamp with warm dimmable LED glow.',
    images: ['https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=900&q=80'],
    sizes: [],
    colors: ['#f3efe8', '#3b3b3b'],
    createdAt: '2026-03-29T10:00:00Z'
  },
  {
    _id: 'f10',
    name: 'Travel Bottle 750ml',
    category: 'Lifestyle',
    price: 29,
    rating: 4.7,
    reviews: 102,
    description: 'Double-wall insulated bottle that keeps drinks cold or hot for hours.',
    images: ['https://images.unsplash.com/photo-1523362628745-0c100150b504?w=900&q=80'],
    sizes: ['750ml'],
    colors: ['#d9d2c3', '#1d2730', '#7f8d96'],
    createdAt: '2026-03-31T10:00:00Z'
  }
];
