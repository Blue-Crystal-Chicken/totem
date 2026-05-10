import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Armchair, ShoppingBag } from "lucide-react";
import { Button } from "../ui/button";
import Navbar from "../nav";
import { useCart } from "../context/cart";


export default function ModeSelection() {
    const navigate = useNavigate();
    type ServiceMode = "take_away" | "dine_in";
    const dispatch = useCart().dispatch;
    const [serviceMode,setServiceMode] = useState<ServiceMode | null>(null);

    function handleSubmit() {
        if(serviceMode === "take_away") {
            dispatch({ type: "SET_MODE", payload: "takeaway" });
            navigate("/menu");
        } else {
            dispatch({ type: "SET_MODE", payload: "dine-in" });
            navigate("/table-selection");
        }
    }

    return (
        <div className="flex-1 flex flex-col">
            <Navbar
                title="Seleziona come preferisci ordinare"
                back={false}
            />
        <div className="flex-1 bg-zinc-200 flex flex-col items-center justify-center gap-6">
            
            <button
                onClick={() => setServiceMode("take_away")}
                className={`h-64 w-64 bg-white flex flex-col items-center justify-center rounded-xl gap-4 hover:scale-105 transition-all duration-200 hover:ring-2 hover:ring-blue-600 ${serviceMode === "take_away" ? "ring-2 ring-blue-600 scale-105" : ""}`}>
                <ShoppingBag className="text-blue-600 h-16 w-16"/>
                <h2 className="text-2xl font-bold text-blue-600">Asporto</h2>
                <p className="text-lg text-gray-600 font-medium">Ritira il tuo ordine al banco</p>
            </button>
            <button
                onClick={() => setServiceMode("dine_in")}
                className={`h-64 w-64 bg-white flex flex-col items-center justify-center rounded-xl gap-4 hover:scale-105 transition-all duration-200 hover:ring-2 hover:ring-blue-600 ${serviceMode === "dine_in" ? "ring-2 ring-blue-600 scale-105" : ""}`}>
                <Armchair className="text-blue-600 h-16 w-16"/>
                <h2 className="text-2xl font-bold text-blue-600">Mangia qui</h2>
                <p className="text-lg text-gray-600 font-medium">Siediti e gusta i nostri piatti</p>
            </button>

            <Button
                    onClick={handleSubmit}
                    className="bg-blue-600 w-64 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    size="lg"
                    disabled={!serviceMode}
                >
                    Avanti
                </Button>

                </div>
        </div>
    )
}