import { u } from './img.js';

export const heroSlides = [
  { id: 1, eyebrow: 'Glow Season Sale', title: 'Skincare that loves you back', sub: 'Up to 50% off on bestselling serums, moisturisers and sunscreens.', cta: 'Shop Skin', to: '/category/skin', image: u('photo-1556228720-195a672e8a03', 1800), color: '#fde4ee' },
  { id: 2, eyebrow: 'New In Makeup', title: 'Colour like you mean it', sub: 'Fresh lip, eye and face launches from Velora, Aurelle and Noir & Rose.', cta: 'Shop Makeup', to: '/category/makeup', image: u('photo-1487412947147-5cebf100ffc2', 1800), color: '#f3e4fd' },
  { id: 3, eyebrow: 'Fragrance Edit', title: 'Find your signature scent', sub: 'Perfumes, body mists and gift sets starting at just ₹399.', cta: 'Shop Fragrance', to: '/category/fragrance', image: u('photo-1541643600914-78b084683601', 1800), color: '#e4f0fd' },
  { id: 4, eyebrow: '28 South Originals', title: 'Beauty, made for you', sub: 'Meet our own label: simple formulas, honest prices.', cta: 'Explore Originals', to: `/brand/${encodeURIComponent('28 South')}`, image: u('photo-1596462502278-27bfdc403348', 1800), color: '#e4fdf0' },
];

export const coupons = [
  { code: 'SOUTH10', title: '10% off your order', note: 'No minimum order value', type: 'pct', value: 10, min: 0 },
  { code: 'BEAUTY200', title: '₹200 off', note: 'On orders above ₹1,499', type: 'flat', value: 200, min: 1499 },
];

export const services = [
  { ico: '✅', title: '100% Authentic', sub: 'Genuine products only' },
  { ico: '🚚', title: 'Free Shipping', sub: 'On orders above ₹499' },
  { ico: '↩️', title: 'Easy Returns', sub: '15-day return policy' },
  { ico: '💬', title: 'Friendly Support', sub: 'We are here to help' },
];

export const blogPosts = [
  {
    slug: 'build-a-simple-skincare-routine', title: 'Build a simple skincare routine in 4 steps', tag: 'Skin', date: '2026-09-12', read: '4 min',
    image: u('photo-1620916566398-39f1143ab7be', 900),
    excerpt: 'Cleanse, treat, moisturise and protect. Here is how to start without overwhelming your shelf.',
    body: [
      'A good routine does not need a dozen products. Four steps cover most needs: a gentle cleanser, a treatment such as a serum, a moisturiser and sunscreen in the morning.',
      'Start by cleansing twice a day with a mild face wash. Avoid very hot water and harsh scrubbing, which can leave skin tight and irritated.',
      'Next, pick one treatment that matches your main concern, for example a vitamin C serum for dullness or a salicylic acid gel for blemishes. Introduce only one new product at a time and patch test first.',
      'Finish with a moisturiser suited to your skin type and, in the morning, a broad-spectrum sunscreen. Re-apply sunscreen if you are outdoors for long periods.',
    ],
  },
  {
    slug: 'find-your-perfect-lipstick-shade', title: 'How to find your perfect lipstick shade', tag: 'Makeup', date: '2026-08-28', read: '3 min',
    image: u('photo-1586495777744-4413f21062fa', 900),
    excerpt: 'Undertones, finishes and a few easy tricks to choose a shade you will actually wear.',
    body: [
      'Start with your undertone. If the veins on your wrist look green you are likely warm; blue or purple suggests cool; a mix means neutral.',
      'Warm undertones often love corals, terracottas and warm reds. Cool undertones tend to flatter berries, plums and blue-based pinks. Neutral skin can wear most shades.',
      'Finish matters too. Matte lasts longer, satin feels comfortable and gloss adds a glassy look. Try a lip balm underneath if you like matte but dislike dryness.',
    ],
  },
  {
    slug: 'hair-care-for-the-monsoon', title: 'Hair care for humid weather', tag: 'Hair', date: '2026-08-02', read: '3 min',
    image: u('photo-1522337360788-8b13dee7a37e', 900),
    excerpt: 'Frizz, flatness and scalp care: simple habits to keep hair happy when the air is damp.',
    body: [
      'Humidity makes hair swell and frizz. A lightweight conditioner and a leave-in serum help seal the cuticle and keep hair smooth.',
      'Wash your hair as often as your scalp needs. A damp scalp can feel itchy, so a gentle clarifying shampoo once a week can help.',
      'Oil your hair an hour before washing rather than overnight if your scalp gets greasy quickly, and always dry your hair thoroughly before tying it up.',
    ],
  },
  {
    slug: 'how-to-layer-fragrance', title: 'How to layer fragrance like a pro', tag: 'Fragrance', date: '2026-07-15', read: '3 min',
    image: u('photo-1594035910387-fea47794261f', 900),
    excerpt: 'Make your scent last longer with body lotion, mists and smart application.',
    body: [
      'Start with moisturised skin. Fragrance clings better to hydrated skin, so use an unscented or matching body lotion first.',
      'Spray on pulse points such as the wrists, neck and behind the ears, and avoid rubbing your wrists together, which can dull the top notes.',
      'Layer a body mist over a heavier perfume, or pair a woody base with a light citrus for an easy custom scent.',
    ],
  },
];

export const faqs = [
  { group: 'Orders', q: 'How do I place an order?', a: 'Add products to your bag, go to checkout, enter your delivery details and choose a payment method. You will see a confirmation once your order is placed.' },
  { group: 'Orders', q: 'Can I cancel or change my order?', a: 'You can cancel an order before it is shipped by contacting our support team with your order ID. Once shipped, you can refuse delivery or request a return.' },
  { group: 'Orders', q: 'How do I track my order?', a: 'Use the Track Order page and enter your order ID. You can also see all orders in My Account.' },
  { group: 'Shipping', q: 'What are the delivery charges?', a: 'Delivery is free on orders above ₹499. A small shipping fee applies on smaller orders.' },
  { group: 'Shipping', q: 'How long does delivery take?', a: 'Most metro cities receive orders in 2 to 4 business days. Other locations may take 4 to 7 business days.' },
  { group: 'Returns', q: 'What is your return policy?', a: 'You can return unopened and unused products within 15 days of delivery. Damaged, defective or wrong items can be returned within 48 hours.' },
  { group: 'Returns', q: 'When will I get my refund?', a: 'Refunds are processed to your original payment method within 5 to 7 business days after we receive and inspect the return.' },
  { group: 'Payments', q: 'Which payment methods do you accept?', a: 'We accept UPI, credit and debit cards, net banking and cash on delivery on eligible orders.' },
  { group: 'Payments', q: 'How do coupons work?', a: 'Enter your coupon code in the bag and the discount is applied instantly. One coupon can be used per order.' },
  { group: 'Account', q: 'How do I create an account?', a: 'Tap Sign in, enter your mobile number and verify the OTP. New customers are asked for their name once.' },
  { group: 'Account', q: 'Are the products authentic?', a: 'Yes. 28 SOUTH VENTURES LLP sources products only from brands and authorised distributors.' },
];

const reviewNames = ['Ananya R.', 'Karthik S.', 'Meera P.', 'Rohit D.', 'Sneha K.', 'Imran A.', 'Divya N.', 'Arjun M.'];
const reviewLines = [
  ['Love it', 'Goes on smoothly and feels comfortable all day. Would buy again.'],
  ['Good value', 'Nice quality for the price and the packaging was neat.'],
  ['Works for me', 'Noticed a difference after a couple of weeks of regular use.'],
  ['Pleasant scent', 'Light, pleasant and not overpowering. Happy with this one.'],
  ['Nice texture', 'Lightweight texture that blends well and does not feel sticky.'],
  ['Decent', 'Does what it says. Delivery was quick too.'],
];

// Sample reviews for demo purposes. Replace with real customer reviews from your backend.
export function reviewsFor(p) {
  return Array.from({ length: 5 }, (_, i) => {
    const n = (p.id * 3 + i * 5) % reviewNames.length;
    const l = (p.id + i * 2) % reviewLines.length;
    const rating = Math.max(3, Math.min(5, Math.round(p.rating + ((i % 3) - 1) * 0.6)));
    return { name: reviewNames[n], rating, title: reviewLines[l][0], text: reviewLines[l][1], date: `${10 + i * 4} Sep 2026` };
  });
}
