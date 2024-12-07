import { TiPin } from "react-icons/ti";
// import { useTranslation } from "react-i18next";

const OffersCont = ({ offers }: any) => {
  //   const { t, i18n } = useTranslation();
  return (
    <section>
      <p className="font-semibold text-writingMainDark text-[18px] lg:text-[20px]">
        {/* {t("what_this_accommodation_offers")} */}
        What this accommodation offers
      </p>

      <div className="offers grid grid-cols-1 mt-3 gap-2 lg:mt-5 xl:grid-cols-2">
        {offers.map((offer: any, index: number) => (
          <div key={index} className="offer flex items-center gap-2">
            <TiPin className="pin text-[22px] text-writingMainDark lg:text-[26px]" />
            <p className="text-writingMainDark text-sm lg:text-base">
              {/* {t(offer.name)} */}
              {/* {i18n.language === "ar" ? offer.arabic_name : offer.name} */}
              {offer.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OffersCont;
