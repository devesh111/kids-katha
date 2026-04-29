# Kids Katha - Next.js Frontend

A modern, dark-themed Next.js application for the Kids Katha storytelling platform. Built with shadcn/ui, Tailwind CSS v4, and JavaScript/JSX.

## 🎨 Features

- **Dark Theme**: Beautiful dark mode with purple/magenta and orange/teal accent colors
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **shadcn/ui Components**: Pre-built, accessible UI components
- **API Routes**: Backend endpoints for categories, stories, and search
- **JWT Authentication**: Secure token-based authentication with HTTP-only cookies
- **Story Access Control**: Free story configuration and subscription-based entitlement gating
- **Audio Playback**: Support for story audio files with language selection
- **Search Functionality**: Full-text search across stories

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ (with npm or bun)
- MySQL database (Prisma configured)
- Environment variables configured

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/devesh111/kids-katha.git
   cd kids-katha
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   bun install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your actual values
   ```

4. **Initialize Prisma** (if database schema needs to be pulled):
   ```bash
   npx prisma db pull
   npx prisma generate
   ```

5. **Start the development server**:
   ```bash
   npm run dev
   # or
   bun dev
   ```

6. **Open in browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
kids-katha/
├── app/
│   ├── api/                    # API routes
│   │   ├── categories/         # GET /api/categories
│   │   ├── stories/[storyId]/  # GET /api/stories/[storyId]
│   │   └── search/             # GET /api/search?q=query
│   ├── categories/             # Categories page
│   ├── login/                  # Login page
│   ├── pricing/                # Pricing page
│   ├── layout.jsx              # Root layout
│   ├── page.jsx                # Home page
│   └── globals.css             # Global styles
├── components/
│   └── ui/                     # shadcn/ui components
├── lib/
│   ├── prisma.js               # Prisma client singleton
│   ├── jwt.js                  # JWT token utilities
│   ├── auth.js                 # Authentication helpers
│   ├── media.js                # Media URL helpers
│   ├── entitlement.js          # Access control logic
│   ├── serializers.js          # Data serializers
│   └── queries/                # Database query functions
│       ├── categories.js
│       ├── stories.js
│       ├── subscriptions.js
│       └── users.js
├── prisma/
│   └── schema.prisma           # Prisma schema (read-only)
├── public/
│   └── images/                 # Static images
├── .env.example                # Environment variables template
├── .gitignore                  # Git ignore rules
├── package.json                # Dependencies
├── next.config.js              # Next.js configuration
├── tailwind.config.js          # Tailwind CSS configuration
└── README.md                   # This file
```

## 🎯 Key Pages

### Home Page (`/`)
- Hero section with gradient background
- Features showcase
- Call-to-action buttons
- Links to categories, login, and pricing

### Categories Page (`/categories`)
- Grid of all story categories
- Story count per category
- Click to browse stories in each category

### Login Page (`/login`)
- Email and password authentication
- Form validation
- Error handling
- Links to signup and password reset

### Pricing Page (`/pricing`)
- Three subscription tiers (Free, Monthly, Yearly)
- Feature comparison
- FAQ section
- Call-to-action buttons

## 🔌 API Endpoints

### GET `/api/categories`
Fetch all story categories with story counts.

**Response**:
```json
{
  "categories": [
    {
      "id": 1,
      "name": "Fairy Tales",
      "story_count": 45
    }
  ]
}
```

### GET `/api/stories/[storyId]`
Fetch a specific story with access control.

**Query Parameters**:
- `storyId` (required): Story ID

**Response**:
```json
{
  "id": 1,
  "title": "Story Title",
  "description": "Story description",
  "category_id": 1,
  "access_level": "free|login_required|subscription_required",
  "audio_files": [...]
}
```

### GET `/api/search`
Search stories by title or description.

**Query Parameters**:
- `q` (required): Search query

**Response**:
```json
{
  "results": [
    {
      "id": 1,
      "title": "Story Title",
      "category_id": 1
    }
  ]
}
```

## 🔐 Authentication

### JWT Tokens
- **Access Token**: 15-minute expiration, stored in HTTP-only cookie
- **Refresh Token**: 30-day expiration, stored in HTTP-only cookie

### Helper Functions

**`getCurrentUser()`**: Get current authenticated user from request
```javascript
const user = await getCurrentUser(request);
```

**`requireUser()`**: Middleware to require authentication
```javascript
const user = await requireUser(request);
```

## 🎨 Design System

### Colors
- **Primary**: Purple (#8B5CF6)
- **Secondary**: Magenta (#EC4899)
- **Accent**: Orange (#F97316)
- **Accent**: Teal (#14B8A6)
- **Background**: Slate-950 (dark)

### Typography
- **Headings**: Bold, gradient text
- **Body**: Slate-300 on dark background
- **Accent**: Purple/pink gradients

### Components
All UI components from shadcn/ui:
- Button, Card, Input, Dialog, Form, etc.
- Fully customizable with Tailwind CSS
- Accessible by default (Radix UI primitives)

## 📦 Dependencies

### Core
- **next**: 14+ (App Router)
- **react**: 18+
- **react-dom**: 18+

### UI & Styling
- **shadcn/ui**: Pre-built components
- **tailwindcss**: Utility-first CSS
- **lucide-react**: Icon library

### Database & Auth
- **@prisma/client**: ORM for database
- **jsonwebtoken**: JWT token creation/verification

### Utilities
- **clsx**: Conditional class names

## 🔧 Configuration

### Environment Variables

Create `.env.local` with:

```bash
# Database
DATABASE_URL="mysql://user:password@localhost:3306/storytime_app"

# JWT Secrets (use long random strings in production)
JWT_ACCESS_SECRET="your-long-random-access-secret"
JWT_REFRESH_SECRET="your-long-random-refresh-secret"

# Media Configuration
MEDIA_BASE_URL="https://media.example.com/"

# Free Stories (comma-separated IDs)
FREE_STORY_IDS="19,22,24,177"

# App Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="Kids Katha"

# Node Environment
NODE_ENV="development"
```

### Tailwind CSS

Configured in `tailwind.config.js` with:
- Dark mode enabled
- Custom colors (purple, magenta, orange, teal)
- Extended spacing and typography

### Next.js

Configured in `next.config.js` with:
- Image optimization
- Font optimization
- API route handling

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push

### Other Platforms

1. Build: `npm run build`
2. Start: `npm start`
3. Set environment variables on platform
4. Deploy built application

## 📝 Development

### Code Style
- JavaScript/JSX (no TypeScript)
- Functional components with hooks
- Heavy commenting for clarity
- Component-based architecture

### Adding New Pages

1. Create file in `app/[page-name]/page.jsx`
2. Use shadcn/ui components
3. Follow existing page structure
4. Add to navigation if needed

### Adding New API Routes

1. Create file in `app/api/[route]/route.js`
2. Export `GET`, `POST`, etc. functions
3. Use database query functions from `lib/queries/`
4. Return JSON responses

### Adding New Components

1. Create file in `components/[type]/[ComponentName].jsx`
2. Use shadcn/ui components as base
3. Add PropTypes or JSDoc comments
4. Export as default

## 🐛 Troubleshooting

### Database Connection Issues
- Verify `DATABASE_URL` in `.env.local`
- Check MySQL server is running
- Ensure database exists and is accessible

### JWT Token Errors
- Verify `JWT_ACCESS_SECRET` and `JWT_REFRESH_SECRET` are set
- Check token expiration times
- Clear cookies and re-authenticate

### Build Errors
- Clear `.next` directory: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check for TypeScript errors (if using TS)

### Styling Issues
- Verify Tailwind CSS is processing files
- Check `globals.css` is imported in layout
- Clear browser cache and rebuild

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [React Documentation](https://react.dev)

## 📄 License

This project is proprietary and confidential.

## 👤 Author

Devesh Pandey (devesh.pandey.1048@gmail.com)

## 🔗 Links

- **GitHub**: [github.com/devesh111/kids-katha](https://github.com/devesh111/kids-katha)
- **Live Demo**: (Coming soon)
- **Documentation**: See `NEXTJS_FRONTEND_APP_DOCUMENTATION_2.md`

---

**Last Updated**: April 29, 2026
