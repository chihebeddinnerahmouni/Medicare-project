const CategoriesDummy = [
  {
    attributes: {
      Name: "Nurse",
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

export function getCategoryList():Array<{ attributes: { Name: string; Icon: { data: { attributes: { url: string } } } } }> {
  return CategoriesDummy;
}