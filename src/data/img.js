// Image helper. All photos are Unsplash URLs; swap for your own files in /public if you prefer.
export const u = (id, w = 700) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
