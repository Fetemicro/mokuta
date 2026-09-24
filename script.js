const SUPABASE_URL = 'https://jgdvbsmyhrpnaqtbneug.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';
const db = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const CATEGORIES = {
  "Phones, Tablets & Accessories": ["Smartphones", "Feature phones", "Tablets", "Phone cases", "Chargers", "Power banks", "Smart watches"],
  "Electronics & Appliances": ["TVs", "Speakers", "Decoders", "Cameras", "Fridges", "Freezers", "Gas cookers", "Blenders", "Fans", "ACs", "Generators"],
  "Computers & Gaming": ["Laptops", "Desktops", "Printers", "Internet routers", "Hard drives", "PS4/PS5", "Games", "Accessories"],
  "Vehicles": ["Cars", "Buses", "Trucks", "Motorbikes", "Tricycles (keke)", "Bicycles", "Boats & Canoes", "Spare parts", "Tires", "Vehicle rentals"],
  "Property - Houses & Land": ["Houses for Sale", "Houses for Rent", "Land for Sale", "Shops for Rent", "Short-let apartments", "Room & Parlour", "Real estate agents"],
  "Home, Furniture & Garden": ["Sofas", "Beds", "Tables", "Chairs", "Wardrobes", "Kitchen utensils", "Building materials (cement, iron)", "Plants & Garden"],
  "Fashion & Beauty": ["Men's wear", "Women's wear", "Kids wear", "Shoes", "Bags", "Wigs & Weaves", "Makeup", "Perfumes", "Watches", "Tailors & Seamstresses"],
  "Health & Personal Care": ["Medicines (pharmacy)", "Supplements", "Gym equipment", "Medical equipment"],
  "Babies & Kids": ["Diapers", "Baby clothes", "Toys", "School supplies", "Baby beds"],
  "Agriculture, Food & Livestock": ["Farm produce", "Live chickens", "Goats", "Pigs", "Fish", "Animal feeds", "Farm tools", "Fertilizer"],
  "Jobs & Vacancies": ["Full-time", "Part-time", "Internship", "Remote", "CVs / Job seekers"],
  "Services & Repairs": ["Plumbing", "Electricians", "Mechanics", "Cleaning", "Catering", "DJ & Events", "Builders", "Phone repairs", "Lessons & Training", "Transport & Logistics"],
  "Sports, Hobbies & Outdoors": ["Football kits", "Gym", "Musical instruments", "Art", "Books", "Party supplies"]
};

const REGIONS = {
  Adamaoua: ['Djérem', 'Faro-et-Déo', 'Mayo-Banyo', 'Mayo-Louti', 'Vina'],
  Centre: ['Haute-Sanaga', 'Lekié', 'Mbam-et-Inoubou', 'Mbam-et-Kim', 'Mfoundi', 'Nyong-et-Kéllé'],
  East: ['Boumba-et-Ngoko', 'Haut-Nyong', 'Kadey', 'Lom-et-Djerem'],
  'Far North': ['Diamaré', 'Logone-et-Chari', 'Mayo-Danay', 'Mayo-Kani', 'Mayo-Sava', 'Mayo-Tsanaga'],
  Littoral: ['Moungo', 'Nkam', 'Sanaga-Maritime', 'Wouri'],
  North: ['Bénoué', 'Faro', 'Mayo-Louti', 'Mayo-Rey'],
  'North-West': ['Boyo', 'Bui', 'Donga-Mantung', 'Menchum', 'Mezam', 'Momo', 'Ngoketunjia'],
  South: ['Dja-et-Lobo', 'Mvila', 'Océan', 'Vallée-du-Ntem'],
  'South-West': ['Fako', 'Koupé-Manengouba', 'Lebialem', 'Manyu', 'Meme', 'Ndian'],
  West: ['Bamboutos', 'Haut-Knam', 'Hauts-Plateaux', 'Koung-Khi', 'Menoua', 'Mifi', 'Ndé', 'Noun']
};

const T = {
  en: {
    browse: 'Browse Listings', categories: 'Categories', post: 'Post Free Ad', headline: 'Find it. Sell it. Move forward.',
    tagline: 'Buy, sell and discover products, services and businesses across Cameroon.', explore: 'Explore listings →',
    lostTitle: 'Lost & Found', lostText: 'Help reconnect what matters.', searchPlaceholder: 'What are you looking for?',
    search: 'Search', allRegions: 'All regions', allCategories: 'All categories', clear: 'Clear filters',
    liveAds: 'Total Live Ads', verified: 'Verified Sellers', regions: 'Regions Covered', marketplace: 'MARKETPLACE',
    latest: 'Latest listings', advertise: 'Advertise Here', featuredSpace: 'Advertise Here - Featured Space',
    featured: 'Featured Ads', discover: 'DISCOVER', shopBy: 'Shop by category', direct: 'Connect directly',
    directText: 'Buyers and sellers connect on their terms.', cameroon: 'Made for Cameroon', cameroonText: 'Find opportunities close to you.',
    safe: 'Built with safety in mind', safeText: 'Report suspicious or misleading listings.',
    footerDesc: 'A Cameroon-first marketplace for products, services, businesses and opportunities.', useful: 'Useful links',
    account: 'Account', contact: 'Contact', legal: 'Legal', terms: 'Terms', privacy: 'Privacy'
  },
  fr: {
    browse: 'Annonces', categories: 'Catégories', post: 'Publier une annonce gratuite', headline: 'Trouvez. Vendez. Avancez.',
    tagline: 'Achetez, vendez et découvrez des produits, services et entreprises partout au Cameroun.', explore: 'Explorer les annonces →',
    lostTitle: 'Objets trouvés', lostText: 'Aidez à retrouver ce qui compte.', searchPlaceholder: 'Que recherchez-vous ?',
    search: 'Rechercher', allRegions: 'Toutes les régions', allCategories: 'Toutes les catégories', clear: 'Effacer',
    liveAds: 'Annonces en ligne', verified: 'Vendeurs vérifiés', regions: 'Régions couvertes', marketplace: 'MARCHÉ',
    latest: 'Dernières annonces', advertise: 'Espace publicitaire', featuredSpace: 'Espace publicitaire - Annonces à la une',
    featured: 'Annonces à la une', discover: 'DÉCOUVRIR', shopBy: 'Acheter par catégorie', direct: 'Contact direct',
    directText: 'Acheteurs et vendeurs échangent directement.', cameroon: 'Pensé pour le Cameroun', cameroonText: 'Trouvez des opportunités près de chez vous.',
    safe: 'La sécurité avant tout', safeText: 'Signalez les annonces suspectes.',
    footerDesc: 'Une marketplace camerounaise pour les produits, services, entreprises et opportunités.', useful: 'Liens utiles',
    account: 'Compte', contact: 'Contact', legal: 'Juridique', terms: 'Conditions', privacy: 'Confidentialité'
  }
};

let lang = 'en';
let items = [];
let user = null;
let profile = null;

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const esc = (s = '') => String(s).replace(/[&<>"']/g, (char) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#039;'
}[char]));

const toast = (message) => {
  const el = $('#toast');
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => el.classList.remove('show'), 2800);
};

const open = (html) => {
  $('#modalContent').innerHTML = html;
  $('#modalBackdrop').classList.add('open');
};

const close = () => $('#modalBackdrop').classList.remove('open');

const price = (value) => value ? `${new Intl.NumberFormat('fr-FR').format(Number(value))} FCFA` : 'Price on request';

function empty(title, desc = '') {
  return `<div class="empty-state"><strong>${esc(title)}</strong><span>${esc(desc)}</span></div>`;
}

function card(item) {
  return `
    <article class="listing-card ${item.is_featured ? 'featured' : ''}" data-id="${item.id}">
      <div class="card-image">No photo added</div>
      <div class="card-body">
        ${item.is_featured ? '<span class="badge">FEATURED</span>' : ''}
        <h3>${esc(item.title)}</h3>
        <div class="price">${price(item.price)}</div>
        <div class="card-meta">${esc(item.location || 'Cameroon')} · ${esc(item.category)}</div>
      </div>
    </article>
  `;
}

function translate() {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    if (T[lang][key]) el.textContent = T[lang][key];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.dataset.i18nPlaceholder;
    if (T[lang][key]) el.placeholder = T[lang][key];
  });
  $('#accountBtn').textContent = user
    ? (lang === 'fr' ? 'Compte / Déconnexion' : 'Account / Logout')
    : (lang === 'fr' ? 'Connexion / Inscription' : 'Login / Register');
}

function renderCategories() {
  const icons = ['▣', '◈', '▤', '◇', '⌂', '▦', '✦', '＋', '♧', '◉', '▰', '⚒', '⚽'];
  $('#categoryGrid').innerHTML = Object.entries(CATEGORIES).map(([name, subcats], index) => `
    <button class="category-card" data-cat="${esc(name)}">
      <span class="category-icon">${icons[index % icons.length]}</span>
      <strong>${esc(name)}</strong>
      <small>${subcats.length} subcategories</small>
    </button>
  `).join('');

  $$('.category-card').forEach((button) => {
    button.onclick = () => {
      $('#categoryFilter').value = button.dataset.cat;
      renderListings();
      document.getElementById('browse').scrollIntoView({ behavior: 'smooth' });
    };
  });
}

function renderListings() {
  const q = $('#searchInput').value.toLowerCase().trim();
  const r = $('#regionFilter').value;
  const c = $('#categoryFilter').value;

  const visible = items.filter((item) => {
    if (item.status !== 'approved') return false;
    const searchable = [item.title, item.description, item.category, item.subcategory, item.location, item.region].join(' ').toLowerCase();
    const matchesQuery = !q || searchable.includes(q);
    const matchesRegion = !r || item.region === r;
    const matchesCategory = !c || item.category === c;
    return matchesQuery && matchesRegion && matchesCategory;
  });

  $('#resultLabel').textContent = visible.length ? `${visible.length} result${visible.length === 1 ? '' : 's'}` : '';

  if (!visible.length) {
    const emptyText = q || r || c
      ? (lang === 'fr' ? 'Aucun résultat trouvé' : 'No results found')
      : (lang === 'fr' ? 'Aucune annonce pour le moment' : 'No listings yet. Be the first to post!');
    $('#listingGrid').innerHTML = empty(emptyText, q || r || c ? 'Try another search or filter.' : '');
  } else {
    $('#listingGrid').innerHTML = visible.map(card).join('');
  }

  const featured = visible.filter((item) => item.is_featured);
  $('#featuredGrid').innerHTML = featured.length
    ? featured.map(card).join('')
    : empty(lang === 'fr' ? 'Aucune annonce à la une' : 'No featured ads yet', 'Featured ads appear after payment verification and admin approval.');

  $$('.listing-card').forEach((element) => {
    element.onclick = () => detail(items.find((item) => item.id === element.dataset.id));
  });

  $('#liveCount').textContent = visible.length;
  $('#sellerCount').textContent = new Set(visible.map((item) => item.seller_id)).size;
  $('#regionCount').textContent = new Set(visible.map((item) => item.region).filter(Boolean)).size;
}

async function fetchProfile(userId) {
  const { data, error } = await db.from('profiles').select('*').eq('id', userId).maybeSingle();
  if (error) {
    console.error(error);
    return null;
  }
  return data;
}

async function loadListings() {
  const { data, error } = await db.from('listings').select('*').order('created_at', { ascending: false });
  if (error) {
    console.error(error);
    items = [];
    renderListings();
    return;
  }
  items = data || [];
  renderListings();
}

async function checkSession() {
  const { data: { session }, error } = await db.auth.getSession();
  if (error) {
    console.error(error);
    user = null;
    profile = null;
    return;
  }
  user = session?.user || null;
  profile = user ? await fetchProfile(user.id) : null;
  translate();
}

function isAdminUser() {
  if (!user) return false;
  const roleFromMeta = user.app_metadata?.role || profile?.role;
  return roleFromMeta === 'admin';
}

async function updateListingStatus(id, nextStatus) {
  const { error } = await db.from('listings').update({ status: nextStatus }).eq('id', id);
  if (error) {
    console.error(error);
    toast(error.message || 'Could not update listing status.');
    return;
  }
  toast(`Listing ${nextStatus}.`);
  await loadListings();
  await adminDashboard();
}

async function adminDashboard() {
  if (!isAdminUser()) {
    toast('Admin access required.');
    return;
  }

  open(`
    <h2>Admin dashboard</h2>
    <p class="lead">Moderate product listings before they go live.</p>
    <div id="adminQueue"></div>
  `);

  const queue = $('#adminQueue');
  const { data, error } = await db.from('listings').select('*').in('status', ['pending', 'rejected']).order('created_at', { ascending: false });

  if (error) {
    console.error(error);
    queue.innerHTML = empty('Could not load listings', 'Please refresh and try again.');
    return;
  }

  const rows = data || [];

  if (!rows.length) {
    queue.innerHTML = empty('No pending listings', 'New submissions will appear here.');
    return;
  }

  queue.innerHTML = rows.map((item) => `
    <div class="admin-item" style="display:flex;justify-content:space-between;gap:12px;padding:12px 0;border-bottom:1px solid #e5e7eb;align-items:center;">
      <div style="min-width:0;">
        <strong>${esc(item.title)}</strong><br>
        <span style="font-size:12px;color:#667085;">${esc(item.category)} · ${esc(item.region || item.location || 'Cameroon')} · ${esc(item.status)}</span>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        <button class="button" data-admin-action="approve" data-id="${item.id}">Approve</button>
        <button class="button danger" data-admin-action="reject" data-id="${item.id}">Reject</button>
      </div>
    </div>
  `).join('');

  queue.querySelectorAll('[data-admin-action]').forEach((button) => {
    button.onclick = async () => {
      const action = button.dataset.adminAction;
      const id = Number(button.dataset.id);
      await updateListingStatus(id, action === 'approve' ? 'approved' : 'rejected');
    };
  });
}

function guestRequiredModal() {
  open(`
    <h2>Account required</h2>
    <p class="lead">You need a MOKUTA account to post an ad. Please log in or create an account.</p>
    <div class="form-grid">
      <button class="button" id="goLogin">Login</button>
      <button class="button button-gold" id="goRegister">Create Account</button>
    </div>
  `);
  $('#goLogin').onclick = () => auth('login');
  $('#goRegister').onclick = () => auth('register');
}

function auth(mode = 'login') {
  open(mode === 'login' ? `
    <h2>Welcome to MOKUTA</h2>
    <p class="lead">Log in to connect, contact sellers or post an ad.</p>
    <form id="authForm" class="form-grid">
      <div class="field"><label>Email</label><input type="email" name="email" required></div>
      <div class="field"><label>Password</label><input type="password" name="password" required></div>
      <button class="button">Login</button>
    </form>
    <p class="switch-auth">New to MOKUTA? <button id="switch">Create an account</button></p>
  ` : `
    <h2>Create your account</h2>
    <p class="lead">Join MOKUTA and start moving forward.</p>
    <form id="authForm" class="form-grid">
      <div class="form-grid two">
        <div class="field"><label>Full name</label><input name="full_name" required></div>
        <div class="field"><label>Phone (WhatsApp)</label><input name="phone" placeholder="6xxxxxxxx" required></div>
      </div>
      <div class="field"><label>Email</label><input type="email" name="email" required></div>
      <div class="field"><label>Password</label><input type="password" name="password" minlength="6" required></div>
      <button class="button">Create Account</button>
    </form>
    <p class="switch-auth">Already registered? <button id="switch">Login</button></p>
  `);

  $('#switch').onclick = () => auth(mode === 'login' ? 'register' : 'login');

  $('#authForm').onsubmit = async (event) => {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(event.target));

    try {
      let result;
      if (mode === 'login') {
        result = await db.auth.signInWithPassword({ email: payload.email, password: payload.password });
      } else {
        result = await db.auth.signUp({
          email: payload.email,
          password: payload.password,
          options: {
            emailRedirectTo: 'https://fetemicro.github.io/mokuta/',
            data: {
              full_name: payload.full_name,
              phone: payload.phone
            }
          }
        });
      }

      if (result.error) throw result.error;
      user = result.data.user;
      profile = await fetchProfile(user.id);
      close();
      translate();
      toast(mode === 'login' ? 'Logged in successfully.' : 'Account created successfully.');
      await loadListings();
    } catch (error) {
      console.error(error);
      toast(error.message || 'Authentication error.');
    }
  };
}

async function logout() {
  const { error } = await db.auth.signOut();
  if (error) {
    console.error(error);
    toast('Logout failed.');
    return;
  }

  user = null;
  profile = null;
  close();
  translate();
  toast('You have been logged out.');
}

function accountPanel() {
  if (!user) {
    auth('login');
    return;
  }

  const adminButton = isAdminUser()
    ? '<button class="button" id="adminBtn" style="margin-top:12px">Admin Dashboard</button>'
    : '';

  open(`
    <h2>Your account</h2>
    <p class="lead">${esc(profile?.full_name || user.email)}</p>
    <div class="notice">${esc(user.email)}<br>${esc(profile?.phone || '')}</div>
    <p class="muted">Your registered phone is used for seller contact and is never shown publicly on listings.</p>
    <button class="button danger" id="logout">Logout</button>
    ${adminButton}
  `);

  $('#logout').onclick = logout;
  $('#adminBtn')?.addEventListener('click', adminDashboard);
}

function locationFields() {
  return `
    <div class="form-grid two">
      <div class="field">
        <label>Region</label>
        <select id="pRegion" name="region" required>
          <option value="">Select region</option>
          ${Object.keys(REGIONS).map((region) => `<option value="${region}">${region}</option>`).join('')}
        </select>
      </div>
      <div class="field">
        <label>Division / Department</label>
        <select id="pDept" name="department" required disabled>
          <option value="">Select region first</option>
        </select>
      </div>
    </div>
    <div class="form-grid two">
      <div class="field"><label>Subdivision / Arrondissement</label><input name="subdivision" placeholder="e.g. Buea" required></div>
      <div class="field"><label>City / Town / Local area</label><input name="location" placeholder="e.g. Molyko" required></div>
    </div>
  `;
}

function postAd() {
  if (!user) {
    guestRequiredModal();
    return;
  }

  open(`
    <h2>Post a free ad</h2>
    <p class="lead">Your listing will be reviewed before it goes live.</p>
    <form id="postForm" class="form-grid">
      <div class="field"><label>Title</label><input name="title" maxlength="90" required></div>
      <div class="form-grid two">
        <div class="field">
          <label>Category</label>
          <select name="category" id="pCat" required>
            <option value="">Select category</option>
            ${Object.keys(CATEGORIES).map((category) => `<option value="${category}">${category}</option>`).join('')}
          </select>
        </div>
        <div class="field">
          <label>Subcategory</label>
          <select name="subcategory" id="pSub" required disabled>
            <option value="">Select category first</option>
          </select>
        </div>
      </div>
      ${locationFields()}
      <div class="form-grid two">
        <div class="field"><label>Price (FCFA)</label><input name="price" type="number" min="0"></div>
        <div class="field"><label>Photo (optional)</label><input name="photo" type="file" accept="image/*"></div>
      </div>
      <div class="field"><label>Description</label><textarea name="description" required></textarea></div>
      <div class="notice">Your registered phone is used for contact and is not public.</div>
      <button class="button">Submit for review</button>
    </form>
  `);

  $('#pCat').onchange = (event) => {
    const selectedCategory = event.target.value;
    const subcats = CATEGORIES[selectedCategory] || [];
    $('#pSub').disabled = !selectedCategory;
    $('#pSub').innerHTML = `<option value="">Select subcategory</option>${subcats.map((item) => `<option value="${item}">${item}</option>`).join('')}`;
  };

  $('#pRegion').onchange = (event) => {
    const selectedRegion = event.target.value;
    const departments = REGIONS[selectedRegion] || [];
    $('#pDept').disabled = !selectedRegion;
    $('#pDept').innerHTML = `<option value="">Select department</option>${departments.map((item) => `<option value="${item}">${item}</option>`).join('')}`;
  };

  $('#postForm').onsubmit = async (event) => {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(event.target));

    const insertData = {
      seller_id: user.id,
      title: payload.title,
      category: payload.category,
      subcategory: payload.subcategory,
      region: payload.region,
      department: payload.department,
      subdivision: payload.subdivision,
      location: payload.location,
      price: payload.price ? Number(payload.price) : null,
      description: payload.description,
      status: 'pending',
      is_featured: false
    };

    try {
      const { error } = await db.from('listings').insert(insertData);
      if (error) throw error;
      close();
      toast('Ad submitted. It is pending moderator review.');
      await loadListings();
    } catch (error) {
      console.error(error);
      toast(error.message || 'Could not create listing.');
    }
  };
}

function detail(item) {
  if (!item) return;
  open(`
    <h2>${esc(item.title)}</h2>
    <div class="detail-price">${price(item.price)}</div>
    <p class="muted">${esc(item.category)} · ${esc(item.subcategory)}<br>📍 ${esc(item.location)}, ${esc(item.region || 'Cameroon')}</p>
    <p>${esc(item.description)}</p>
    ${user ? '<div class="contact-box"><strong>Seller contact is available to logged-in users.</strong><p class="muted">WhatsApp and chat will be enabled in the next production step.</p></div>' : '<button class="button" id="detailLogin">Login to contact seller</button>'}
    <button class="button" style="background:#eef2f6;color:#334;margin-top:12px" id="reportBtn">Report Listing</button>
  `);

  $('#detailLogin')?.addEventListener('click', () => auth('login'));
  $('#reportBtn')?.addEventListener('click', () => toast('Thank you. This listing has been flagged for review.'));
}

function initFilters() {
  Object.keys(REGIONS).forEach((region) => {
    $('#regionFilter').insertAdjacentHTML('beforeend', `<option value="${region}">${region}</option>`);
  });
  Object.keys(CATEGORIES).forEach((category) => {
    $('#categoryFilter').insertAdjacentHTML('beforeend', `<option value="${category}">${category}</option>`);
  });
}

function bindEvents() {
  $('#searchForm').onsubmit = (event) => {
    event.preventDefault();
    renderListings();
    $('#listingSection').scrollIntoView({ behavior: 'smooth' });
  };

  $('#clearFilters').onclick = () => {
    $('#searchInput').value = '';
    $('#regionFilter').value = '';
    $('#categoryFilter').value = '';
    renderListings();
  };

  $('#regionFilter').onchange = renderListings;
  $('#categoryFilter').onchange = renderListings;

  $('#postBtn').onclick = postAd;
  $('#heroPost').onclick = postAd;
  $('#accountBtn').onclick = accountPanel;
  $('#footerPost').onclick = (event) => {
    event.preventDefault();
    postAd();
  };
  $('#footerAccount').onclick = (event) => {
    event.preventDefault();
    accountPanel();
  };

  $('#lostBtn').onclick = () => open('<h2>MOKUTA Lost &amp; Found</h2><p class="lead">MOKUTA Lost &amp; Found is coming soon.</p>');
  $('#modalClose').onclick = close;
  $('#modalBackdrop').onclick = (event) => {
    if (event.target.id === 'modalBackdrop') close();
  };

  $('#menuToggle').onclick = () => $('#mobileMenu').classList.toggle('open');
  $('#language').onchange = (event) => {
    const chosen = event.target.value;
    if (chosen === 'auto') {
      localStorage.removeItem('mokuta_lang');
      lang = (navigator.language || '').toLowerCase().startsWith('fr') ? 'fr' : 'en';
    } else {
      lang = chosen;
      localStorage.setItem('mokuta_lang', chosen);
    }
    translate();
  };
}

async function boot() {
  lang = localStorage.getItem('mokuta_lang') || ((navigator.language || '').toLowerCase().startsWith('fr') ? 'fr' : 'en');
  $('#year').textContent = new Date().getFullYear();
  initFilters();
  renderCategories();
  bindEvents();
  translate();
  await checkSession();
  await loadListings();
}

window.addEventListener('DOMContentLoaded', boot);
