import { useState } from "react";

const DescCont = ({ description }: any) => {
  const maxLetters = 400;
  const hasOverflow = description.length > maxLetters;
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-full p-4 relative">
      <div className="text flex flex-col">
        <p className="font-bold">Description</p>
        <p className="break-all">
          {isExpanded || !hasOverflow
            ? description
            : `${description.substring(0, maxLetters)}...`}
        </p>
        {hasOverflow && (
          <button
            className="mt-[0px] text-sm text-writingGrey mx-2"
            onClick={() => setIsExpanded(!isExpanded)}
          >
                      {isExpanded ? "Hide" : "Show More"}
          </button>
        )}
      </div>
    </div>
  );
};


export default DescCont;
