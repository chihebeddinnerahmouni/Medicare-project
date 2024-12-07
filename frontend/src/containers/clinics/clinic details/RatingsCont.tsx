import RatingComp from "../../../components/clinics/clinic details/RatingComp";

const RatingsCont = ({ averageRatings }: any) => {
  return (
    <div className="w-full grid grid-cols-1 gap-5 2xl:grid-cols-2 lg:gap-x-10">
      <RatingComp
        // title={"communication"}
        title={"Communication"}
        rating={averageRatings.communication}
      />
      <RatingComp
        // title={"cleanliness"}
        title={"Cleanliness"}
        rating={averageRatings.cleanliness} />
      <RatingComp
        // title={"staff_friendliness"}
        title={"Staff Friendliness"}
        rating={averageRatings.staff_friendliness}
      />
      <RatingComp
        // title={"treatment_effectiveness"}
        title={"Treatment Effectiveness"}
        rating={averageRatings.treatment_effectiveness}
      />
      <RatingComp
        // title={"value_for_money"}
        title={"Value For Money"}
        rating={averageRatings.value_for_money}
      />
    </div>
  );
};

export default RatingsCont;
