// Edit this file with your real business details. Values starting with "Add" are hidden on the site.
export const company = {
  legalName: '28 SOUTH VENTURES LLP',
  brand: '28 South',
  tagline: 'Beauty, delivered.',
  email: 'care@28south.example',
  phone: '+91 00000 00000',
  address: 'Registered office address, City, State - PIN',
  llpin: 'Add your LLPIN',
  gstin: 'Add your GSTIN',
  hours: 'Mon - Sat, 9:00 AM - 7:00 PM IST',
  social: { instagram: '#', facebook: '#', youtube: '#', x: '#' },
  // SAMPLE store locations: replace or empty this array.
  stores: [
    { name: '28 South Experience Store', city: 'Mumbai', address: 'Sample address, replace in src/data/company.js', phone: '+91 00000 00000', hours: '10:00 AM - 9:00 PM' },
    { name: '28 South Experience Store', city: 'Bengaluru', address: 'Sample address, replace in src/data/company.js', phone: '+91 00000 00000', hours: '10:00 AM - 9:00 PM' },
    { name: '28 South Experience Store', city: 'New Delhi', address: 'Sample address, replace in src/data/company.js', phone: '+91 00000 00000', hours: '10:00 AM - 9:00 PM' },
  ],
  // SAMPLE openings: replace or empty this array.
  roles: [
    { title: 'Beauty Advisor', type: 'Full time', place: 'Retail', blurb: 'Help customers find products they love and keep our stores sparkling.' },
    { title: 'Frontend Engineer (React)', type: 'Full time', place: 'Remote / Hybrid', blurb: 'Build fast, beautiful shopping experiences with React.' },
    { title: 'Supply Chain Associate', type: 'Full time', place: 'Operations', blurb: 'Keep inventory accurate and orders moving to customers on time.' },
  ],
};

export const isSet = (v) => Boolean(v) && !String(v).startsWith('Add');
