export const SERVER_URL =
  "https://9ja-market-backend-production.up.railway.app/api/v1/";
// export const SERVER_URL = "http://localhost:3100/api/v1/";
export const GOOGLE_URL = `${SERVER_URL}auth/customer/google`;
// 3 Days for access token
export const ACCESS_TOKEN_DURATION = 3;
// 14 Days for refresh token
export const REFRESH_TOKEN_DURATION = 14;

// ? This is what the server currently supports
export const MERCHANT_CATEGORIES = [
  "GROCERY",
  "PHARMACY",
  "RESTAURANT",
  "BAKERY",
  "CLOTHING",
  "ELECTRONICS",
  "FURNITURE",
  "HARDWARE",
  "SPORTS",
  "TOYS",
];

// !Don't change AND => &
export const PRODUCT_CATEGORIES = [
  "EDUCATION AND STATIONERY",
  "REAL ESTATE AND HOUSING",
  "EVENTS AND ENTERTAINMENT",
  "TECHNOLOGY SERVICES",
  "CULTURAL EXPERIENCES",
  "FOOD AND GROCERIES",
  "ELECTRONICS AND GADGETS",
  "FASHION AND ACCESSORIES",
  "HEALTH AND WELLNESS",
  "HOME AND LIVING",
  "AUTOMOBILE NEEDS",
  "TRADITIONAL CRAFTS",
  "SPORTS AND OUTDOOR",
  "KIDS AND BABY PRODUCTS",
];

// * Featured market favored over others(in this order)
export const FEATURED_MARKET_NAMES = [
  "Alaba International Market",
  "Balogun Market",
  "Idumota Market",
  "Ladipo Market",
  "Wuse Market",
  "Onitsha Main Market",
  "Ariaria International Market",
  "Yankaba Market",
  "Mile 1 Market",
  "Gbagi International Market",
  "Babbar Kasuwa Market",
  "Monday Market",
];

export const FEATURED_MALLS_NAMES = [
  "Ikeja City Mall",
  "Jabi Lake Mall",
  "Ado Bayero Mall",
  "Jericho Mall",
  "Polo Park Mall",
  "Calabar Mall",
  "Legacy Mall Benin",
  "Manga Plaza Mall",
];
export const plans = {
  free: {
    id: "free",
    name: "Free Plan",
    price: 0,
    level: 0,
    duration: "3 days",
    benefits: [
      "Basic product listing",
      "Standard search result placement",
      "Access to standard analytics",
    ],
  },
  standard: {
    id: "standard",
    name: "Standard Plan",
    price: 3000,
    level: 1,
    duration: "7 days",
    benefits: [
      "Enhanced product visibility",
      "Priority placement in search results",
      "Access to detailed analytics",
      "Eligibility for promotional campaigns",
    ],
  },
  premium: {
    id: "premium",
    name: "Premium Plan",
    price: 5000,
    level: 2,
    duration: "30 days",
    benefits: [
      "Maximum product visibility",
      "Top-tier placement in search results",
      "Comprehensive analytics and reporting",
      "Inclusion in premium promotional campaigns",
      "Access to advanced seller tools",
    ],
  },
  boost: {
    id: "boost",
    name: "Boost Plan",
    price: 10000,
    level: 3,
    duration: "30 days",
    benefits: [
      "Exclusive product placement on homepage",
      "Featured in targeted email campaigns",
      "Dedicated account support",
      "Access to beta features and tools",
    ],
  },
};

export const STATES = [
  "Abia",
  "Adamawa",
  "Akwa-Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross-River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT Abuja",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];

export const MALLS = {
  Abuja: [
    { name: "Agbalata mall Badagry", img: "/path/to/agbalata.jpg" },
    {
      name: "Alaba International mall",
      img: "/path/to/alaba-international.jpg",
    },
    { name: "Ajah mall", img: "/path/to/ajah-mall.jpg" },
    { name: "Aratumi mall", img: "/path/to/aratumi-mall.jpg" },
    { name: "Balogun mall, Lagos Island", img: "/path/to/balogun.jpg" },
    { name: "Bar Beach mall", img: "/path/to/bar-beach-mall.jpg" },
    { name: "Computer Village", img: "/path/to/computer-village.jpg" },
    { name: "Èbúté Èrò mall, Lagos Island", img: "/path/to/ebutero-mall.jpg" },
    { name: "Epe Fish mall", img: "/path/to/epe-fish-mall.jpg" },
    { name: "Iyana-Iba mall", img: "/path/to/iyana-iba-mall.jpg" },
  ],
};
