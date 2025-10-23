# Quick Start Guide - Exofters Website

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Install Dependencies**
```bash
npm install
```

2. **Start Development Server**
```bash
npm start
```
The app will open at [http://localhost:3000](http://localhost:3000)

3. **Build for Production**
```bash
npm run build
```

## 📁 Project Structure

```
src/
├── Components/
│   ├── BackToTop/          # Scroll to top button
│   ├── Contact Us/         # Contact form page
│   ├── FAQ/                # FAQ section
│   ├── Footer/             # Site footer
│   ├── Home/               # Home page with all sections
│   ├── Loading/            # Loading screen
│   ├── NavBar/             # Navigation bar
│   ├── Portfolio/          # Projects showcase
│   ├── Process/            # How we work section
│   ├── Services/           # Services page
│   ├── Teams/              # Team page
│   └── Testimonials/       # Client testimonials
├── Images/                 # All image assets
├── App.js                  # Main app component
├── App.css                 # Global styles
└── index.js                # Entry point
```

## 🎨 Customization Guide

### 1. Update Colors
Edit CSS variables in `src/App.css`:
```css
:root {
  --primary: #1ea78d;
  --primary-dark: #178c75;
  --primary-light: #2bc4a8;
  /* ... more colors */
}
```

### 2. Update Company Info

**Contact Information** - `src/Components/Contact Us/Contact.js`
**Footer Links** - `src/Components/Footer/Footer.js`
**Team Members** - `src/Components/Teams/Teams.js`

### 3. Update Projects
Edit portfolio items in `src/Components/Portfolio/Portfolio.js`

### 4. Update Services
Edit services in `src/Components/Services/Services.js`

### 5. Update Testimonials
Edit testimonials in `src/Components/Testimonials/Testimonials.js`

### 6. Update FAQ
Edit questions in `src/Components/FAQ/FAQ.js`

## 📧 Email Configuration

The contact form uses EmailJS. Update credentials in:
- `src/App.js` - EmailJS initialization
- `src/Components/Contact Us/Contact.js` - Service and template IDs

## 🖼️ Adding Images

1. Place images in `src/Images/`
2. Import in `src/ImageExport.js`
3. Use in components

## 🎯 Key Features

### Home Page Sections (in order)
1. Hero with typing animation
2. Services preview
3. About section with stats
4. Portfolio preview
5. Technology stack
6. Process/How we work
7. Testimonials
8. FAQ
9. Call to action

### Navigation Pages
- Home (/)
- Portfolio (/portfolio)
- Services (/services)
- Team (/teams)
- Contact (/contact)

## 🔧 Common Tasks

### Change Hero Text
File: `src/Components/Home/Home.js`
Look for the `phrases` array

### Update Social Links
Files:
- `src/Components/Footer/Footer.js`
- `src/Components/Teams/Teams.js`

### Modify Loading Time
File: `src/App.js`
Change timeout value (default: 2500ms)

### Adjust Animations
Each component has its own CSS file with animation definitions

## 📱 Responsive Breakpoints

- Desktop: > 1024px
- Tablet: 768px - 1024px
- Mobile: < 768px

## 🎨 Design Tokens

### Spacing Scale
- Small: 20-40px
- Medium: 60-80px
- Large: 100-120px

### Border Radius
- Small: 12px
- Medium: 20px
- Large: 24px

### Shadows
- Light: `0 4px 20px rgba(0, 0, 0, 0.08)`
- Medium: `0 10px 30px rgba(30, 167, 141, 0.15)`
- Heavy: `0 20px 60px rgba(30, 167, 141, 0.2)`

## 🚀 Deployment

### GitHub Pages
Already configured in `package.json`:
```bash
npm run build
# Deploy to GitHub Pages
```

### Other Platforms
Build the project and deploy the `build/` folder to:
- Netlify
- Vercel
- AWS S3
- Any static hosting service

## 🐛 Troubleshooting

### Issue: Images not loading
- Check image paths in `ImageExport.js`
- Ensure images are in `src/Images/`

### Issue: Email not sending
- Verify EmailJS credentials
- Check browser console for errors
- Ensure EmailJS service is active

### Issue: Animations not smooth
- Check browser hardware acceleration
- Reduce animation complexity on older devices

## 📚 Resources

- [React Documentation](https://reactjs.org/)
- [React Router](https://reactrouter.com/)
- [EmailJS Docs](https://www.emailjs.com/docs/)
- [FontAwesome Icons](https://fontawesome.com/icons)

## 💡 Tips

1. Test on multiple devices and browsers
2. Optimize images before adding them
3. Keep animations subtle for better UX
4. Regularly update dependencies
5. Use browser dev tools for debugging

## 🎉 You're Ready!

Your professional software company website is now set up with:
- ✅ Modern, responsive design
- ✅ Smooth animations
- ✅ All essential sections
- ✅ Contact form integration
- ✅ SEO optimization
- ✅ Mobile-friendly navigation

Start customizing and make it your own!
