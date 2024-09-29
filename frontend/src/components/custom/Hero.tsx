import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <section>
      <div className="mt-12 mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
            <img
              alt=""
              src="/heroImage.png"
              width={800}
              height={800}
              className="absolute inset-0 h-full
          rounded-3xl 
          w-full object-cover"
            />
          </div>

          <div className="lg:py-24">
            <h2 className="text-4xl font-bold sm:text-4xl">
              Find & Book
              <span className="text-mainGreen"> Appointment </span>
              with any <span className="text-mainGreen "> Medical </span>
              service you want
            </h2>

            <p className="mt-4 text-gray-500">
              Discover and book appointments with the best healthcare
              professionals in your area. Whether you need a doctor, clinic, or
              nurse, we have you covered. Consult with top-rated doctors online,
              receive expert medical advice, and get the best treatment tailored
              to your needs. Our platform ensures you have access to quality
              healthcare services at your convenience.
            </p>

            <Button className="mt-10 bg-mainGreen text-white">
              <Link to="/services">Explore Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
