/* Optional listing photo upload/display enhancement. Uses the same Supabase client as script.js. */
(() => {
  const client = db;
  if (!client) return;

  const style = document.createElement('style');
  style.textContent = '.card-image.photo{padding:0;overflow:hidden;background:#eef2f6}.card-image.photo img{display:block;width:100%;height:100%;min-height:170px;object-fit:cover}.photo-help{display:block;margin-top:6px;color:#65748a;font-size:12px}';
  document.head.appendChild(style);

  const ext = (file) => (file.name.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '') || 'jpg';
  const notify = (message) => {
    const toast = document.querySelector('#toast');
    if (toast) { toast.textContent = message; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 3000); }
  };

  async function upload(file, userId) {
    if (!file) return null;
    if (!file.type.startsWith('image/')) throw new Error('Please choose an image file.');
    if (file.size > 5 * 1024 * 1024) throw new Error('Please choose an image smaller than 5 MB.');
    const path = `${userId}/${crypto.randomUUID()}.${ext(file)}`;
    const result = await client.storage.from('listing-images').upload(path, file, { contentType: file.type, upsert: false });
    if (result.error) throw result.error;
    return client.storage.from('listing-images').getPublicUrl(path).data.publicUrl;
  }

  async function enhanceCards() {
    const cards = [...document.querySelectorAll('.listing-card[data-id]')].filter((card) => !card.dataset.photoChecked);
    cards.forEach((card) => { card.dataset.photoChecked = 'true'; });
    for (const card of cards) {
      const { data } = await client.from('listings').select('photo_url').eq('id', card.dataset.id).maybeSingle();
      if (!data?.photo_url) continue;
      const image = card.querySelector('.card-image');
      if (!image) continue;
      image.classList.add('photo');
      image.innerHTML = `<img src="${String(data.photo_url).replace(/"/g, '&quot;')}" alt="Listing photo" loading="lazy">`;
    }
  }

  function installFormHandler(form) {
    if (form.dataset.photoHandler) return;
    form.dataset.photoHandler = 'true';
    const file = form.querySelector('input[name="photo"]');
    file?.insertAdjacentHTML('afterend', '<small class="photo-help">JPG, PNG or WebP · maximum 5 MB</small>');
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      const submit = form.querySelector('button[type="submit"]');
      if (submit) { submit.disabled = true; submit.textContent = 'Submitting…'; }
      try {
        const { data: { user } } = await client.auth.getUser();
        if (!user) throw new Error('Please log in before posting an ad.');
        const payload = Object.fromEntries(new FormData(form));
        const photoUrl = await upload(file?.files?.[0], user.id);
        const listing = {
          seller_id: user.id, title: payload.title, category: payload.category, subcategory: payload.subcategory,
          region: payload.region, department: payload.department, subdivision: payload.subdivision, location: payload.location,
          price: payload.price ? Number(payload.price) : null, description: payload.description, status: 'pending', is_featured: false
        };
        if (photoUrl) listing.photo_url = photoUrl;
        let result = await client.from('listings').insert(listing);
        if (result.error && photoUrl && /photo_url|column/i.test(result.error.message || '')) {
          delete listing.photo_url;
          result = await client.from('listings').insert(listing);
        }
        if (result.error) throw result.error;
        document.querySelector('#modalClose')?.click();
        notify(photoUrl ? 'Ad submitted with your photo.' : 'Ad submitted. It is pending moderator review.');
        setTimeout(() => window.location.reload(), 900);
      } catch (error) {
        console.error(error);
        notify(error.message || 'Could not create listing.');
        if (submit) { submit.disabled = false; submit.textContent = 'Submit for review'; }
      }
    }, true);
  }

  const observer = new MutationObserver(() => {
    const form = document.querySelector('#postForm');
    if (form) installFormHandler(form);
    enhanceCards();
  });
  observer.observe(document.body, { childList: true, subtree: true });
  enhanceCards();
})();
