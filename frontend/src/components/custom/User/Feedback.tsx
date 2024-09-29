const Feedback = ({demander, setDemander, setComment, firstName, lastName}: any) => {
  return (
    <div className="px-5 pt-[34px] flex flex-col items-center w-full h-[298px] bg-[#EFF2F9] rounded-[12px]">
      <p className="text-secondaryWritingGrey font-semibold">
        Est ce que vous aimeriez etre jumuler avec {firstName} {lastName} à
        l'avenir ?
      </p>
      <div className="buttons mt-[24px] flex gap-[34px]">
        <button
          className={`w-[82px] h-[35px] rounded-20 border-1 ${
            !demander
              ? "text-mainGreen border-mainGreen"
              : "text-secondaryWritingGrey border-secondaryWritingGrey"
          }`}
          onClick={() => setDemander(!demander)}
        >
          Non
        </button>
        <button
          className={`w-[82px] h-[35px] rounded-20 border-1 ${
            demander
              ? "text-mainGreen border-mainGreen"
              : "text-secondaryWritingGrey border-secondaryWritingGrey"
          }`}
          onClick={() => setDemander(!demander)}
        >
          Oui
        </button>
      </div>

      <hr className="border-t-1 w-full mt-[34px] border-secondaryWritingGrey" />

      {/* <input
        type="text"
        id="commentField"
        className="h-full w-full appearance-none bg-[#EFF2F9]"
        placeholder="Voudrez vous nous dire quelque chose?"
        onChange={(e) => setComment(e.target.value)}
      /> */}

      {/* <input type="text" id="commentField" className="h-full w-full appearance-none bg-[#EFF2F9]" placeholder="Voudrez vous nous dire quelque chose?" onChange={(e) => setComment(e.target.value)} /> */}
    </div>
  );
};

export default Feedback;
