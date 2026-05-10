import backgroundHome from '@/assets/home.gif';
import logo from '@/assets/hero.png';
import { useNavigate } from 'react-router-dom';


export default function Home(){
  const navigate = useNavigate();
    
  return (
    <div className="flex-1 relative flex flex-col items-center justify-center">
      <img 
        src={backgroundHome} 
        alt="bg" 
        className="absolute inset-0 z-0 w-full h-full" 
      />
      
      <div className="relative z-10 flex flex-col items-center gap-8 p-4">
        <div>
          <img src={logo} alt="logo" className='h-[550px] w-[800px] object-contain'/>
        </div>
        <button 
          className="px-12 py-6 bg-blue-600 hover:bg-blue-500 text-white text-2xl font-bold rounded-full transition-all transform hover:scale-105 shadow-xl cursor-pointer"
          onClick={() => {navigate("/mode-selection")}}
        >
          INIZIA
        </button>
      </div>
    </div>
    )
}