/*
 * Photos for the preview page only (the registry blocks ship with the
 * placeholder). All from Unsplash under the Unsplash License
 * (https://unsplash.com/license): free to use, no permission needed. Source
 * page and photographer next to each one. Checked at full size for visible
 * brand logos on 23.11.2026; the first office photo (a laptop logo) and a
 * clinic photo (a sign and an air-conditioner logo) were replaced.
 */

const unsplash = (id: string, width = 1600) =>
  `https://images.unsplash.com/photo-${id}?w=${width}&q=80&auto=format&fit=crop`;

/* ---------- Kessler Studio (calm): interiors, light, material ---------- */

export const kessler = {
  // https://unsplash.com/photos/DXPnkL7yDzs, Dan Gold: a sofa by a window, light on the wall
  hero: unsplash("1541616138747-f4a42c7f0668", 2400),
  // https://unsplash.com/photos/fkNqRAboM0s, Paulina Herpel: a room with a wooden floor and a skylight
  light: unsplash("1711891391309-c1f93b463c7e", 2400),
  case: [
    // https://unsplash.com/photos/3jTPSu_sYqQ, rawkkim: a living room with a sliding glass door
    unsplash("1697461881946-a4fda35d01e5", 2000),
    // https://unsplash.com/photos/YAKeU6lc0vo, Declan Sun: light falls through a door into a dark room
    unsplash("1746343365514-0c20c00a4318", 2000),
    // https://unsplash.com/photos/2ZjSja_2EX4, Declan Sun: material samples laid out
    unsplash("1752321531522-20d9c4dc2e0b", 2000),
    // https://unsplash.com/photos/9HZrON_glOY, Matea Brajdić: a plant casts a shadow on a wall
    unsplash("1654179280639-3de6d9d7f996", 2000),
  ],
  rail: [
    // https://unsplash.com/photos/xTaOPMa6wAE, Annie Spratt: beige linen texture
    unsplash("1528458909336-e7a0adfed0a5", 900),
    // https://unsplash.com/photos/-S4pNS9pOcQ, Christian Bass: vertical wooden slats, close up
    unsplash("1636366691562-c4140d9bb7cb", 900),
  ],
  // https://unsplash.com/photos/qPs5Qs6Xcys, Nathan De Fortunato: a white door with a window
  card: unsplash("1668867159932-fb04d3c955d3", 1000),
};

/* ---------- Linden (factual): calm offices and details ---------- */

export const linden = {
  // https://unsplash.com/photos/XKm9AmmSn3I, lim woojung: a bright room with wooden stools and pale blinds
  office: unsplash("1772751541531-e084e8f56630", 2400),
  stack: [
    // https://unsplash.com/photos/n205UbNhy7E, Marissa Grootes: a wireless keyboard on a white surface
    unsplash("1531347118459-c3ea7a5ac61e", 1400),
    // https://unsplash.com/photos/IA4mXpyGbB0, Amihai Loven: a wooden desk with office supplies
    unsplash("1719392848850-59cf57d0e139", 1400),
    // https://unsplash.com/photos/_C0u-d857BY, Adrien Olichon: a white desk next to a white wall
    unsplash("1580315362297-5be36f0de025", 1400),
  ],
  stats: [
    // https://unsplash.com/photos/7NEQ5Tk3xH4, Alex Tyson: a black chair at a white counter
    unsplash("1722348671002-c8c8aa1b7384", 300),
    // https://unsplash.com/photos/zu_sgoe8kxw, Smart Home Office: a black desk in front of a window
    unsplash("1724862873281-238213626373", 300),
  ],
  rail: [
    // https://unsplash.com/photos/P-8FjydEv3I, Bhuwan Bansal: a room with a chair and a window
    unsplash("1726456604802-03cd7494eb47", 900),
    // https://unsplash.com/photos/afFpd6TaLhU, Craig Lovelidge: an office with white desks and black chairs
    unsplash("1637665627832-dcd730049fbb", 900),
  ],
};

/* ---------- components section ---------- */

// The same sofa photo as the Kessler hero: white buttons on a real photo.
export const onMediaPhoto = kessler.hero;
