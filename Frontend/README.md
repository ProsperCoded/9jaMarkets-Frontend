# 9jaMarkets Frontend

A comprehensive e-commerce platform connecting Nigerian markets, merchants, and customers. Built with React and modern web technologies.

## 🌟 Features

- **Market Directory**: Browse markets across Nigerian states
- **Product Catalog**: View and search products by categories
- **Authentication**: Google Sign-in and traditional auth methods
- **Merchant Dashboard**: Complete vendor management system
- **Interactive UI**: Modern, responsive design with Tailwind CSS
- **Real-time Updates**: Live product and market information
- **Payment Integration**: Secure payment processing
- **Bookmarking System**: Save favorite products and markets

## 🛠 Tech Stack

- **Framework**: React 18.3
- **Routing**: React Router v6
- **Styling**: 
  - Tailwind CSS
  - Shadcn UI Components
  - DaisyUI
- **State Management**: React Context API
- **Authentication**: JWT + Google OAuth
- **Charts**: Chart.js with React-Chartjs-2
- **Form Handling**: Native React forms
- **API Integration**: Axios
- **Build Tool**: Vite
- **Code Quality**: ESLint

## 📁 Project Structure 
```
Frontend/
├── src/
│   ├── components/         # Reusable UI components
│   ├── components-utils/   # Utility components
│   ├── contexts/           # React Context providers
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions and API calls
│   ├── pages/              # Page components
│   └── assets/             # Static assets
├── scripts/                # Build and utility scripts
├── public/                 # Public assets
└── config/                 # Configuration files
```

## 🚀 Getting Started

1. **Clone the repository**

```bash
git clone https://github.com/Psybah/9ja_markets.git
cd Frontend
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**
Create a `.env` file:

```env
VITE_SERVER_URL=your_backend_url
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

4. **Start development server**

```bash
npm run dev
```

## 📦 Build

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## 🧪 Testing

```bash
npm run test
```

## 🔑 Environment Variables

- `VITE_SERVER_URL`: Backend API URL
- `VITE_GOOGLE_CLIENT_ID`: Google OAuth client ID
- `VITE_INTERCOM_APP_ID`: Intercom integration ID

## 📱 Key Features Implementation

### Authentication Flow
- Google OAuth integration
- JWT token management
- Protected routes
- Role-based access control

### Market Directory
- State-wise market listing
- Market search and filtering
- Market details view
- Interactive market maps

### Product Management
- Category-based organization
- Product search
- Image optimization
- Pricing information
- Stock management

### Merchant Dashboard
- Sales analytics
- Product management
- Order tracking
- Customer management
- Advertisement placement

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support, email 9ijamarkets@gmail.com.
