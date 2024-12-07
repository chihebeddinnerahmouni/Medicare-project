// import { useParams } from "react-router-dom";
// import isLoggedIn from "@/lib/isLogedin";
// import Swal from "sweetalert2";
// import { format } from "date-fns";
// import { ar, enUS } from "date-fns/locale";

const ReserveCont = ({ clinic }: any) => {
  //   const { boatId } = useParams<{ boatId: string }>();
  //   const { t, i18n } = useTranslation();
  //   const locale = i18n.language === "ar" ? ar : enUS;

  // console.log(ship);

  //   const inquiryHandler = () => {
  //     const isUserIn = isLoggedIn();
  //     if (!isUserIn) {
  //       Swal.fire({
  //         icon: "error",
  //         title: t("ops"),
  //         text: t("you_must_login_first"),
  //         timer: 3000,
  //         timerProgressBar: true,
  //         showConfirmButton: true,
  //         confirmButtonText: "Login",
  //         customClass: {
  //           confirmButton: "custom-confirm-button",
  //         },
  //         preConfirm: () => {
  //           window.open(`/login`, "_blank");
  //         },
  //       });
  //       return;
  //     }

  //     if (ship.owner.id === Number(localStorage.getItem("userId"))) {
  //       Swal.fire({
  //         icon: "error",
  //         title: t("ops"),
  //         text: t("you_cant_send_inquiry_to_your_own_boat"),
  //         timer: 3000,
  //         timerProgressBar: true,
  //         showConfirmButton: true,
  //         confirmButtonText: "Ok",
  //         customClass: {
  //           confirmButton: "custom-confirm-button",
  //         },
  //       });
  //       return;
  //     }

  //     if (localStorage.getItem("isBoatOwner") === "true") {
  //       Swal.fire({
  //         icon: "error",
  //         title: t("ops"),
  //         text: t("you_cant_send_inquiry_as_boat_owner"),
  //         timer: 3000,
  //         timerProgressBar: true,
  //         showConfirmButton: true,
  //         confirmButtonText: "Ok",
  //         customClass: {
  //           confirmButton: "custom-confirm-button",
  //         },
  //       });
  //       return;
  //     }

  //     if (localStorage.getItem("isBlocked") === "true") {
  //       Swal.fire({
  //         icon: "error",
  //         title: t("ops"),
  //         text: t("you_cant_send_inquiry_as_blocked_user"),
  //         timer: 3000,
  //         timerProgressBar: true,
  //         showConfirmButton: true,
  //         confirmButtonText: "Ok",
  //         customClass: {
  //           confirmButton: "custom-confirm-button",
  //         },
  //       });
  //       return;
  //     }
  //     window.open(`/inquiry/${boatId}`, "_blank");
  //   };

  return (
    <div
      className="w-full order-2 p-5 mt-5 rounded-20 md:px-10 md:py-8 lg:mt-0 lg:sticky lg:top-[110px]"
      style={{
        boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)",
      }}
    >
      <p className="font-bold text-writingMainDark flex items-center gap-1 text-[20px] lg:text-[23px]">
        <span>{clinic.phone}</span>
      </p>

      {/* prices */}
      <table className="prices w-full mt-5">
        <thead className="border-b">
          <tr>
            <th
              className={`text-base font-semibold text-mainGreen lg:text-[18px] p-2 text-left`}
            >
              Surgeries
            </th>
            <th
              className={`text-sm text-writingGrey font-medium lg:text-base p-2 text-right`}
            >
              Price
            </th>
          </tr>
        </thead>
        <tbody>
          {clinic.Prices.map((price: any, index: any) => (
            <tr key={index} className={`bg-white hover:bg-gray-100`}>
              <td
                className={`text-base font-semibold text-writingMainDark lg:text-[18px] p-2 text-left`}
              >
                {price.surgory}
              </td>
              <td
                className={`text-sm text-writingGrey font-medium lg:text-base p-2 text-right`}
              >
                {price.price} DA
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        // onClick={inquiryHandler}
        className="text-white flex-grow bg-mainGreen h-[40px] rounded-10 w-full mt-10 lg:mt-14 ml-2 hover:bg-mainGreenHover lg:h-[50px]"
      >
        Reserve
      </button>
    </div>
  );
};


export default ReserveCont;
