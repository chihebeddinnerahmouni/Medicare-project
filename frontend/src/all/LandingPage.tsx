import CategorySearch from "@/components/custom/CategorySearch";
import ClinicList from "@/components/custom/ClinicsList";
import DoctorList from "@/components/custom/DoctorList";
import Footer from "@/components/custom/Footer";
import Hero from "@/components/custom/Hero";
import Navbar from "@/components/custom/Navbar";
import NurseList from "@/components/custom/NurseList";
import "./Landingpage.css";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <CategorySearch />

      <NurseList />
      <div className="gradient-divider h-1 bg-gradient-to-r from-blue-500 to-green-500"></div>
      <DoctorList />
      {/* Divider 2: Inspiring Quote */}
      <div className="quote-divider text-center py-6 bg-blue-50 mb-5">
        <blockquote className="text-2xl font-semibold italic text-gray-700">
          "Clinics are the cornerstone of community health."
        </blockquote>
      </div>
      <ClinicList />

      <div className="animated-text-container text-center py-10">
        <h2 className="animated-text text-4xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 bg-clip-text text-transparent animate-gradient">
          And more is coming, wait for us!
        </h2>
      </div>

      <style>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>

      {/* Newsletter */}
      <div className="newsletter-box bg-white p-8 md:p-10 rounded-xl shadow-lg text-center mb-10 max-w-lg mx-auto border-4 border-dashed border-gradient-to-r from-blue-500 to-green-500 animate-border">
        <h2 className="text-3xl font-extrabold mb-6 text-gray-800 bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
          Subscribe to our Newsletter
        </h2>
        <p className="text-gray-500 mb-6">
          Stay updated with the latest news and special offers.
        </p>
        <form className="flex flex-col items-center space-y-4 w-full">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-300 animated-border"
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-green-600 transition duration-300"
          >
            Subscribe
          </button>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default LandingPage;
