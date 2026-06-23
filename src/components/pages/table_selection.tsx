import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../nav";
import { useCart } from "../context/cart";
import { Delete, Check } from "lucide-react";

export default function TableSelection() {
    const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "d", "0", "v"];
    const navigate = useNavigate();
    const { dispatch } = useCart();
    const [tableNum, setTableNum] = useState<string>("");

    function handleKey(key: string) {
        if (key === "d") {
            setTableNum(prev => prev.slice(0, -1));
        } else if (key === "v") {
            handleSubmit();
        } else {
            if (tableNum.length < 3) {
                setTableNum(prev => prev + key);
            }
        }
    }

    function handleSubmit() {
        if (tableNum) {
            dispatch({ type: "SET_TABLE", payload: tableNum });
            navigate("/home");
        }
    }

    return (
        <div className="flex flex-col h-full bg-gray-50">
            <Navbar
                title="Seleziona il tuo tavolo"
                back={true}
                onBack={() => navigate("/mode-selection")}
            />

            <div className="flex flex-col flex-1 items-center justify-center px-6 gap-6">

                {/* Display numero tavolo */}
                <div className="w-full max-w-xs flex flex-col items-center gap-1">
                    <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                        Tavolo selezionato
                    </span>
                    <div className={`
                        w-full flex items-center justify-center
                        h-20 rounded-2xl border-2
                        text-4xl font-bold tracking-widest
                        transition-all duration-200
                        ${tableNum
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-gray-200 bg-white text-gray-300"
                        }
                    `}>
                        {tableNum || "—"}
                    </div>
                </div>

                {/* Tastierino numerico */}
                <div className="grid grid-cols-3 gap-3 w-full max-w-xs">
                    {keys.map((key) => {
                        const isBackspace = key === "d";
                        const isConfirm = key === "v";
                        const isDisabled = isConfirm && !tableNum;

                        return (
                            <button
                                key={key}
                                onClick={() => handleKey(key)}
                                disabled={isDisabled}
                                className={`
                                    h-16 rounded-2xl text-2xl font-semibold
                                    flex items-center justify-center
                                    transition-all duration-150 active:scale-95
                                    select-none
                                    ${isConfirm
                                        ? tableNum
                                            ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                                            : "bg-gray-100 text-gray-300 cursor-not-allowed"
                                        : isBackspace
                                            ? "bg-gray-100 text-gray-500 hover:bg-gray-200"
                                            : "bg-white border border-gray-200 text-gray-800 hover:bg-gray-50 shadow-sm"
                                    }
                                `}
                            >
                                {key === "d" ? <Delete /> : key === "v" ? <Check /> : key}
                            </button>
                        );
                    })}
                </div>

            </div>
        </div>
    );
}