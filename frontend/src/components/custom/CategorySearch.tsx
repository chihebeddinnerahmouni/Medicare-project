"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategoryList } from "../../constant/CategoriesDummy.ts"; // Import the function

function CategorySearch() {
  interface Category {
    attributes: {
      Name: string;
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
    <div className="mb-10 items-center px-5 flex flex-col gap-2">
      <h2 className="font-bold text-4xl tracking-wide">
        Search <span className="text-[#199b8a]">for a Service</span>
      </h2>
      <h2 className="text-gray-500 text-xl">
        Search the Service you want in one click
      </h2>

      <div className="flex w-full mt-3 max-w-sm items-center space-x-2">
        <Input type="text" placeholder="Search..." />
        <Button type="submit" className="bg-[#199b8a] text-white">
          <Search className="h-4 w-4 mr-2 text-white" />
          Search
        </Button>
      </div>

      {/* Display List of Category  */}
      <div className="grid grid-cols-3 mt-5 md:grid-cols-4 lg:grid-cols-6 ">
        {categoryList.length > 0
          ? categoryList.map(
              (item, index) =>
                index < 6 && (
                  <Link
                    to={"/search/" + item.attributes.Name}
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
          : [1, 2, 3, 4, 5, 6].map((item, index) => (
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