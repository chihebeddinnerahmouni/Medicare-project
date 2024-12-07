import StarRatings from "react-star-ratings";
import { IoShareOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
// import axios from "axios";
import { useState } from "react";

const DetailsCont = ({ clinic }: any) => {
  const [isFavorite, setIsFavorite] = useState(clinic.isFavourite);
  //   const favoriteHandler = () => {
  //     setIsFavorite(!isFavorite);
  //     axios.post(
  //       `${
  //         import.meta.env.VITE_SERVER_URL_LISTING
  //       }/api/favourites/toggle-favourite`,
  //       {
  //         listing_id: clinic.id,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("jwt")}`,
  //         },
  //       }
  //     );
  //   };

  return (
    <section>
      <div className="titleButtons mt-3 lg:mt-5 md:flex md:justify-between md:items-start">
        <p className="font-semibold lg:text-[25px] md:w-[80%] lg:w-[90%] lg:font-bold">
          {clinic.name}
        </p>

        <div className="buttons flex gap-3 mt-3 md:mt-0">
          {/* {isloggedin() && ( */}
          <button
            className={`w-[35px] h-[35px]  border-1 rounded-50 flex items-center justify-center lg:w-[40px] lg:h-[40px] lg:border-2
            
            ${
              isFavorite
                ? "bg-mainGreen text-white border-mainGreen"
                : "border-black"
            }`}
            //   onClick={favoriteHandler}
          >
            <CiHeart className="text-2xl lg:text-[26px]" />
          </button>
          {/* )} */}
          <button
            className={`w-[35px] h-[35px] border-black border-1 rounded-50 flex items-center justify-center lg:w-[40px] lg:h-[40px] lg:border-2`}
          >
            <IoShareOutline className="text-writingMainDark text-2xl lg:text-[26px]" />
          </button>
        </div>
      </div>

      {/* stars and ... */}
      <div className="others flex flex-col items-start mt-3 gap-2 md:items-center md:flex-row lg:gap-4 lg:mt-2">
        <StarRatings
          rating={clinic.rating}
          starRatedColor="#FFD700"
          starEmptyColor="#dddcdc"
          numberOfStars={5}
          name="rating"
          starDimension="17px"
          starSpacing="2px"
        />
        <p className="text-sm text-writingMainDark">
          ({Array.isArray(clinic.reviews) ? clinic.reviews.length : 0} reviews )
        </p>
        {/* <p className="text-sm text-writingMainDark">
          {clinic.booking} {t("booking")}
        </p> */}
        <p className="text-[15px] font-medium text-writingMainDark lg:text-[17px]">
          {clinic.address}
        </p>
      </div>
    </section>
  );
};


export default DetailsCont;
