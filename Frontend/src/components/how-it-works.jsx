import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const testimonials = [
  {
    text: "I love how easy it is to find markets and products on 9ja Markets. It's my go-to for shopping local!",
    author: "Ada",
    role: "Buyer",
  },
  {
    text: "Since joining 9ja Markets, my sales have doubled! It's easy to use, and buyers find me quickly.",
    author: "Chike",
    role: "Merchant",
  },
  {
    text: "9ja Markets helped me discover vendors I would never have found on my own. It's an amazing tool!",
    author: "Tunde",
    role: "Buyer",
  },
  {
    text: "The platform's reach has been incredible. I've received inquiries from all over the country.",
    author: "Ngozi",
    role: "Merchant",
  },
  {
    text: "The bookmarking feature is a lifesaver. It makes it so easy to keep track of products I'm interested in.",
    author: "Fatima",
    role: "Buyer",
  },
  {
    text: "9ja Markets has streamlined my operations and increased my visibility among buyers.",
    author: "Kelechi",
    role: "Merchant",
  },
  {
    text: "Shopping local has never been this easy and efficient. Kudos to 9ja Markets!",
    author: "Bola",
    role: "Buyer",
  },
];

const HowItWorks = () => {
  return (
    <div className="bg-site-bg min-h-screen">
      {/* Hero Section */}
      <section className="relative flex justify-center items-center bg-Primary h-[60vh] text-white">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 px-4 text-center">
          <h1 className="mb-4 font-bold text-4xl md:text-6xl">
            How 9ja Markets Works
          </h1>
          <p className="mb-8 text-xl md:text-2xl">
            Your gateway to seamless market connections.
          </p>
          <Button asChild className="bg-orange hover:bg-orange/90 text-white">
            <Link to="/markets">Get Started</Link>
          </Button>
        </div>
      </section>

      {/* For Buyers Section */}
      <section className="mx-auto px-4 md:px-8 py-16 max-w-7xl">
        <h2 className="mb-12 font-bold text-3xl text-center text-Primary">
          For Buyers
        </h2>
        <div className="gap-8 grid md:grid-cols-3">
          <div className="bg-white shadow-lg p-6 rounded-lg">
            <h3 className="mb-4 font-semibold text-Primary text-xl">
              Step 1: Explore Markets and Products
            </h3>
            <p className="mb-4 text-gray-600">
              Discover Nigeria's leading markets and connect with merchants
              offering what you need. Navigate through our curated listings of
              markets, malls, and merchants to find exactly what you're looking
              for.
            </p>
          </div>
          <div className="bg-white shadow-lg p-6 rounded-lg">
            <h3 className="mb-4 font-semibold text-Primary text-xl">
              Step 2: Search and Filter with Ease
            </h3>
            <p className="mb-4 text-gray-600">
              Our powerful search and filter tools make it easy to find specific
              products, markets, or merchants near you. Customize your search by
              state, category, or market name for a personalized experience.
            </p>
          </div>
          <div className="bg-white shadow-lg p-6 rounded-lg">
            <h3 className="mb-4 font-semibold text-Primary text-xl">
              Step 3: Bookmark and Connect
            </h3>
            <p className="mb-4 text-gray-600">
              Bookmark your favorite products for quick access and connect
              directly with the vendors who listed them. Reach out to merchants
              to ask questions, negotiate deals, and finalize your purchase
              arrangements.
            </p>
          </div>
        </div>
        <div className="mt-8 text-center">
          <Button asChild className="bg-Primary hover:bg-Primary/90">
            <Link to="/markets">Explore Markets Now</Link>
          </Button>
        </div>
      </section>

      {/* For Merchants Section */}
      <section className="bg-Primary/5 px-4 md:px-8 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 font-bold text-3xl text-center text-Primary">
            For Merchants
          </h2>
          <div className="gap-8 grid md:grid-cols-3">
            <div className="bg-white shadow-lg p-6 rounded-lg">
              <h3 className="mb-4 font-semibold text-Primary text-xl">
                Step 1: Create Your Profile
              </h3>
              <p className="mb-4 text-gray-600">
                Sign up for free and list your business on 9ja Markets. Build a
                profile that showcases your unique offerings and helps buyers
                find you quickly.
              </p>
            </div>
            <div className="bg-white shadow-lg p-6 rounded-lg">
              <h3 className="mb-4 font-semibold text-Primary text-xl">
                Step 2: Showcase Your Products
              </h3>
              <p className="mb-4 text-gray-600">
                Upload high-quality images, product descriptions, and pricing to
                attract buyers. Highlight your best products to stand out in a
                competitive market.
              </p>
            </div>
            <div className="bg-white shadow-lg p-6 rounded-lg">
              <h3 className="mb-4 font-semibold text-Primary text-xl">
                Step 3: Engage and Grow
              </h3>
              <p className="mb-4 text-gray-600">
                Leverage our platform to connect with interested buyers. Respond
                to inquiries, negotiate deals, and build lasting relationships
                with your customers.
              </p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <Button asChild className="bg-Primary hover:bg-Primary/90">
              <Link to="/merchant-signup">Sign Up as a Merchant</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-4 md:px-8 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 font-bold text-3xl text-center text-Primary">
            What Our Users Say
          </h2>
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            className="custom-swiper-pagination"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white shadow-lg p-6 rounded-lg h-full">
                  <p className="mb-4 text-gray-600 italic">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center">
                    <div>
                      <p className="font-semibold text-Primary">
                        {testimonial.author}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
