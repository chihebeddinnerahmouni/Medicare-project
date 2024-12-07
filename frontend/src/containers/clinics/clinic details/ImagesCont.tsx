import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

const ImagesCont = ({ Images }: any) => {
  const [index, setIndex] = useState(-1);

  // console.log(ship);

  return (
    <div className="all grid grid-cols-1 gap-2 lg:grid-cols-12 lg:gap-6 lg:rounded-10 overflow-hidden">
      <img
        src={Images[0].url}
        className="h-[230px] w-full object-cover object-center rounded-10 md:h-[350px] lg:rounded-none lg:col-span-6 lg:h-[430px] cursor-pointer"
        alt="ship"
        onClick={() => setIndex(0)}
      />
      <div className="additionalPics flex gap-2 overflow-auto pb-1 lg:grid lg:grid-cols-2 lg:grid-auto-rows minmax(100px, auto) lg:grid-auto-flow row lg:col-span-6 lg:gap-4 lg:pb-0">
        {Images.slice(1, 5).map((pic: any, index: number) => {
          return (
            <img
              key={index}
              src={pic.url}
              alt="ship"
              onClick={() => setIndex(index + 1)}
              className="w-[130px] h-[85px] object-cover object-center rounded-10 md:flex-grow md:h-[100px] lg:rounded-none lg:w-full lg:h-[207px] cursor-pointer"
            />
          );
        })}
      </div>
      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        plugins={[Thumbnails, Fullscreen]}
        slides={Images.map((pic: any) => ({
          src: `${pic.url}`,
        }))}
      />
    </div>
  );
};


export default ImagesCont;
