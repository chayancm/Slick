import React, { useEffect, useRef } from "react";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "../lib/utils"; // Ensure this utility is correctly implemented
import image1 from "../assets/l-b-img-1.jpg";
import image2 from "../assets/l-b-img-2.jpg";
import image3 from "../assets/l-b-img-4.jpg";
import { Button } from "./ui/Button";

// Define types
type CarouselApi = UseEmblaCarouselType[1];
type CarouselOptions = Parameters<typeof useEmblaCarousel>[0];
type CarouselPlugin = Parameters<typeof useEmblaCarousel>[1];

// Define CarouselProps
type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
  autoplay?: boolean;
  autoplayInterval?: number;
  pauseOnHover?: boolean;
};

// Define CarouselContextProps
type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

// Create CarouselContext
const CarouselContext = React.createContext<CarouselContextProps | null>(null);

// Hook to use CarouselContext
function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}

// Custom Hook for Autoplay
function useAutoplay(
  api: CarouselApi | null,
  interval: number,
  isEnabled: boolean,
  pauseOnHover: boolean
) {
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!api || !isEnabled) return;

    const play = () => {
      autoplayRef.current = setInterval(() => {
        if (api.canScrollNext()) {
          api.scrollNext();
        } else {
          api.scrollTo(0);
        }
      }, interval);
    };

    const stop = () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };

    play();

    if (pauseOnHover) {
      api.containerNode().addEventListener("mouseenter", stop);
      api.containerNode().addEventListener("mouseleave", play);
    }

    api.on("pointerDown", stop);
    api.on("pointerUp", play);

    return () => {
      stop();
      if (pauseOnHover) {
        api.containerNode().removeEventListener("mouseenter", stop);
        api.containerNode().removeEventListener("mouseleave", play);
      }
      api.off("pointerDown", stop);
      api.off("pointerUp", play);
    };
  }, [api, interval, isEnabled, pauseOnHover]);
}

// Main Carousel Component
const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      autoplay = false,
      autoplayInterval = 3000,
      pauseOnHover = false,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      { ...opts, axis: orientation === "horizontal" ? "x" : "y" },
      plugins
    );
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) return;
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    }, []);

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev();
    }, [api]);

    const scrollNext = React.useCallback(() => {
      api?.scrollNext();
    }, [api]);

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext]
    );

    useEffect(() => {
      if (!api || !setApi) return;
      setApi(api);
    }, [api, setApi]);

    useEffect(() => {
      if (!api) return;
      onSelect(api);
      api.on("reInit", onSelect);
      api.on("select", onSelect);
      return () => {
        api.off("select", onSelect);
      };
    }, [api, onSelect]);

    useAutoplay(api, autoplayInterval, autoplay, pauseOnHover);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api,
          opts,
          orientation,
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = "Carousel";

// CarouselContent Component
const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();
  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  );
});
CarouselContent.displayName = "CarouselContent";

// CarouselItem Component
const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel();
  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props}
    />
  );
});
CarouselItem.displayName = "CarouselItem";

// CarouselPrevious Button
const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();
  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-left-4 top-1/2 -translate-y-1/2 md:-left-12"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
});
CarouselPrevious.displayName = "CarouselPrevious";

// CarouselNext Button
const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel();
  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-right-4 top-1/2 -translate-y-1/2 md:-right-12"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  );
});
CarouselNext.displayName = "CarouselNext";

// Export components
export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
};

// Main Component using the Carousel
const Component: React.FC = () => {
  return (
    <div className="w-full  mx-auto relative group shadow-lg rounded-lg">
      <Carousel
        className="w-full max-h-[500px] overflow-hidden rounded-t-lg"
        opts={{ loop: true, transition: "slide", transitionDuration: 500 }}
        autoplay={true}
        autoplayInterval={3000}
        pauseOnHover={true}
      >
        <CarouselContent>
          <CarouselItem>
            <img
              src={image1}
              width={1600}
              height={500}
              alt="Banner Image"
              className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover rounded-t-lg border-b border-border"
            />
          </CarouselItem>
          <CarouselItem>
            <img
              src={image2}
              width={1600}
              height={500}
              alt="Banner Image"
              className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover rounded-t-lg border-b border-border"
            />
          </CarouselItem>
          <CarouselItem>
            <img
              src={image3}
              width={1600}
              height={500}
              alt="Banner Image"
              className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover rounded-t-lg border-b border-border"
            />
          </CarouselItem>
        </CarouselContent>
      </Carousel>
      <div className="absolute inset-0 bg-background/50 group-hover:shadow-2xl transition-shadow duration-300 rounded-lg" />
    </div>
  );
};

export default Component;
