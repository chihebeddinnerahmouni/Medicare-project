import { useMediaQuery } from "@mui/material";
import ImagesCont from "@/containers/clinics/clinic details/ImagesCont"
import DetailsCont from "@/containers/clinics/clinic details/DetailsCont";
import DescCont from "@/containers/clinics/clinic details/DescCont";
import ReserveCont from "@/containers/clinics/clinic details/ReserveCont";
import RatingsCont from "@/containers/clinics/clinic details/RatingsCont";
import ReviewsCont from "@/containers/clinics/clinic details/ReviewsCont";
import OffersCont from "@/containers/clinics/clinic details/OffersCont";
import LocationCont from "@/containers/clinics/clinic details/LocationCont";


const ClinicDetails = () => {

  const isMobile = useMediaQuery("(max-width: 1024px)");

  return (
    <div className="mt-[70px] pt-10 px-4 pb-10 md:px-10 lg:px-20 lg:pb-20 xl:max-w-[1700px] xl:mx-auto">
      <ImagesCont Images={clinic_data.images} />
      <DetailsCont clinic={clinic_data} />
      <hr className="my-5 lg:my-18" />
      <div className="mx-auto w-full grid grid-cols-1 md:max-w-[700px] lg:max-w-full lg:flex lg:gap-x-10 lg:items-start 2xl:max-w-[1700px]">
        <div className="check w-full lg:full">
          <DescCont description={clinic_data.description} />
          <hr className="my-7 lg:my-10" />
          {isMobile && (
            <>
              <ReserveCont clinic={clinic_data} />
              <hr className="my-7 lg:my-10" />
            </>
          )}
          <RatingsCont averageRatings={clinic_data.averageRatings} />
          <hr className="my-7 lg:my-10" />
          <ReviewsCont reviews={clinic_data.reviews} />
          <hr className="my-7 lg:my-10" />
          <OffersCont offers={clinic_data.offers} />
          <hr className="my-7 lg:my-10" />
          <LocationCont
            latitude={clinic_data.latitude}
            longitude={clinic_data.longitude}
          />
        </div>
        {!isMobile && <ReserveCont clinic={clinic_data} />}
      </div>
    </div>
  );
}

export default ClinicDetails


const clinic_data = {
  id: 1,
  name: "Algiers Medical Center",
  address: "Algiers, Rue Didouche Mourad, Building 45",
  description:
    "Algiers Medical Center is dedicated to providing high-quality healthcare services. Our team of experienced professionals ensures that each patient receives personalized and effective care in a welcoming environment.",
  phone: "+213773781669",
  isFavourite: true,
  rating: 4.2,
  latitude: 36.752887,
  longitude: 3.042048,
  offers: [
    { id: 1, name: "General Consultation" },
    { id: 2, name: "Pediatrics" },
    { id: 3, name: "Cardiology Check-up" },
    { id: 4, name: "Dermatology Treatment" },
    { id: 5, name: "Radiology Services" },
    { id: 6, name: "Laboratory Tests" },
    { id: 7, name: "Vaccinations" },
  ],
  reviews: [
    {
      user: {
        id: 1,
        name: "Kach Wahd",
        image: "/doctor1.jpg",
        createdAt: "2021-10-10",
      },
      review_content:
        "The staff were very friendly and professional. The environment was clean and the doctor took time to explain everything clearly. Highly recommended!, The staff were very friendly and professional. The environment was clean and the doctor took time to explain everything clearly. Highly recommended!",
    },
    {
      user: {
        id: 2,
        name: "Saidi Dounia",
        image: "/doctor2.jpg",
        createdAt: "2021-10-10",
      },
      review_content:
        "The staff were very friendly and professional. The environment was clean and the doctor took time to explain everything clearly. Highly recommended!",
    },
    {
      user: {
        id: 3,
        name: "Chiheb Rahmouni",
        image: "/doctor3.jpg",
        createdAt: "2021-10-10",
      },
      review_content:
        "The staff were very friendly and professional. The environment was clean and the doctor took time to explain everything clearly. Highly recommended!",
    },
  ],
  averageRatings: {
    communication: 4.5,
    cleanliness: 4.5,
    staff_friendliness: 4.5,
    treatment_effectiveness: 4.5,
    value_for_money: 4.5,
  },
  Prices: [
    { id: 1, service: "General Consultation", price: 3000 },
    { id: 2, service: "Pediatrics Check-up", price: 4000 },
    { id: 3, service: "Cardiology Examination", price: 6000 },
    { id: 4, service: "Dermatology Treatment", price: 4500 },
    { id: 5, service: "X-ray Imaging", price: 5000 },
  ],
  images: [
    {
      id: 1,
      url: "/clinic1.jpg",
    },
    {
      id: 2,
      url: "/clinic2.jpeg",
    },
    {
      id: 3,
      url: "/clinic3.webp",
    },
    {
      id: 4,
      url: "/clinic4.jpg",
    },
    {
      id: 4,
      url: "/clinic4.jpg",
    },
  ],
};

