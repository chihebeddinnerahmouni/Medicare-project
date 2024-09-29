import React from 'react'

const AllOpenButtoms = ({option, setOption, open, all}: any) => {
  return (
    <div className="buttons w-full mt-4 flex justify-center gap-[48px]">
                  <button className={`font-medium p-2 ${option === 'all' ?  'text-mainWritingGrey rounded-10' : 'text-secondaryWritingGrey'}`} style={option === 'all' ? {backgroundColor: 'rgba(25, 155, 138, 0.2)'} : {}} onClick={()=> setOption("all")}>
                    Toutes
                  </button>      
                  <button className={`font-medium p-2 ${option === 'open' ?  'text-mainWritingGrey rounded-10' : 'text-secondaryWritingGrey'}`} style={option === 'open' ? {backgroundColor: 'rgba(25, 155, 138, 0.2)'} : {}} onClick={()=> setOption("open")}>
                    Ouvertes
                  </button>           
        </div> 
  )
}

export default AllOpenButtoms
