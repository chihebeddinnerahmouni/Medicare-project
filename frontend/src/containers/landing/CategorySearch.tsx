import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategoryList } from "../../constant/CategoriesDummy.ts"; 

function CategorySearch() {
  interface Category {
    attributes: {
      Name: string;
      url: string;
      Icon: {
        data: {
          attributes: {
            url: string;
          };
        };
      };
    };
  }

  const [categoryList, setCategoryList] = useState<Category[]>([]);

  useEffect(() => {
    const categories = getCategoryList();
    setCategoryList(categories);
  }, []);

  return (
    <div className="bgred-200 mt-14 items-center flex flex-col gap-2">
      <h2 className="font-bold text-4xl tracking-wide">
        Search <span className="text-[#199b8a]">for a Service</span>
      </h2>

      <div className="grid grid-cols-3 mt-5 md:grid-cols-4 lg:grid-cols-6 ">
        {categoryList.length > 0
          ? categoryList.map(
              (item, index) =>
                index < 6 && (
                  <Link
                    to={item.attributes.url}
                    key={index}
                    className="flex flex-col text-center items-center p-5 bg-green-50 m-2 rounded-lg cursor-pointer gap-2 hover:scale-110 transition-all ease-in-out"
                  >
                    <img
                      src={item.attributes?.Icon?.data.attributes?.url}
                      alt="icon"
                      width={40}
                      height={40}
                    />
                    <label className="text-green-600 text-sm">
                      {item?.attributes?.Name}
                    </label>
                  </Link>
                )
            )
          : [1, 2, 3, 4, 5, 6].map((index) => (
              <div
                key={index}
                className=" bg-slate-200 m-2 w-[130px] h-[120px] rounded-lg animate-pulse"
              ></div>
            ))}
      </div>
    </div>
  );
}

export default CategorySearch;