import React, { Suspense } from "react";
import LoadingIndicator from "./components/ui/LoadingIndicator";

const CouponCard = React.lazy(() => import("./components/coupon/couponBanner"));
const FooterSection = React.lazy(() => import("./components/Footer"));
const Navbar = React.lazy(() => import("./components/Navbar"));
const Banner = React.lazy(() => import("./components/Banner"));

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <header className="bg-background border-b shadow-sm w-full">
        <Navbar />
      </header>
      <main className="w-full">
        <section>
          <Suspense fallback={<LoadingIndicator />}>
            <Banner />
          </Suspense>
        </section>
        <section className="py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-2 md:gap-12 lg:grid-cols-3 xl:grid-cols-3 mr-6 ml-6">
              <CouponCard
                code="WELCOME20"
                description="Get 20% off your first order"
              />

              <CouponCard
                code="FREESHIP"
                description="Free Shipping on Orders Over $50"
              />

              <CouponCard
                code="SAVE15"
                description="Get 15% off your next purchase"
              />

              <CouponCard
                code="SAVE10"
                description="Get 10% off your next order"
              />

              <CouponCard
                code="SAVE25"
                description="Get 25% off your next purchase"
              />

              <CouponCard
                code="SAVE30"
                description="Get 30% off your next order"
              />

              <CouponCard
                code="SAVE35"
                description="Get 35% off your next purchase"
              />

              <CouponCard
                code="SAVE40"
                description="Get 40% off your next order"
              />

              <CouponCard
                code="SAVE45"
                description="Get 45% off your next purchase"
              />
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-muted p-6 md:py-12 w-full">
        <div className="container mx-auto max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-sm">
          <Suspense fallback={<LoadingIndicator />}>
            <FooterSection
              title="Company"
              links={["About Us", "Our Team", "Careers", "News"]}
            />
          </Suspense>
          <Suspense fallback={<LoadingIndicator />}>
            <FooterSection
              title="Products"
              links={["Men", "Women", "Kids", "Accessories"]}
            />
          </Suspense>
          <Suspense fallback={<LoadingIndicator />}>
            <FooterSection
              title="Resources"
              links={["Blog", "Community", "Support", "FAQs"]}
            />
          </Suspense>
          <Suspense fallback={<LoadingIndicator />}>
            <FooterSection
              title="Legal"
              links={["Privacy Policy", "Terms of Service", "Cookie Policy"]}
            />
          </Suspense>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
