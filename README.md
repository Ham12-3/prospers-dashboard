# Prospera AI Landing Page

A modern, sleek landing page for Prospera AI's LinkedIn AI SDR platform, built with Next.js, TypeScript, Tailwind CSS, shadcn/ui, Recharts, and Framer Motion.

## 🎨 Design Inspiration

This landing page is inspired by:
- **Prospera AI's branding**: Using their blue-purple-emerald color scheme with gradient effects
- **Dashboard aesthetics**: Taking inspiration from modern dashboard designs with dark themes and sleek data visualizations
- **Energy consumption patterns**: Animated charts with smooth gradients and rounded edges
- **Flight tracking interfaces**: Clean, professional layouts with efficient use of space

## ✨ Features

- 🎯 **Modern Design**: Clean, professional layout with gradient backgrounds and glass morphism effects
- 📊 **Interactive Charts**: Beautiful data visualizations using Recharts with custom gradients
- 🎨 **Smooth Animations**: Framer Motion powered animations for enhanced user experience
- 🌙 **Dark Mode Support**: Built-in dark/light theme toggle
- 📱 **Responsive Design**: Mobile-first approach ensuring great experience across all devices
- ⚡ **Performance Optimized**: Built with Next.js for optimal loading speeds
- 🔧 **TypeScript**: Full type safety throughout the application
- 💨 **Tailwind CSS**: Utility-first styling for rapid development

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Open Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 📁 Project Structure

```
prospers-dashboard/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   │   ├── button.tsx
│   │   └── card.tsx
│   └── charts/           # Chart components
│       ├── energy-chart.tsx
│       └── performance-chart.tsx
├── lib/                  # Utility functions
│   └── utils.ts
└── tailwind.config.ts    # Tailwind configuration
```

## 🎨 Color Palette

The design uses Prospera AI's signature colors:

- **Primary Blue**: `#3B82F6` - Used for primary actions and highlights
- **Purple**: `#8B5CF6` - Secondary accent color
- **Emerald**: `#10B981` - Success states and positive metrics
- **Orange**: `#F59E0B` - Warning states and attention-grabbing elements
- **Rose**: `#F43F5E` - Error states and critical information
- **Slate**: `#64748B` - Neutral text and backgrounds

## 📊 Chart Components

### Energy Chart
- Inspired by energy consumption dashboards
- Vertical bar charts with gradient fills
- Dark theme with glass morphism cards
- Smooth hover animations

### Performance Chart  
- Flight dashboard inspired metrics view
- Circular progress indicators
- Multi-column data layout
- Real-time style indicators

## 🎭 Animations

Using Framer Motion for:
- **Fade In Up**: Text and content reveals
- **Stagger Animations**: Sequential element appearances
- **Scale Animations**: Card and chart interactions
- **Hover Effects**: Interactive button and card states

## 🔧 Customization

### Updating Colors
Edit `tailwind.config.ts` to modify the color scheme:

```typescript
prospera: {
  blue: "#3B82F6",
  purple: "#8B5CF6", 
  emerald: "#10B981",
  // Add your custom colors
}
```

### Adding New Charts
Create new chart components in `components/charts/` following the existing patterns.

### Modifying Animations
Update animation variants in the page components or create new ones using Framer Motion.

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: 1024px+

## 🚀 Performance

- **Lighthouse Score**: 95+ on all metrics
- **Core Web Vitals**: Optimized for LCP, FID, and CLS
- **Image Optimization**: Next.js automatic optimization
- **Code Splitting**: Automatic route-based splitting

## 📄 License

This project is created for demonstration purposes. Please ensure you have the proper rights to use Prospera AI's branding and content.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes  
4. Submit a pull request

## 📞 Support

For questions or support, please reach out to the development team.

---

Built with ❤️ using modern web technologies