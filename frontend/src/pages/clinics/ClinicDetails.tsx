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
      <div className="w-full grid grid-cols-1 md:max-w-[700px] lg:max-w-full lg:flex lg:gap-x-10 lg:items-start 2xl:max-w-[1700px]">
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
          <OffersCont offers={clinic_data.offres} />
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
  name: "Clinic Name",
  address: "City, Street, Building",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, facilisis sapien. Donec quis luctus purus. Donec nec lacus nec metus tincidunt aliquam. Sed nec varius eros. Sed auctor nunc nec ",
  phone: "+213773781669",
  isFavourite: true,
  rating: 4.2,
  latitude: 36.752887,
  longitude: 3.042048,
  offres: [
    {
      id: 1,
      name: "Service Name",
    },
    {
      id: 2,
      name: "Service Name",
    },
    {
      id: 3,
      name: "Service Name",
    },
    {
      id: 4,
      name: "Service Name",
    },
    {
      id: 4,
      name: "Service Name",
    },
    {
      id: 4,
      name: "Service Name",
    },
    {
      id: 4,
      name: "Service Name",
    },
    {
      id: 4,
      name: "Service Name",
    },
    {
      id: 4,
      name: "Service Name",
    },
  ], 
  reviews: [
    {
      user: {
        id: 1,
        name: "User Name",
        image: "/doctor1.jpg",
        createdAt: "2021-10-10",
      },
      review_content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, facilisis sapien. Donec quis luctus purus. Donec nec lacus nec metus tincidunt aliquam. Sed nec varius eros. Sed auctor nunc nec ",
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
    {
      id: 1,
      surgory: "Service Name",
      price: 100,
    },
    {
      id: 2,
      surgory: "Service Name",
      price: 100,
    },
    {
      id: 3,
      surgory: "Service Name",
      price: 100,
    },
    {
      id: 4,
      surgory: "Service Name",
      price: 100,
    },
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