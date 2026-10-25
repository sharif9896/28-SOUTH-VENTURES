import { u } from './img.js';
import { menu, brandPools, labelOf, nounOf } from './menu.js';

// The demo catalog is generated from the menu so every menu item has products behind it.
// Replace this with your real product list or an API call when you go live.

const catMeta = {
  makeup: {
    price: [199, 1899],
    sizes: ['3.5 g', '4 g', '5 ml', '9 g', '10 ml', '1 pc'],
    mods: ['Velvet Matte', 'Silk Finish', 'Glow Boost', 'Satin Luxe', 'Blur Effect', 'Pure Pigment', 'Soft Focus', 'Everyday Wear'],
    pool: ['photo-1596462502278-27bfdc403348', 'photo-1586495777744-4413f21062fa', 'photo-1522335789203-aabd1fc54bc9', 'photo-1512496015851-a90fb38ba796', 'photo-1487412947147-5cebf100ffc2', 'photo-1631214524020-7e18db9a8f92'],
    blurb: 'Richly pigmented, comfortable to wear and made for all-day colour.',
    how: 'Apply to clean, prepped skin and build coverage gradually. Remove with a gentle makeup remover at the end of the day.',
    ingredients: 'Key ingredients: vitamin E and jojoba oil. See the pack for the full ingredient list.',
  },
  skin: {
    price: [249, 1799],
    sizes: ['30 ml', '50 ml', '100 ml', '75 g', '15 ml', '200 ml'],
    mods: ['Hydra Glow', 'Dew Drop', 'Barrier Care', 'Clear Balance', 'Radiance', 'Daily Calm', 'Pure Renew', 'Cloud Soft'],
    pool: ['photo-1556228720-195a672e8a03', 'photo-1620916566398-39f1143ab7be', 'photo-1556228578-0d85b1a4d571', 'photo-1571781926291-c477ebfd024b', 'photo-1570172619644-dfd03ed5d881', 'photo-1608248543803-ba4f8c70ae0b'],
    blurb: 'A gentle, well-balanced formula designed to fit easily into your daily skincare routine.',
    how: 'Use on clean skin as part of your morning or evening routine. Patch test before first use and avoid contact with eyes.',
    ingredients: 'Key ingredients: hyaluronic acid, niacinamide and aloe vera. See the pack for the full ingredient list.',
  },
  hair: {
    price: [199, 1499],
    sizes: ['100 ml', '200 ml', '250 ml', '300 ml', '150 ml', '1 pc'],
    mods: ['Argan Repair', 'Silk Smooth', 'Root Strength', 'Moisture Lock', 'Shine Boost', 'Herbal Blend', 'Frizz Control', 'Deep Nourish'],
    pool: ['photo-1522337360788-8b13dee7a37e', 'photo-1535585209827-a15fcdbc4c2d', 'photo-1598440947619-2c35fc9aa908', 'photo-1526045478516-99145907023c', 'photo-1560869713-7d0a29430803'],
    blurb: 'Formulated to cleanse, nourish and care for your hair, leaving it soft and manageable.',
    how: 'Apply to damp or dry hair as directed on the pack, massage gently and rinse or style as required.',
    ingredients: 'Key ingredients: argan oil, bhringraj and amla extracts. See the pack for the full ingredient list.',
  },
  fragrance: {
    price: [399, 3999],
    sizes: ['30 ml', '50 ml', '100 ml', '150 ml', '12 ml', '3 x 30 ml'],
    mods: ['Midnight Bloom', 'Citrus Splash', 'Amber Noir', 'Velvet Rose', 'Ocean Drift', 'Golden Hour', 'Wild Jasmine', 'Cedar & Musk'],
    pool: ['photo-1541643600914-78b084683601', 'photo-1594035910387-fea47794261f', 'photo-1592945403244-b3fbafd7f539', 'photo-1523293182086-7651a899d37f', 'photo-1615634260167-c8cdede054de'],
    blurb: 'A long-lasting fragrance with a layered top, heart and base for a memorable first impression.',
    how: 'Spray on pulse points from a short distance. Keep away from eyes and flames and store away from direct sunlight.',
    ingredients: 'Fragrance notes vary by product. See the pack for the full ingredient list.',
  },
  'bath-body': {
    price: [149, 999],
    sizes: ['100 ml', '200 ml', '250 ml', '400 ml', '75 g', '1 set'],
    mods: ['Coconut Milk', 'Shea Butter', 'Rose Petal', 'Coffee Buff', 'Vanilla Cream', 'Lavender Calm', 'Citrus Zest', 'Oat & Honey'],
    pool: ['photo-1570194065650-d99fb4b8ccb0', 'photo-1612817288484-6f916006741a', 'photo-1608248543803-ba4f8c70ae0b', 'photo-1556228720-195a672e8a03', 'photo-1571781926291-c477ebfd024b'],
    blurb: 'Pampering care that leaves skin feeling soft, smooth and lightly scented.',
    how: 'Use during or after your bath as directed. Rinse off if required and avoid contact with eyes.',
    ingredients: 'Key ingredients: shea butter, coconut oil and vitamin E. See the pack for the full ingredient list.',
  },
  men: {
    price: [149, 1299],
    sizes: ['50 ml', '100 ml', '150 ml', '60 g', '30 ml', '1 pc'],
    mods: ['Sharp Edge', 'Cedar Fresh', 'Charcoal Clean', 'Ocean Cool', 'Smooth Shave', 'Rugged Care', 'Daily Fresh', 'Stag Classic'],
    pool: ['photo-1621607512214-68297480165e', 'photo-1503951914875-452162b0f3f1', 'photo-1585751119414-ef2636f8aede', 'photo-1626808642875-0aa545482dfb'],
    blurb: 'Simple, effective grooming made for daily use and a clean, confident look.',
    how: 'Apply to clean skin or beard as directed on the pack. For external use only.',
    ingredients: 'Key ingredients: charcoal, tea tree and menthol. See the pack for the full ingredient list.',
  },
  wellness: {
    price: [299, 2999],
    sizes: ['30 tabs', '60 tabs', '500 g', '10 ml', '25 bags', '1 pc'],
    mods: ['Zen Daily', 'Pure Balance', 'Calm Ritual', 'Active Day', 'Green Leaf', 'Daily Boost', 'Quiet Evening', 'Fresh Start'],
    pool: ['photo-1544367567-0f2fcb009e0b', 'photo-1505576399279-565b52d4ac71', 'photo-1515377905703-c4788e51af15', 'photo-1556228578-0d85b1a4d571'],
    blurb: 'Thoughtfully made self-care for your everyday wellbeing routine.',
    how: 'Use as directed on the pack. Supplements are not a substitute for a balanced diet; consult your doctor if you have a medical condition.',
    ingredients: 'See the pack for the full ingredient and nutrition information.',
  },
};

function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const categories = menu.map((m) => ({
  slug: m.key, name: m.label, emoji: m.emoji, blurb: m.blurb,
  image: u(catMeta[m.key].pool[0], 500),
  groups: m.groups.map((g) => g.title),
  subs: m.groups.flatMap((g) => g.items.map(labelOf)),
}));

export const products = [];
let id = 1;
menu.forEach((cat) => {
  const meta = catMeta[cat.key];
  const brandsHere = brandPools[cat.key];
  cat.groups.forEach((g) => {
    g.items.forEach((raw) => {
      const sub = labelOf(raw);
      const noun = nounOf(raw);
      for (let k = 0; k < 3; k++) {
        const r = mulberry32(id * 7919 + k * 31);
        const brand = brandsHere[Math.floor(r() * brandsHere.length)];
        const mod = meta.mods[(id + k * 3) % meta.mods.length];
        const price = Math.max(99, Math.round((meta.price[0] + r() * (meta.price[1] - meta.price[0])) / 10) * 10 - 1);
        const d = 0.08 + r() * 0.42;
        let mrp = Math.round(price / (1 - d) / 10) * 10;
        if (mrp <= price) mrp = price + 100;
        const reviews = Math.floor(40 + r() * r() * 9000);
        const rating = Math.round((3.8 + r() * 1.0) * 10) / 10;
        const isNew = r() > 0.86;
        const offPct = Math.round(((mrp - price) / mrp) * 100);
        const badge = reviews > 5000 ? 'Bestseller' : isNew ? 'New' : offPct >= 38 ? 'Hot Deal' : null;
        const pool = meta.pool;
        products.push({
          id: id++,
          name: `${mod} ${noun}`,
          brand, category: cat.key, group: g.title, sub,
          price, mrp, rating, reviews, badge, isNew,
          size: meta.sizes[(id + k) % meta.sizes.length],
          image: u(pool[(id + k) % pool.length], 700),
          images: [0, 1, 2].map((i) => u(pool[(id + k + i) % pool.length], 900)),
          desc: `${mod} ${noun} by ${brand}. ${meta.blurb}`,
          how: meta.how,
          ingredients: meta.ingredients,
        });
      }
    });
  });
});

export const brands = [...new Set(Object.values(brandPools).flat())].sort((a, b) => a.localeCompare(b));
export const getProduct = (pid) => products.find((p) => p.id === Number(pid));
export const discount = (p) => Math.round(((p.mrp - p.price) / p.mrp) * 100);
export const inr = (n) => '₹' + Number(n).toLocaleString('en-IN');
