# Seller Dashboard

A modern, sleek seller dashboard built with Next.js for managing product inventory and AI-powered price optimization. This project was developed as part of the n8n Hackathon.

![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-5.22-2D3748?style=flat-square&logo=prisma)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)

## 🚀 Features

- **Product Management**: View, manage, and organize your product inventory
- **AI Price Optimization**: Receive intelligent pricing suggestions with justifications
- **Featured Products**: Highlight top products with dedicated featured cards
- **Real-time Price Editing**: Update product prices instantly with inline editing
- **Competitor Price Tracking**: Monitor competitor pricing for market insights
- **Stock Level Monitoring**: Track inventory levels across all products
- **Dark Mode UI**: Modern, sleek dark-themed interface

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Prisma ORM](https://www.prisma.io/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Font**: [Geist](https://vercel.com/font)

## 📁 Project Structure

```
seller-dashboard/
├── prisma/
│   └── schema.prisma      # Database schema
├── src/
│   ├── app/
│   │   ├── layout.tsx     # Root layout
│   │   ├── page.tsx       # Main dashboard page
│   │   └── globals.css    # Global styles
│   ├── components/
│   │   ├── ActionButtons.tsx   # Accept/Reject price buttons
│   │   ├── FeaturedCard.tsx    # Featured product display
│   │   ├── Header.tsx          # Dashboard header
│   │   ├── PriceEditor.tsx     # Inline price editing
│   │   ├── ProductRow.tsx      # Product list item
│   │   └── Sidebar.tsx         # Navigation sidebar
│   ├── lib/
│   │   ├── actions.ts     # Server actions for price updates
│   │   └── prisma.ts      # Prisma client instance
│   └── types/
│       └── index.ts       # TypeScript type definitions
├── package.json
└── README.md
```

## 📦 Database Schema

### Products Table
| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| name | String | Product name |
| description | String | Product description |
| current_price | Decimal | Current selling price |
| competitor_price | Decimal | Competitor's price |
| cost_price | Decimal | Product cost |
| image_url | String | Product image URL |
| category | String | Product category |
| stock_level | Integer | Available inventory |
| featured | Boolean | Featured product flag |
| units_sold | Integer | Total units sold |
| units_ordered | Integer | Units on order |

### Optimized Table (AI Suggestions)
| Field | Type | Description |
|-------|------|-------------|
| id | UUID | References product ID |
| optimized_price | BigInt | AI-suggested price |
| justification | String | Reasoning for suggestion |
| created_at | DateTime | Suggestion timestamp |

## 🏁 Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd seller-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="postgresql://user:password@host:5432/database?schema=public"
   DIRECT_URL="postgresql://user:password@host:5432/database?schema=public"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open the dashboard**
   
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## 🔧 Key Features Explained

### Price Optimization Workflow

1. AI analyzes product data, competitor prices, and market trends
2. Optimized prices with justifications are stored in the `optimized` table
3. Sellers can **Accept** (update price) or **Reject** (dismiss suggestion) recommendations
4. All changes are reflected in real-time

### Server Actions

- `updateProductPrice()` - Manually update a product's price
- `acceptOptimizedPrice()` - Accept AI suggestion and update price
- `rejectOptimizedPrice()` - Dismiss AI suggestion without changes

## 🚀 Deployment

### Vercel (Recommended)

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables (`DATABASE_URL`, `DIRECT_URL`)
4. Deploy!

### Other Platforms

This is a standard Next.js application and can be deployed on any platform that supports Node.js:
- Railway
- Render
- AWS
- DigitalOcean

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ for the n8n Hackathon
