// import { Link } from "react-router-dom";
// import { Button } from "../ui/button";

import Button  from "../../components/ui/buttons/Button";

const Hero = () => {
  return (
    
      <section className="w-full bg-green200 grid grid-cols-1 place-items-center gap-8 lg:grid-cols-2 xl:gap-16">
            <img
              alt=""
              src="/heroImage.png"
              className="rounded-3xl bg-red200 max-h-[500px] object-cover lg:h-auto"
            />

          <div className="bg-yellow200 ">
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

            {/* <Button className="mt-10 bg-mainGreen text-white">
              <Link to="/services">Explore Now</Link>
            </Button> */}
        <div className="button mt-10">
         <Button text={"Explore Now"} /> 
        </div>
        
          
          </div>
      </section>
  );
};

export default Hero;
