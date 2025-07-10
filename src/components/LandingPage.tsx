import Header from "./Header";
import Hero from "./Hero";
import Footer from "./Footer";
import Features from "./Features";


const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <Header />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
};

export default LandingPage;
