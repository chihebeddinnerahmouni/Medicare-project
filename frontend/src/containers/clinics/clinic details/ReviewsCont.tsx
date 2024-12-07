import ReviewComp from "@/components/clinics/clinic details/ReviewComp";
// import { useTranslation } from "react-i18next";

const ReviewsCont = ({ reviews }: any) => {
  //   const { t } = useTranslation();

  // console.log(ship);

  return (
    <div className="w-full grid grid-cols-1 gap-7 lg:gap-10">
      <p className="font-bold">
        {/* {t("reviews")} */}
        Reviews
      </p>

      {reviews.length === 0 ? (
        <>
          <p className="text-writingGrey mx-auto">
            {/* {t("no_reviews_yet")} */}
            No reviews yet
          </p>
        </>
      ) : (
        <>
          {reviews.map(
            (comment: any, index: number) =>
              comment.review_content && (
                <ReviewComp key={index} comment={comment} />
              )
          )}
        </>
      )}

      {/* {ship.reviews.map(
        (comment: any, index: number) =>
          comment.review_content && (
            <CommentComp key={index} comment={comment} />
          )
      )} */}
    </div>
  );
};


export default ReviewsCont;
