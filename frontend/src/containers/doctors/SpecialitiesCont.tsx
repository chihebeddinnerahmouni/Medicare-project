import { useRef, useEffect } from "react";
import SpecialiteComp from "@/components/ui/cards/SpecialiteComp";

interface DropDownFilterProps {
  specialite: number;
  setSpecialite: (value: number) => void;
  array: {
    id: number;
    name: string;
    image: string;
  }[];
}

const SpecialitiesCont = ({
  specialite,
  setSpecialite,
  array,
}: DropDownFilterProps) => {


  const containerRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const container = containerRef.current;
    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    if (container) {
      const handleMouseDown = (e: MouseEvent) => {
        isDown = true;
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
      };

      const handleMouseLeave = () => {
        isDown = false;
      };

      const handleMouseUp = () => {
        isDown = false;
      };

      const handleMouseMove = (e: MouseEvent) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 3; // scroll-fast
        container.scrollLeft = scrollLeft - walk;
      };

      container.addEventListener("mousedown", handleMouseDown);
      container.addEventListener("mouseleave", handleMouseLeave);
      container.addEventListener("mouseup", handleMouseUp);
      container.addEventListener("mousemove", handleMouseMove);

      return () => {
        container.removeEventListener("mousedown", handleMouseDown);
        container.removeEventListener("mouseleave", handleMouseLeave);
        container.removeEventListener("mouseup", handleMouseUp);
        container.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, []);

  return (
    <div className="w-full flex justify-center">
      <div
        ref={containerRef}
        className="components flex items-center h-full gap-6 lg:gap-10 overflow-auto md:max-w-[320px] lg:max-w-[400px] xl:max-w-[700px] unselectable"
      >
        {array.map((item: any, index: number) => (
          <SpecialiteComp
            key={index}
            item={item}
            selected={specialite}
            setSelected={setSpecialite}
          />
        ))}
        {array.map((item: any, index: number) => (
          <SpecialiteComp
            key={index}
            item={item}
            selected={specialite}
            setSelected={setSpecialite}
          />
        ))}
      </div>
    </div>
  );
};


export default SpecialitiesCont;
