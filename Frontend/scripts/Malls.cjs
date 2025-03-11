const { Rivers } = require("./Markets.cjs");

const MALLS = {
  Anambra: [
    {
      name: "Onitsha Mall",
      img: "./malls/anambra/onitsha.jpeg",
      address: "Park Street, Onitsha G.R.A, Onitsha",
      city: "Anambra",
      description: "A modern shopping complex housing international retailers like Shoprite, providing a comprehensive shopping experience."
    },
  ],
  
  Abia: [
    {
      name: "Aba Mega Mall",
      img: "./malls/abia/AbaMegaMall.jpg",
      address: "Ekenna Street, Aba",
      city: "Abia",
      description: "One of the largest malls in Africa, and the first smart mall globally, inaugurated in 2015."
    },
    {
      name: "Abia Mall",
      img: "./malls/abia/AbiaMall.jpg",
      address: "Old Garri Road, Umuahia",
      city: "Abia",
      description: "A one-stop shopping destination offering diverse retail options and leisure experiences."
    },
    {
      name: "Enyimba Mall",
      img: "./malls/abia/EnyimbaMall.jpg",
      address: "Etche Road, Aba",
      city: "Abia",
      description: "A modern shopping center featuring outlet shops and enhancing Aba’s commercial landscape."
    },
    {
      name: "Market Square",
      img: "./malls/abia/MarketSquare.jpg",
      address: "Aba",
      city: "Aba",
      description: "A modern grocery shopping mall known for its standard facilities and diverse product offerings.",
      }
  ],

  Bayelsa: [
    {
      name: "A to Z Mall",
      img: "./malls/bayelsa/AtoZMall.jpg",
      address: "Isaac Boro Expressway, Opposite Baybridge Junction, Kpansia",
      city: "Yenagoa",
      description: "A shopping mall providing a range of retail options.",
    },
    {
      name: "Market Square",
      img: "./malls/bayelsa/MarketSquare.jpg",
      address: "Benvies Road, Biogbolo",
      city: "Yenagoa",
      description: "A shopping mall offering a variety of products and services.",
     }
  ],

  Delta: [
    {
      name: "Delta Mall",
      img: "./malls/delta/DeltaMall.jpg",
      address: "Effurun Roundabout",
      city: "Effurun",
      description: "A modern shopping center featuring various retail stores, eateries, and entertainment options, including a cinema.",
    },
    {
      name: "Asaba Mall",
      img: "./malls/delta/AsabaMall.jpg",
      address: "Opposite Interbau Roundabout, Okpanam Road",
      city: "Asaba",
      description: "A contemporary shopping mall housing numerous retail outlets, restaurants, and a cinema, providing a comprehensive shopping and entertainment experience.",
    }
  ],

  Ebonyi: [
    {
      name: "Ebonyi State Shopping Mall",
      img: "./malls/ebonyi/EbonyiStateShoppingMall.jpg",
      address: "Abakaliki",
      city: "Ebonyi",
      description: "A modern shopping complex housing various retail stores, restaurants, and entertainment facilities.",
    },
    {
      name: "Roban Stores Abakaliki",
      img: "./malls/ebonyi/RobanStoresAbakaliki.jpg",
      address: "Mile 50 Junction, Kpiri Kpiri, Abakaliki",
      city: "Ebonyi",
      description: "A world-class shopping center offering a wide variety of items ranging from fruits and vegetables to gym equipment and baked products.",
    },
    {
      name: "All Seasons Shopping Mall",
      img: "./malls/ebonyi/AllSeasonsShoppingMall.jpg",
      address: "Mile 50 Before NEPA Junction, Abakaliki",
      city: "Ebonyi",
      description: "A contemporary shopping center offering groceries, beauty products, clothing, and accessories.",
    }
  ],

  Enugu: [
    {
      name: "Polo Park Mall",
      img: "./malls/enugu/PoloParkMall.jpg",
      address: "Polo Park Amusement Centre",
      city: "Enugu",
      description: "A premium shopping mall with a wide range of retail and recreational facilities.",
    },
    {
      name: "Chase Mall",
      img: "./malls/enugu/ChaseMall.jpg",
      address: "33 Abakaliki Road, GRA",
      city: "Enugu",
      description: "A mall with steady security, parking spot, and stores selling fashion accessories, groceries, and more, as well as corporate offices.",
    },
  ],

  Imo: [
    {
      name: "Owerri Mall",
      img: "./malls/imo/OwerriMall.jpg",
      address: "Egbu Road, Owerri, Imo State",
      city: "Owerri",
      description: "A state-of-the-art mall featuring over 40 shops occupied by major brands like Shoprite, Genesis Cinema, PEP, Kilimanjaro, and LG.",
    },
    {
      name: "L'ARCADE",
      img: "./malls/imo/l'arcade.jpg",
      address: "Okohia Industrial Layout, World Bank Road, Opposite Titanic View Hotel, Owerri, Imo State",
      city: "Owerri",
      description: "A modern shopping mall developed by Sandworth Properties, offering a premium shopping experience in the heart of Owerri.",
    },
  ],
  Jigawa: [
    {
      name: "Sahad Stores Ltd",
      img: "./malls/jigawa/SahadStoresLtd.webp",
      address: "C10/C11 Sani Abacha Way",
      city: "Dutse",
      description: "A leading superstore offering food items, electrical goods, fitness equipment, salon products, and accessories.",
    }
  ],

  Kaduna: [
    {
      name: "Kaduna Galaxy Mall",
      img: "./malls/kaduna/KadunaGalaxyMall.jpg",
      address: "Off Ahmadu Bello Way, City Centre",
      city: "Kaduna",
      description: "The first regional mall of its kind in Northern Nigeria, offering an unparalleled shopping and entertainment experience.",
    },
    {
      name: "Uptown Mall",
      img: "./malls/kaduna/UptownMall.png",
      address: "Barnawa",
      city: "Kaduna",
      description: "A modern shopping destination featuring a variety of retail outlets, including IMZA.",
    },
    {
      name: "NNDC Mall",
      img: "./malls/kaduna/NNDCMall.jpg",
      address: "No. 6 Muhammadu Buhari Way, Beside Union Bank, NEPA Roundabout, City Centre",
      city: "Kaduna",
      description: "A prime shopping destination combining various retail outlets with a vibrant atmosphere.",
    },
    {
      name: "Kaduna Capital Plaza",
      img: "./malls/kaduna/KadunaCapitalPlaza.jpg",
      address: "Alkali Road Directly Opposite New GTBank, City Centre",
      city: "Kaduna",
      description: "A beautiful shopping plaza comprising several shops like graphics and cloth printing, Jumia pickup station, salons, phone accessories vendors, and more.",
    }
  ],

  Kano: [
    {
      name: "Ado Bayero Mall",
      img: "./malls/kano/ado-bayero.jpeg",
      address: "Zoo Road, Kano, Nigeria",
      city: "Kano",
      description: "The first ultramodern shopping mall in Northern Nigeria, offering a variety of retail outlets, restaurants, and entertainment options.",
    },
    {
      name: "Country Mall Ltd",
      img: "./malls/kano/country.jpeg",
      address: "Plot 35/36 Guda Abdullahi Road, Farm Center, Nasarawa, Kano, Nigeria",
      city: "Kano",
      description: "A shopping destination for groceries, household items, wines, spirits, and electronics.",
    },
  ],

  Katsina: [
    {
      name: "First Lady Shopping Complex",
      img: "./malls/katsina/firstlady.jpeg",
      address: "Katsina, Nigeria",
      city: "Katsina",
      description: "A well-known complex housing numerous retail outlets.",
    },
  ],

  Kebbi: [
    {
      name: "Elnoor Cellphones City",
      img: "./malls/kebbi/ElnoorCellphonesCity.jpg",
      address: "3, Emir Haruna Road, Birnin Kebbi, Kebbi State, Nigeria",
      city: "Birnin Kebbi",
      description: "A phone store offering a wide range of quality mobile phones and accessories, providing customers with a satisfying shopping experience.",
    },
    {
      name: "Rotimage Shopping",
      img: "./malls/kebbi/RotimageShopping.jpg",
      address: "Emir Usman Road, Birnin Kebbi, Kebbi State, Nigeria",
      city: "Birnin Kebbi",
      description: "A shopping center offering a variety of products and services to cater to diverse customer needs.",
    },
    {
      name: "KXPRESS Birnin Kebbi",
      img: "./malls/kebbi/KXPRESSBirninKebbi.jpg",
      address: "Shop No 3, Ahmadu Bello Way, Birnin Kebbi, Kebbi State, Nigeria",
      city: "Birnin Kebbi",
      description: "A logistics and delivery service center associated with Konga Online Shopping, facilitating e-commerce activities in the region.",
    }
  ],

  Lagos: [
    {
      name: "Ikeja City Mall",
      img: "./malls/lagos/ikeja.jpg",
      address: "Obafemi Awolowo Way, Alausa, Ikeja",
      city: "Lagos",
      description: "A prominent shopping destination featuring a variety of retail outlets, eateries, and entertainment options."
    },
    {
      name: "The Palms Shopping Mall",
      img: "./malls/lagos/palmsmall.jpg",
      address: "1 Bisway Street, Maroko, Lekki",
      city: "Lagos",
      description: "A well-known mall housing numerous shops, a cinema, and dining establishments."
    },
    {
      name: "Silverbird Galleria",
      img: "./malls/lagos/silverbird.jpg",
      address: "133 Ahmadu Bello Way, Victoria Island",
      city: "Lagos",
      description: "A multifaceted venue offering shopping, dining, and entertainment, including a cinema."
    },
    {
      name: "City Mall",
      img: "./malls/lagos/citymall.jpg",
      address: "Onikan, Lagos Island",
      city: "Lagos",
      description: "A shopping center featuring various retail stores, restaurants, and entertainment options."
    },
    {
      name: "Mega Plaza Century 21 Mall",
      img: "./malls/lagos/megaplaza.jpg",
      address: "14 Idowu Martins Street, Victoria Island",
      city: "Lagos",
      description: "A popular destination offering a supermarket, gift stores, a bar/club, stationery stores, and a food court."
    },
    {
      name: "The Lennox Mall",
      img: "./malls/lagos/lennoxmall.jpg",
      address: "Admiralty Way, Lekki Phase 1",
      city: "Lagos",
      description: "A modern shopping mall offering a variety of retail outlets and services."
    },
    {
      name: "Maryland Mall",
      img: "./malls/lagos/marylandmall.jpeg",
      address: "350-360 Ikorodu Road, Maryland",
      city: "Lagos",
      description: "A contemporary shopping center featuring various retail stores, eateries, and entertainment options."
    },
    {
      name: "Novare Lekki Mall",
      img: "./malls/lagos/novaremall.jpg",
      address: "Sangotedo, Lekki-Epe Expressway",
      city: "Lagos",
      description: "A shopping destination housing numerous retail outlets, a cinema, and dining options."
    },
    {
      name: "Circle Mall",
      img: "./malls/lagos/circlemall.jpeg",
      address: "Osapa, Lekki",
      city: "Lagos",
      description: "A shopping center offering a variety of retail stores and services."
    },
    {
      name: "Festival Mall",
      img: "./malls/lagos/festivalmall.jpeg",
      address: "21 Road, Festac Town",
      city: "Lagos",
      description: "A modern mall featuring various retail outlets, a cinema, and dining establishments."
    },
    {
      name: "Adeniran Ogunsanya Shopping Mall",
      img: "./malls/lagos/adeniran.jpeg",
      address: "84 Adeniran Ogunsanya Street, Surulere",
      city: "Lagos",
      description: "A shopping destination with a variety of retail stores and services."
    },
    {
      name: "E-Centre Mall",
      img: "./malls/lagos/ecentermall.jpg",
      address: "1-11 Commercial Avenue, Sabo, Yaba",
      city: "Lagos",
      description: "A shopping center featuring various retail outlets and entertainment options."
    },
    {
      name: "Apapa Mall",
      img: "./malls/lagos/apapamall.jpeg",
      address: "Park Lane, Apapa",
      city: "Lagos",
      description: "A shopping destination offering a variety of retail stores and services."
    },
    {
      name: "Sangotedo Mall",
      img: "./malls/lagos/SangotedoMall.jpeg",
      address: "Km 20, Lekki-Epe Expressway, Sangotedo",
      city: "Lagos",
      description: "A modern shopping center with various retail outlets and dining options."
    },
  ],

  Ogun: [
    {
      name: "Abeokuta City Mall",
      img: "./malls/ogun/abeokutamall.jpg",
      address: "125 Osoba Road, Oke-Mosan",
      city: "Abeokuta",
      description: "A central shopping area with multiple shops, eateries, cinema, and recreational facilities."
    },
    {
      name: "Modu Shopping Mall",
      img: "./malls/ogun/modumall.jpeg",
      address: "Alabata Road",
      city: "Abeokuta",
      description: "A vibrant retail destination offering shopping, dining, and local cultural experiences."
    },
    {
      name: "boulos mart",
      img: "./malls/ogun/boulos.png",
      address: "Market, Cooperative Building, Idi-Ishin Junction, Omida Rd",
      city: "Abeokuta",
      description: "A grocery store offering local and international products for diverse culinary needs."
    },
  ],

  Oyo: [ 
    {
      name: "The Palms Shopping Mall",
      img: "./malls/oyo/ThePalmsShoppingMall.png",
      address: "MKO Abiola Way, Oluyole 200273",
      city: "Ibadan",
      description: "A spacious mall offering a variety of retail outlets, eateries, and entertainment options."
    },
    {
      name: "Heritage Mall",
      img: "./malls/oyo/HeritageMall.jpg",
      address: "Dugbe",
      city: "Ibadan",
      description: "A modern shopping center located in the heart of Ibadan, featuring numerous shops and services."
    },
    {
      name: "Ventura Mall",
      img: "./malls/oyo/VenturaMall.jpg",
      address: "Samonda",
      city: "Ibadan",
      description: "A vibrant mall offering shopping, dining, and entertainment experiences, including a cinema."
    },
    {
      name: "Jericho Mall",
      img: "./malls/oyo/JerichoMall.jpg",
      address: "Jericho",
      city: "Ibadan",
      description: "A mid-size mall providing prime retail shops and attractions aimed at creating a memorable shopping experience."
    },
    {
      name: "Grandex Mall",
      img: "./malls/oyo/GrandexMall.webp",
      address: "Bodija",
      city: "Ibadan",
      description: "A shopping destination offering a variety of products, including groceries, electronics, and fashion items."
    },
    {
      name: "Ace Mall",
      img: "./malls/oyo/AceMall.jpg",
      address: "Ring Road",
      city: "Ibadan",
      description: "A contemporary mall featuring various retail outlets, eateries, and entertainment options."
    },
    {
      name: "Westmead Mall",
      img: "./malls/oyo/WestmeadMall.jpg",
      address: "Challenge",
      city: "Ibadan",
      description: "A shopping center offering a range of retail stores, services, and dining options."
    },
    {
      name: "Westmead Mall",
      img: "./malls/oyo/WestmeadMall.jpg",
      address: "Rayfield Gardens City Estate",
      city: "Ibadan",
      description: "A newly opened shopping center set to revolutionize the shopping experience in Ibadan."
    },
    {
      name: "Brent Mall Sawmill Branch",
      img: "./malls/oyo/BrentMallSawmillBranch.jpg",
      address: "Old Sawmill Bus Stop, Old Ife Road",
      city: "Ibadan",
      description: "A retail outlet dealing in agricultural products, healthcare products, and pharmaceuticals."
    },
  ],

  Ekiti: [
    {
      name: "Staleg Mall",
      img: "./malls/ekiti/StalegMall.jpg",
      address: "Ori-Apata, Adebayo Road",
      city: "Ado-Ekiti",
      description: "Offers luxury wears, quality shoes and bags, cosmetics, electronics, and maternity essentials."
    },
    {
      name: "Dominion Mall",
      img: "./malls/ekiti/DominionMall.png",
      address: "J6P5+WH2, Ado-Ekiti 360102",
      city: "Ado-Ekiti",
      description: "A textile shopping center located in Ado-Ekiti."
    },
    {
      name: "Dominion Mall",
      img: "./malls/ekiti/DominionMall.jpg",
      address: "Opposite Ijigbo Roundabout",
      city: "Ado-Ekiti",
      description: "Offers electronics, furniture, and beddings; known for quality and affordability."
    },
    {
      name: "Arena Shopping Mall",
      img: "./malls/ekiti/ArenaShoppingMall.jpg",
      address: "Okeila Road",
      city: "Ado-Ekiti",
      description: "A marketplace where people of different tribes come together to buy and sell; known for affordable vegetables and fruits."
    },
    {
      name: "Kaita Plaza",
      img: "./malls/ekiti/KaitaPlaza.jpeg",
      address: "Off Ado-Iworoko-Ifaki Road",
      city: "Ado-Ekiti",
      description: "A large shopping center comprising offices, stalls, and shops selling different kinds of items."
    },
    {
      name: "ABUAD Shopping Mall",
      img: "./malls/ekiti/ABUADShoppingMall.jpg",
      address: "ABUAD",
      city: "Ado-Ekiti",
      description: "Fully stocked mall offering electronics, groceries, boutiques, salons, and more."
    },
    {
      name: "Oyinbo Shopping & Retail",
      img: "./malls/ekiti/OyinboShoppingAndRetail.jpg",
      address: "Plot Q6 behind Ajaleye Civic Centre, Fed Poly Road",
      city: "Ado-Ekiti",
      description: "Offers a wide variety of items from foodstuff to housewares."
    },
    {
      name: "Kaita Plaza",
      img: "./malls/ekiti/KaitaPlaza.jpg",
      address: "Off Ado-Iworoko-Ifaki Road",
      city: "Ado-Ekiti",
      description: "A large shopping center comprising offices, stalls, and shops selling different kinds of items."
    },
    {
      name: "Fayose Market",
      img: "./malls/ekiti/FayoseMarket.jpg",
      address: "Ajilosun Street, Ado-Ikere Road",
      city: "Ado-Ekiti",
      description: "Known as the Computer Village of Ekiti, specializing in ICT accessories, mobile phones, gadgets, and electronics."
    },
    {
      name: "Eyecatch Accessories",
      img: "./malls/ekiti/EyecatchAccessories.jpg",
      address: "7, Ekute Quarters",
      city: "Ado-Ekiti",
      description: "Leading eyeglasses distribution company offering various types of glasses."
    },
    {
      name: "Funmola House of Fashion",
      img: "./malls/ekiti/FunmolaHouseOfFashion.jpg",
      address: "Bolorunduro Street",
      city: "Ado-Ekiti",
      description: "Specializes in all forms of female clothing and turban caps."
    },
    {
      name: "Goldenspa Shopping Mall",
      img: "./malls/ekiti/GoldenspaShoppingMall.jpg",
      address: "Nova Road after CAC, Basiri",
      city: "Ado-Ekiti",
      description: "Offers products such as wine, provisions, and more at discounted prices."
    },
    {
      name: "Lasting Impressions",
      img: "./malls/ekiti/LastingImpressions.jpg",
      address: "No 143, Ajilosun Street, opposite St. Michael's Primary School",
      city: "Ado-Ekiti",
      description: "Offers sales of gift items, flowers, and accessories."
    },
    {
      name: "Modupe Complex",
      img: "./malls/ekiti/ModupeComplex.jpg",
      address: "Bisi Egbeyemi Crescent, Onigaari Road, GRA",
      city: "Ado-Ekiti",
      description: "A shopping store offering high-quality, custom-made fabric materials and textiles."
    },
    {
      name: "Vicano Boutique & Suits",
      img: "./malls/ekiti/VicanoBoutiqueAndSuits.jpg",
      address: "Ijigbo Street, Irona Quarters Road",
      city: "Ado-Ekiti",
      description: "An in-store shopping destination for a wide range of men's wear, including shoes, suits, and casual wear."
    }
  ],

  Osun: [
    {
      name: "Osun Mall",
      img: "./malls/osun/OsunMall.jpg",
      address: "Gbongan/Ibadan Road",
      city: "Osogbo",
      description: "An ultramodern mega shopping mall featuring Filmhouse cinemas, spas, game shops, bars, restaurants, and various retail stores."
    },
    {
      name: "Betsay Shopping Mall",
      img: "./malls/osun/BetsayShoppingMall.jpg",
      address: "Obafemi Awolowo Way",
      city: "Osogbo",
      description: "A shopping destination offering a variety of jewelry and other retail stores."
    },
    {
      name: "Bridget's Mall",
      img: "./malls/osun/BridgetsMall.png",
      address: "Ile-Ife",
      city: "Ile-Ife",
      description: "A privately owned 'one-stop' shopping and social hub offering a range of goods and services."
    },
    {
      name: "Olorunda Shopping Complex",
      img: "./malls/osun/OlorundaShoppingComplex.jpg",
      address: "Okefia",
      city: "Osogbo",
      description: "A shopping complex offering various retail outlets and services."
    },
    {
      name: "Ayeso Shopping Complex",
      img: "./malls/osun/AyesoShoppingComplex.jpg",
      address: "Ayeso Area",
      city: "Esa-Oke",
      description: "A local shopping complex providing various goods and services to the community."
    },
    {
      name: "Fasogbon Shopping Complex",
      img: "./malls/osun/FasogbonShoppingComplex.jpg",
      address: "Edunabon Road",
      city: "Ile-Ife",
      description: "A shopping complex offering a variety of retail stores and services."
    },
    {
      name: "Segron Mart",
      img: "./malls/osun/SegronMart.jpg",
      address: "Plot 11A Oodua Street, Unity Estate",
      city: "Osogbo",
      description: "An in-store retail shopping center offering a wide variety of grocery items, provisions, and daily consumables."
    }
  ],

  Ondo: [
    {
      name: "Akure Mall",
      img: "./malls/ondo/AkureMall.jpg",
      address: "Igbatoro Road",
      city: "Akure",
      description: "A prominent shopping destination housing various retail outlets, including Shoprite, boutiques, and a cinema."
    },
    {
      name: "Ojaja Park",
      img: "./malls/ondo/OjajaPark.jpg",
      address: "Alagbaka",
      city: "Akure",
      description: "A multifunctional complex featuring a shopping mall, eatery, hotel, cinema, and amusement park."
    },
    {
      name: "Olufunmilayo Shopping Centre",
      img: "./malls/ondo/OlufunmilayoShoppingCentre.jpg",
      address: "Oke-Ijebu Road",
      city: "Akure",
      description: "A shopping center offering a range of retail stores and services."
    },
    {
      name: "Rashee Becky Phones",
      img: "./malls/ondo/RasheeBeckyPhones.jpg",
      address: "139 Arakale Rd, opposite cash hold petrol station",
      city: "Akure",
      description: "An outlet mall specializing in mobile phones and accessories."
    },
    {
      name: "Nao Supermarket",
      img: "./malls/ondo/NaoSupermarket.jpg",
      address: "Oba Adesida Road",
      city: "Akure",
      description: "A supermarket providing a range of consumer goods."
    },
    {
      name: "Samdee Phone Plaza",
      img: "./malls/ondo/SamdeePhonePlaza.jpg",
      address: "10 Araromi St, old garage",
      city: "Akure",
      description: "A plaza specializing in mobile phones and accessories."
    },
    {
      name: "Tisco Super Market",
      img: "./malls/ondo/TiscoSuperMarket.png",
      address: "7637+9X9, Alagbaka",
      city: "Akure",
      description: "A supermarket offering a variety of products."
    }
  ],

  "Cross-River": [
    {
      name: "Tinapa Shopping Centre",
      img: "./malls/cross-river/TinapaShoppingCentre.jpg",
      address: "Tinapa Resort",
      city: "Calabar",
      description: "One of Nigeria's largest malls, designed to boost tourism in Cross River State.",
    },
    {
      name: "Calabar Mall",
      img: "./malls/cross-river/CalabarMall.webp",
      address: "MCC Road",
      city: "Calabar",
      description: "A modern shopping center housing over 50 brands of shops, including a 5-screen multiplex for shopping and recreational activities.",
    },
    {
      name: "Livingston Shopping Complex",
      img: "./malls/cross-river/LivingstonShoppingComplex.jpg",
      address: "119 Ndidem Usang Iso Road, Atekong",
      city: "Calabar",
      description: "Known for relaxation and comfort, featuring an excellent bakery and a variety of shops."
    },
    {
      name: "NYOVAT Shopping Mall",
      img: "./malls/cross-river/NYOVATShoppingMall.jpg",
      address: "15 Oche-rore Street",
      city: "Ikom",
      description: "One of the biggest and most popular shopping centers in Ikom, offering household and personal items at relatively affordable prices."
    }
  ],

  Rivers: [
    {
      name: "Port Harcourt Mall",
      img: "./malls/rivers/PortHarcourtMall.jpg",
      address: "1 Azikiwe Road, Old GRA",
      city: "Port Harcourt",
      description: "A modern shopping destination featuring various retail outlets, eateries, and entertainment options."
    },
    {
      name: "The Autograph",
      img: "./malls/rivers/TheAutograph.jpg",
      address: "30 Sani Abacha Road, GRA Phase 3",
      city: "Port Harcourt",
      description: "An event center with strategically arranged shops and office spaces."
    },
    {
      name: "KG Mall",
      img: "./malls/rivers/KGMall.jpg",
      address: "Evo Road, Elechi",
      city: "Port Harcourt",
      description: "A lifestyle shopping center with a unisex salon, relaxation spaces, and various stores."
    },
    {
      name: "The Vineyard",
      img: "./malls/rivers/TheVineyard.jpg",
      address: "Phase 2, 88 Woji Road, GRA",
      city: "Port Harcourt",
      description: "A shopping and lifestyle center catering to household and personal needs."
    },
    {
      name: "Next Cash & Carry",
      img: "./malls/rivers/NextCashAndCarry.jpg",
      address: "Oginigba Elekahia Link Road, Trans Amadi",
      city: "Port Harcourt",
      description: "A large hypermarket selling household and personal items at wholesale prices."
    },
    {
      name: "Market Square",
      img: "./malls/rivers/MarketSquare.jpg",
      address: "Ikwerre Road, beside Ogoni Grand View Hotel, Rumuodomaya",
      city: "Port Harcourt",
      description: "A superstore offering a variety of household and grocery items at competitive prices."
    },
    {
      name: "Genesis Centre",
      img: "./malls/rivers/GenesisCentre.jpg",
      address: "Trans-Amadi Rd, Nkpogu",
      city: "Port Harcourt",
      description: "A premier destination for entertainment, dining, and shopping."
    }
  ],

  Edo: [
    {
      name: "Benin Mall",
      img: "./malls/edo/BeninMall.jpg",
      address: "Sapele Road",
      city: "Benin City",
      description: "A modern shopping mall with retail stores, a food court, and entertainment options."
    },
    {
      name: "Kadis Plaza",
      img: "./malls/edo/KadisPlaza.jpg",
      address: "8 Ugbowo-Lagos Rd, Uselu",
      city: "Benin City",
      description: "A shopping plaza housing various stores, a supermarket, and eateries."
    },
    {
      name: "Ebalunode Shopping Plaza",
      img: "./malls/edo/EbalunodeShoppingPlaza.jpg",
      address: "65 Benin City-Ehor Rd, Avbiama",
      city: "Benin City",
      description: "A commercial center with various retail shops and grocery stores."
    },
    {
      name: "Legacy Mall Benin",
      img: "./malls/edo/LEGACYMALLBENIN.jpg",
      address: "Ohuoba St, Oka",
      city: "Benin City",
      description: "A modern shopping mall with restaurants, retail stores, and a cinema."
    },
    {
      name: "Everyday Mall",
      img: "./malls/edo/everydaymall.jpg",
      address: "Benin Sapele Rd, Oka",
      city: "Benin City",
      description: "A shopping center with various fashion, electronics, and household items."
    },
    {
      name: "Gold Plaza",
      img: "./malls/edo/GoldPlaza.jpg",
      address: "Arougba Community, Along Irhirhi Road, off Airport Road",
      city: "Benin City",
      description: "A popular shopping and business center with retail outlets and services."
    }
  ],

  "Akwa-Ibom" : [
    {
      name: "Ibom Tropicana Shopping Mall",
      img: "./malls/akwa-ibom/IbomTropicana.jpg",
      address: "Uyo, Akwa Ibom",
      city: "Uyo",
      description: "A modern shopping mall inaugurated to boost tourism and create wealth in the state."
    },
    {
      name: "De Choice Mall",
      img: "./malls/akwa-ibom/DeChoiceMall.jpg",
      address: "Uyo, Akwa Ibom",
      city: "Uyo",
      description: "An ultra-modern shopping center featuring various shops, including furniture stores, electronics outlets, beauty shops, and a pharmacy."
    },
    {
      name: "Inels Mall",
      img: "./malls/akwa-ibom/InelsMall.jpg",
      address: "Uyo, Akwa Ibom",
      city: "Uyo",
      description: "Offers online and offline sales of beauty, cosmetics, personal care products, groceries, and kitchen items."
    },
    {
      name: "L&T Superstore",
      img: "./malls/akwa-ibom/LTSuperstore.jpg",
      address: "Uyo, Akwa Ibom",
      city: "Uyo",
      description: "An online retail store offering game consoles, controller pads, and PlayStation CDs at affordable prices."
    },
    {
      name: "Pointek Uyo",
      img: "./malls/akwa-ibom/PointekUyo.jpg",
      address: "Uyo, Akwa Ibom",
      city: "Uyo",
      description: "Wholesalers and retailers of top-notch brands of mobile phones, electronics, computers, accessories, and gaming consoles with free delivery."
    },
    {
      name: "Akpan Andem Market",
      img: "./malls/akwa-ibom/AkpanAndemMarket.jpg",
      address: "Uyo, Akwa Ibom",
      city: "Uyo",
      description: "A popular market offering local ingredients, fruits, stationery, fashion accessories, and more."
    },
    {
      name: "Itam Market",
      img: "./malls/akwa-ibom/ItamMarket.jpg",
      address: "Uyo, Akwa Ibom",
      city: "Uyo",
      description: "A large local market with stores selling personal needs, household items, and industrial products such as fresh produce and electrical appliances."
    },
    {
      name: "LG Showroom & Service Centre",
      img: "./malls/akwa-ibom/LGShowroom.jpg",
      address: "Uyo, Akwa Ibom",
      city: "Uyo",
      description: "Offers sales, installation, repairs, and maintenance of electronics and appliances, including refrigerators and air conditioners."
    },
    {
      name: "MallforAfrica",
      img: "./malls/akwa-ibom/MallforAfrica.jpg",
      address: "Uyo, Akwa Ibom",
      city: "Uyo",
      description: "An online shopping platform providing access to shop from premium US and UK websites with delivery to Nigeria."
    },
    {
      name: "Sweet Bride Enterprises",
      img: "./malls/akwa-ibom/SweetBrideEnterprises.jpg",
      address: "Uyo, Akwa Ibom",
      city: "Uyo",
      description: "A well-known wedding dress and accessories brand offering sales and rentals of the latest bridal gowns and accessories."
    }
  ],

  Sokoto: [
    {
      name: "AGG Mall Shopping Complex",
      img: "./malls/sokoto/AGGMallShoppingComplex.jpg",
      address: "Mabera Jelani Area, Shuni Road",
      city: "Sokoto",
      description: "An ultramodern shopping mall offering a wide variety of products such as home goods, glassware, electronics, clothing, laces, Swiss materials, and more.",
    },
    {
      name: "Fodio Shopping Mall",
      img: "./malls/sokoto/FodioShoppingMall.jpg",
      address: "9 Abdulahi Fodio Rd, Minanata",
      city: "Sokoto",
      description: "A shopping mall providing a variety of retail options for shoppers.",
    },
    {
      name: "K7 Mall",
      img: "./malls/sokoto/K7Mall.jpg",
      address: "No 1, Agaei Road",
      city: "Sokoto",
      description: "A shopping mall offering a range of products and services to cater to diverse customer needs.",
    }
  ],

  Zamfara: [
    {
      name: "Jifatu Shopping Mall",
      img: "./malls/zamfara/JifatuShoppingMall.jpg",
      address: "Gusau",
      city: "Zamfara",
      description: "Fully stocked with groceries, household goods, cosmetics, toiletries, and more, Jifatu Shopping Mall is a place where you can get almost everything you need.",
    }
  ],

};

module.exports = MALLS;