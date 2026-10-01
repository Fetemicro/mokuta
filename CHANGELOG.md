# MOKUTA Changelog

## v1.0.0 - LAUNCH READY ✅

### Features
- **Multi-vendor marketplace** - Buyers & sellers discover products/services
- **13 categories** - Electronics, Property, Vehicles, Fashion, Agriculture, Services, Jobs, etc.
- **10 Cameroon regions** with divisions for precise location filtering
- **Free ad posting** - No upfront cost for sellers
- **Admin moderation** - Approve/reject/feature listings before going live
- **Featured ads** - Premium visibility option
- **Bilingual support** - English & French UI
- **Mobile-first** - Fully responsive design
- **Real-time sync** - Supabase backend
- **WhatsApp integration** - Direct seller contact
- **Lost & Found** - Coming soon feature placeholder

### Technical Stack
- Frontend: HTML5 + Vanilla JavaScript + CSS3
- Backend: Supabase (Auth + Database + Storage)
- Storage: Supabase Storage for images
- Hosting: GitHub Pages (free, automatic)
- Languages: JavaScript, CSS, HTML

### Database
- `listings` - All marketplace items
- `profiles` - User accounts & seller info
- RLS policies for security

### Security
- Row-level security on all tables
- Admin verification before moderation
- Phone numbers private (WhatsApp hidden)
- Email verification on signup

### Known Limitations
- Lost & Found feature (UI only, not implemented)
- No payment integration yet
- No reviews/ratings (future v1.1)
- No messaging system (future v1.2)

### Next Steps (v1.1+)
- [ ] Payment integration (MTN Mobile Money / Orange Money)
- [ ] Seller verification badges
- [ ] Review & rating system
- [ ] Search analytics
- [ ] SMS notifications
- [ ] Push notifications
- [ ] Report abuse workflow
