# Contributing to MOKUTA

## For the Community
We welcome bug reports, feature suggestions, and contributions.

### Report Issues
- Go to [Issues](https://github.com/Fetemicro/mokuta/issues)
- Click "New Issue"
- Describe what's happening with screenshots

### Suggest Features
Create an issue with:
- **What** you want
- **Why** it matters for MOKUTA users
- **How** it should work

## For Developers

### Local Setup
```bash
git clone https://github.com/Fetemicro/mokuta.git
cd mokuta
npm install
npm start
# Open http://localhost:8080
```

### Code Guidelines
- Keep it simple - vanilla JS, no frameworks
- Mobile-first responsive design
- Bilingual ready (add to translation object in script.js)
- Security: Never expose API keys (use .env.example)

### Pull Request Process
1. Fork the repo
2. Create feature branch: `git checkout -b feature/my-feature`
3. Test on mobile & desktop
4. Push and create PR
5. We'll review and merge

## Project Structure
```
mokuta/
├── index.html           # Main marketplace page
├── admin.html           # Admin moderation panel  
├── script.js            # All JavaScript logic
├── style.css            # All styling
├── photo-upload.js      # Image upload handler
├── logo.svg             # MOKUTA logo
├── package.json         # Dependencies
└── docs/                # Setup guides
```

## Deployment
- Main branch auto-deploys to GitHub Pages
- No build step needed - pure static files
- Supabase handles backend

### Environment
- Supabase keys are public (publishable key only)
- All sensitive operations use RLS policies
- No secret keys in repo

---

**Thank you for helping MOKUTA grow!** 🚀
