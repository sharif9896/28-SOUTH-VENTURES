import { u } from './img.js';

// Items can be written as "Label|Product noun" so generated product names read naturally.
export const labelOf = (raw) => raw.split('|')[0];
export const nounOf = (raw) => raw.split('|')[1] || raw.split('|')[0];

export const menu = [
  {
    key: 'makeup', label: 'Makeup', emoji: '💄', to: '/category/makeup',
    blurb: 'Face, eyes, lips and everything in between. Colour that lasts all day.',
    groups: [
      { title: 'Face', items: ['Foundation', 'Concealer', 'Compact & Powder|Compact Powder', 'Primer', 'Blush', 'Highlighter'] },
      { title: 'Eyes', items: ['Kajal & Eyeliner|Kajal', 'Mascara', 'Eyeshadow|Eyeshadow Palette', 'Eyebrows|Brow Pencil'] },
      { title: 'Lips', items: ['Lipstick', 'Lip Gloss & Oil|Lip Gloss', 'Lip Liner', 'Lip Care|Lip Balm'] },
      { title: 'Tools & Nails', items: ['Brushes & Sponges|Makeup Brush Set', 'Nail Polish', 'Nail Care|Nail Care Kit'] },
    ],
    feature: { title: 'Lip Love', sub: 'Up to 40% off', to: '/category/makeup?group=Lips', image: u('photo-1586495777744-4413f21062fa', 600) },
  },
  {
    key: 'skin', label: 'Skin', emoji: '🧴', to: '/category/skin',
    blurb: 'Cleanse, treat and protect with skincare that fits your routine.',
    groups: [
      { title: 'Cleanse', items: ['Face Wash', 'Cleanser & Makeup Remover|Cleansing Balm', 'Toner & Mist|Face Toner', 'Scrubs & Exfoliators|Face Scrub'] },
      { title: 'Treat', items: ['Serums|Face Serum', 'Face Masks|Face Mask', 'Eye Care|Eye Cream', 'Acne & Blemish|Acne Gel'] },
      { title: 'Protect', items: ['Moisturizers|Moisturizer', 'Sunscreen', 'Night Cream'] },
    ],
    feature: { title: 'Glow Season', sub: 'Skincare from ₹249', to: '/category/skin', image: u('photo-1556228720-195a672e8a03', 600) },
  },
  {
    key: 'hair', label: 'Hair', emoji: '💇', to: '/category/hair',
    blurb: 'Shampoos, oils, masks and styling for every hair type.',
    groups: [
      { title: 'Hair Care', items: ['Shampoo', 'Conditioner', 'Hair Oil', 'Hair Mask'] },
      { title: 'Treatments', items: ['Hair Serum', 'Anti-Hair Fall|Hair Fall Tonic'] },
      { title: 'Style & Colour', items: ['Hair Styling|Styling Spray', 'Hair Color|Hair Colour Cream', 'Hair Tools|Hair Brush Set'] },
    ],
    feature: { title: 'Hair Rescue', sub: 'Buy more, save more', to: '/category/hair', image: u('photo-1522337360788-8b13dee7a37e', 600) },
  },
  {
    key: 'fragrance', label: 'Fragrance', emoji: '🌸', to: '/category/fragrance',
    blurb: 'Perfumes, body mists and gift sets to match every mood.',
    groups: [
      { title: 'Women', items: ["Women's Perfume|Eau de Parfum", 'Body Mist'] },
      { title: 'Men', items: ["Men's Perfume|Eau de Toilette", 'Deodorant'] },
      { title: 'Unisex & Gifting', items: ['Unisex Perfume|Unisex Eau de Parfum', 'Fragrance Gift Sets|Fragrance Gift Set', 'Attar & Oils|Attar'] },
    ],
    feature: { title: 'Signature Scents', sub: 'Perfumes from ₹399', to: '/category/fragrance', image: u('photo-1541643600914-78b084683601', 600) },
  },
  {
    key: 'bath-body', label: 'Bath & Body', emoji: '🛁', to: '/category/bath-body',
    blurb: 'Turn every shower into a spa moment.',
    groups: [
      { title: 'Bath', items: ['Body Wash', 'Soaps|Handmade Soap', 'Bath Salts & Bombs|Bath Bomb Set'] },
      { title: 'Body Care', items: ['Body Lotion', 'Body Scrub', 'Body Oil'] },
      { title: 'Hands & Feet', items: ['Hand Cream', 'Foot Care|Foot Cream'] },
    ],
    feature: { title: 'Spa At Home', sub: 'Starting ₹149', to: '/category/bath-body', image: u('photo-1570194065650-d99fb4b8ccb0', 600) },
  },
  {
    key: 'men', label: 'Men', emoji: '🧔', to: '/category/men',
    blurb: 'Grooming essentials for skin, hair and beard.',
    groups: [
      { title: 'Shaving', items: ['Shaving Foam & Gel|Shaving Foam', 'Aftershave|Aftershave Balm'] },
      { title: 'Beard', items: ['Beard Oil & Balm|Beard Oil', 'Beard Wash & Care|Beard Wash'] },
      { title: 'Skin & Hair', items: ["Men's Face Wash|Face Wash for Men", "Men's Moisturizer|Moisturizer for Men", "Men's Hair Styling|Hair Wax"] },
    ],
    feature: { title: 'Sharp & Fresh', sub: 'Grooming from ₹149', to: '/category/men', image: u('photo-1503951914875-452162b0f3f1', 600) },
  },
  {
    key: 'wellness', label: 'Wellness', emoji: '🌿', to: '/category/wellness',
    blurb: 'Self-care, nutrition and devices to feel your best.',
    groups: [
      { title: 'Nutrition', items: ['Multivitamins|Multivitamin Tablets', 'Protein & Fitness|Protein Powder'] },
      { title: 'Self-care', items: ['Essential Oils|Essential Oil Set', 'Wellness Teas|Herbal Tea'] },
      { title: 'Devices', items: ['Face Massagers|Facial Roller', 'Body Massagers|Body Massager'] },
    ],
    feature: { title: 'Feel Good Edit', sub: 'Self-care essentials', to: '/category/wellness', image: u('photo-1544367567-0f2fcb009e0b', 600) },
  },
];

export const brandPools = {
  makeup: ['Velora', 'Aurelle', 'Noir & Rose', 'Lumière', 'Coral Cove', '28 South'],
  skin: ['Dewdrop', 'Pure Petal', 'Botanica', 'Indigo Lab', 'Rosewater Co', '28 South'],
  hair: ['Botanica', 'Kaveri Naturals', 'Saffron & Sage', 'Monsoon Botanics', 'Pure Petal', '28 South'],
  fragrance: ['Maison Éclat', 'Noir & Rose', 'Aurelle', 'Velora', 'Saffron & Sage'],
  'bath-body': ['Pure Petal', 'Rosewater Co', 'Monsoon Botanics', 'Botanica', '28 South'],
  men: ['Urban Stag', 'Indigo Lab', 'Kaveri Naturals', '28 South'],
  wellness: ['Zenith Wellness', 'Monsoon Botanics', 'Botanica', '28 South'],
};

export const brandMenu = {
  key: 'brands', label: 'Brands', to: '/brands', kind: 'brands',
  groups: menu.map((m) => ({ title: m.label, items: brandPools[m.key] })),
  feature: { title: '28 South Originals', sub: 'Our own label, made for you', to: `/brand/${encodeURIComponent('28 South')}`, image: u('photo-1596462502278-27bfdc403348', 600) },
};
