import map from '@/assets/images/map.jpg';

const Map = ({userLocation}: any) => {
  return (
      <div className="w-full border-1 border-mainGreen h-[100%] rounded-20" style={{ backgroundImage: `url(${map})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
      
    </div>
  )
}

export default Map
