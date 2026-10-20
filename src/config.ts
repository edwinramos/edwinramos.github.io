/**
 * ============================================================
 *  SITE CONFIG — every placeholder lives in this file.
 *  Search for "PLACEHOLDER" to find what still needs filling.
 *  See README.md › "Placeholders" for where to get each value.
 * ============================================================
 */

/** Values still containing this marker are treated as "not set". */
const MARK = 'TU-USUARIO';
export const isSet = (v?: string | null): v is string =>
  !!v && v.trim() !== '' && !v.includes(MARK);

export const SITE = {
  // PLACEHOLDER: your public URL. For a repo named <usuario>.github.io → 'https://<usuario>.github.io'
  url: 'https://edwinramos.github.io',
  // Base path. '/' for a <usuario>.github.io repo. For any other repo name use '/<repo-name>' (see README).
  base: '/',
  name: 'Edwin Ramos Madera',
  shortName: 'Edwin Ramos',
  monogram: 'ER',
  email: 'edwinramos.93@gmail.com',
  linkedin: 'https://www.linkedin.com/in/edwin-ramos-madera-29b185123',
  // PLACEHOLDER: your Instagram profile URL, e.g. 'https://www.instagram.com/tu_usuario' (hidden until set)
  instagram: '',
  // PLACEHOLDER: your GitHub profile URL (hidden until set)
  github: 'https://github.com/edwinramos',
  // Optional: path to a CV PDF placed in /public, e.g. '/cv-edwin-ramos.pdf'. Empty = button hidden.
  cvUrl: '',
  // Header availability indicator (set `available: false` to hide the green dot)
  available: true,
  defaultOgImage: '/og-default.png',
};

/**
 * Forms via Formspree free tier (https://formspree.io). FREE: 50 submissions/month.
 * Paste the form ID (the part after /f/ in https://formspree.io/f/xxxxxxx).
 * You can use ONE form for everything: fill only `default` — a hidden field tells you which form was used.
 */
export const FORMS = {
  default: '', // PLACEHOLDER e.g. 'xyzabcd'
  contact: '', // optional: separate form for the contact section
  beta: '', // optional: separate form for beta sign-ups on app pages
};
export const formAction = (kind: keyof typeof FORMS): string | null => {
  const id = FORMS[kind] || FORMS.default;
  return isSet(id) ? `https://formspree.io/f/${id}` : null;
};

/** Cloudflare Web Analytics (free, cookie-less). Script only renders when the token is set. */
export const ANALYTICS = {
  cloudflareToken: '', // PLACEHOLDER from Cloudflare › Web Analytics › Add site › JS snippet "token"
};
