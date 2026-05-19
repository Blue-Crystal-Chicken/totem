import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Progress } from "@/components/ui/progress";
import Navbar from "../nav";
import type { OrderResponse } from "@/types/order.types";
import { useState, useEffect } from "react";

export default function OrderSuccess() {
    const location = useLocation();
    const navigate = useNavigate();
    const order = location.state?.order as OrderResponse;
    const COUNTDOWN = 5;
    const [count, setCount] = useState(COUNTDOWN);
    
      useEffect(() => {
        if (count <= 0) {
          navigate("/");
          return;
        }
        const t = setTimeout(() => setCount((c) => c - 1), 1000);
        return () => clearTimeout(t);
      }, [count]);
    
      const progress = ((COUNTDOWN - count) / COUNTDOWN) * 100;

    if (!order) {
        return (
            <div className="flex flex-col h-full bg-white">
                <Navbar title="Blue Crystal" back={true} onBack={() => navigate("/menu")} />
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                    <h1 className="text-2xl font-bold text-[#185FA5]">Nessun ordine trovato</h1>
                    <Button onClick={() => navigate("/")} className="mt-4 bg-[#185FA5] text-white rounded-2xl px-8 h-14 font-bold shadow-lg">
                        Torna al Menu
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-white">
            <Navbar 
                title="Blue Crystal" 
                subtitle="Ordine Confermato" 
                back={false}
            />

            <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[#F8FAFC]">
                <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl shadow-blue-900/10 p-10 flex flex-col items-center text-center border border-[#EBF5FF]">

                    <h1 className="text-3xl font-black text-[#185FA5] mb-2">Grazie per il tuo ordine!</h1>
                    <p className="text-gray-500 font-medium mb-10">
                        Ti avviseremo noi quando il tuo ordine sarà pronto per il ritiro.
                    </p>

                    {/* Order Ticket Card */}
                    <div className="w-full bg-[#185FA5] rounded-2xl p-8 text-white relative overflow-hidden shadow-xl mb-10">
                        {/* Decorative circle cutouts */}
                        <div className="absolute top-1/2 -left-3 w-6 h-6 bg-[#F8FAFC] rounded-full -translate-y-1/2" />
                        <div className="absolute top-1/2 -right-3 w-6 h-6 bg-[#F8FAFC] rounded-full -translate-y-1/2" />
                        
                        <div className="flex flex-col items-center">
                            <span className="text-xs font-bold uppercase tracking-[0.3em] opacity-60 mb-2">
                                Numero d'Ordine
                            </span>
                            <span className="text-7xl font-black tracking-tighter mb-4">
                                #{order.code}
                            </span>
                            <div className="h-px w-full bg-white/20 mb-4 flex justify-center items-center" />
                            {/* Countdown con Progress */}
                            <div className="w-full flex flex-col items-center gap-2 mt-2">
                                <p className="text-xs font-semibold uppercase tracking-widest opacity-60">
                                    Ritorno alla home in {count}s
                                </p>
                                <Progress
                                    value={progress}
                                    className="h-2 w-full bg-white rounded-full overflow-hidden"
                                />
                            </div>
                        </div>
                    </div>

                    <Button 
                        onClick={() => navigate("/")}
                        className="w-full h-16 bg-[#185FA5] text-white rounded-2xl font-black text-xl shadow-lg shadow-blue-900/20 active:scale-95 transition-all hover:bg-blue-800"
                    >
                        Nuovo Ordine
                    </Button>

                    <p className="mt-2 text-xs text-gray-400 font-medium uppercase tracking-widest">
                        Blue Crystal Chicken &copy; {new Date().getFullYear()}
                    </p>
                </div>
            </div>
        </div>
    );
}
