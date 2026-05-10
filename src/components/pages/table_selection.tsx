import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../nav";
import { Button } from "../ui/button";
import { useCart } from "../context/cart";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const LOCATION_ID = import.meta.env.VITE_API_LOCATION_ID;

export default function TableSelection() {
    const navigate = useNavigate();
    const { dispatch } = useCart();
    const [tableNum, setTableNum] = useState<number | null>(null);
    const [tables, setTables] = useState<number>(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTables() {
            try {
                const response = await fetch(`${BASE_URL}/api/locations/location/tables/${LOCATION_ID}`);
                if (response.ok) {
                    const data = await response.json();
                    setTables(data);
                }
            } catch (error) {
                console.error("Error fetching tables:", error);
            } finally {
                setLoading(false);
            }
    }
    fetchTables();
}, []);

    function handleSubmit() {
        if (tableNum) {
            dispatch({ type: "SET_TABLE", payload: tableNum });
            navigate("/menu");
        }
    }

    return (
        <div className="flex flex-col h-full bg-gray-50">
            <Navbar
                title="Seleziona il tuo tavolo"
                back={true}
                onBack={() => navigate("/mode-selection")}
            />

            <div className="flex flex-col flex-1 px-3 py-3 gap-8 min-h-0">

                {/* Indicatore tavolo selezionato */}
                <div className={`transition-all duration-300 rounded-2xl p-4 text-center
                    ${tableNum
                        ? "bg-blue-50 border-2 border-blue-400 opacity-100 scale-100"
                        : "bg-gray-100 border-2 border-dashed border-gray-300 opacity-60 scale-95"
                    }`}
                >
                    {tableNum ? (
                        <>
                            <p className="text-sm text-blue-500 font-medium">Tavolo selezionato</p>
                            <p className="text-4xl font-bold text-blue-700">{tableNum}</p>
                        </>
                    ) : (
                        <p className="text-gray-400 font-medium">Nessun tavolo selezionato</p>
                    )}
                </div>

                {/* Griglia tavoli */}
                {loading ? (
                    <div className="flex flex-1 items-center justify-center">
                        <p className="text-gray-400 animate-pulse">Caricamento tavoli...</p>
                    </div>
                ) : tables === 0 ? (
                    <div className="flex flex-1 items-center justify-center">
                        <p className="text-gray-400">Nessun tavolo disponibile</p>
                    </div>
                ) : (
                    <div className="flex-1 overflow-y-auto min-h-0 no-scrollbar">
                        <div className={`grid grid-cols-5 gap-3 p-4`}>
    {Array.from({ length: tables }).map((_, index) => {
        const num = index + 1;
        const isSelected = tableNum === num;
        return (
            <button
                key={index}
                onClick={() => setTableNum(isSelected ? null : num)}
                className={`
                    aspect-square rounded-xl font-bold text-sm
                    transition-all duration-200 active:scale-95
                    ${isSelected
                        ? "bg-blue-600 text-white shadow-md shadow-blue-200 scale-105"
                        : "bg-white text-blue-700 border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50"
                    }
                `}
            >
                {num}
            </button>
        );
    })}
</div>
                    </div>
                )}

                {/* Bottone conferma */}
                <Button
                    onClick={handleSubmit}
                    disabled={!tableNum}
                    className={`
                        w-full py-6 rounded-2xl text-lg font-bold
                        transition-all duration-300
                        ${tableNum
                            ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-200 translate-y-0 opacity-100"
                            : "bg-gray-200 text-gray-400 cursor-not-allowed translate-y-1 opacity-60"
                        }
                    `}
                >
                    {tableNum ? `Conferma tavolo ${tableNum}` : "Seleziona un tavolo"}
                </Button>

            </div>
        </div>
    );
}