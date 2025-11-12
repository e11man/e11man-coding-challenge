import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { IconButton } from './icon-button';

interface EventCarouselProps {
  children: React.ReactNode[];
  autoScroll?: boolean;
  interval?: number;
  className?: string;
}

export function EventCarousel({ 
  children, 
  autoScroll = true, 
  interval = 5000,
  className = '' 
}: EventCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const itemsPerView = 3; // Show 3 items at a time on desktop
  const totalSlides = Math.ceil(children.length / itemsPerView);

  useEffect(() => {
    if (!autoScroll || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, interval);

    return () => clearInterval(timer);
  }, [autoScroll, isPaused, interval, totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  return (
    <div 
      className={`relative ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Carousel Container */}
      <div className="overflow-hidden rounded-2xl">
        <div
          ref={scrollRef}
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {Array.from({ length: totalSlides }).map((_, slideIndex) => (
            <div key={slideIndex} className="min-w-full grid grid-cols-1 md:grid-cols-3 gap-4 px-2">
              {children.slice(
                slideIndex * itemsPerView,
                (slideIndex + 1) * itemsPerView
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      {totalSlides > 1 && (
        <>
          <div className="absolute left-2 top-1/2 -translate-y-1/2 z-10">
            <IconButton
              icon={ChevronLeft}
              onClick={goToPrevious}
              size="lg"
              label="Previous slide"
              className="bg-white/90 backdrop-blur-sm shadow-xl hover:bg-white"
            />
          </div>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 z-10">
            <IconButton
              icon={ChevronRight}
              onClick={goToNext}
              size="lg"
              label="Next slide"
              className="bg-white/90 backdrop-blur-sm shadow-xl hover:bg-white"
            />
          </div>
        </>
      )}

      {/* Dots Indicator */}
      {totalSlides > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'w-8 bg-blue-600'
                  : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
