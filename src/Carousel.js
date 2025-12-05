import React, { useState } from 'react';

function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    // {
    //   title: 'Big Billion Days Sale',
    //   description: 'Massive discounts on all categories. Don\'t miss out!',
    //   image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=1200&h=300&fit=crop'
    // },
    // {
    //   title: 'New Season Collection',
    //   description: 'Explore the latest trends in fashion.',
    //   image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&h=300&fit=crop'
    // },
    // {
    //   title: 'Offers on Electronics',
    //   description: 'Save big on your favorite gadgets.',
    //   image: 'https://images.unsplash.com/photo-1498049860654-af1a5e566b47?w=1200&h=300&fit=crop'
    // }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="overflow-hidden rounded-xl">
      <div className="flex overflow-x-auto snap-x snap-mandatory [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {slides.map((slide, idx) => (
          <div key={idx} className="flex items-stretch snap-start w-full flex-shrink-0">
            <div className="flex h-full flex-1 flex-col gap-4 rounded-lg min-h-60 sm:min-h-80 w-full relative">
              <div
                className="w-full h-full bg-center bg-no-repeat bg-cover flex flex-col justify-end p-8 relative"
                style={{
                  backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.5), transparent), url(${slide.image})`
                }}
              >
                <div className="text-white max-w-md">
                  <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">{slide.title}</h2>
                  <p className="text-base sm:text-lg font-normal mt-2">{slide.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-2 mt-4">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-2 h-2 rounded-full transition-colors ${
              idx === currentSlide ? 'bg-primary' : 'bg-gray-300'
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
}

export default Carousel;
