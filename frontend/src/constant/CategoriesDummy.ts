const CategoriesDummy = [
  {
    attributes: {
      Name: "Nurse",
      url: "/nurses",
      Icon: {
        data: {
          attributes: {
            url: "/nurse.png",
          },
        },
      },
    },
  },
  {
    attributes: {
      Name: "Doctor",
      url: "/doctors",
      Icon: {
        data: {
          attributes: {
            url: "/doctor.png",
          },
        },
      },
    },
  },
  {
    attributes: {
      Name: "Clinics",
      url: "/clinics",
      Icon: {
        data: {
          attributes: {
            url: "/clinic.png",
          },
        },
      },
    },
  },
  {
    attributes: {
      Name: "Pharmacy",
      url: "/pharmacies",
      Icon: {
        data: {
          attributes: {
            url: "/pharmacy.svg",
          },
        },
      },
    },
  },

  {
    attributes: {
      Name: "Dentiste",
      url: "/dentists",
      Icon: {
        data: {
          attributes: {
            url: "/dentist.svg",
          },
        },
      },
    },
  },
  {
    attributes: {
      Name: "More",
      url: "/more",
      Icon: {
        data: {
          attributes: {
            url: "/more.svg",
          },
        },
      },
    },
  },
];

export function getCategoryList(): Array<{ attributes: { Name: string; url: string; Icon: { data: { attributes: { url: string } } } } }> {
  return CategoriesDummy;
}