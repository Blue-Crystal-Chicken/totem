import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import Navbar from "../nav";
import { useState } from "react";
import type { OrderRequest, OrderResponse } from "@/types/order.types";



const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const LOCATION_CITY = import.meta.env.VITE_API_LOCATION_CITY;
const LOCATION_ADDRESS = import.meta.env.VITE_API_LOCATION_ADDRESS;
const LOCATION_NAME = import.meta.env.VITE_API_LOCATION_NAME;
const LOCATION_ID = import.meta.env.VITE_API_LOCATION_ID;

export default function Checkout() {
    const { state, totalPrice, dispatch } = useCart();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const MAX_ATTEMPTS = 3;

    const paymentMethods = [
        { id: "cash", label: "Contanti alla cassa", icon: "💵", description: "Paga direttamente al bancone" },
        { id: "card", label: "Carta di Credito", icon: "💳", description: "Pagamento elettronico rapido" }
    ] as const;

    const selectedMethod = state.paymentType || "card";

    const handleConfirmOrder = async () => {
        setLoading(true);
        let attempts = 0;

        while (attempts < MAX_ATTEMPTS) {
            try {
                const orderRequest: OrderRequest = {
                    userId: null,
                    items: state.items.map(item => ({
                        productId: item.type === "PRODUCT" ? item.referenceId : null,
                        offerId: item.type === "OFFER" ? item.referenceId : null,
                        menuId: item.type === "MENU" ? item.referenceId : null,
                        quantity: item.quantity,
                        specialNote: null,
                        ingredientIds: null
                    })),
                    paymentType: selectedMethod,
                    serviceType: state.serviceType || "takeway",
                    orderType: "KIOSK",
                    tableNumber: state.table ? String(state.table) : null,
                    locationId: LOCATION_ID ? parseInt(LOCATION_ID) : null,
                    locationName: LOCATION_NAME,
                    locationAddress: LOCATION_ADDRESS,
                    locationCity: LOCATION_CITY
                };

                const response = await fetch(`${API_BASE_URL}/api/orders`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(orderRequest),
                });

                if (!response.ok) {
                    throw new Error("Errore durante la creazione dell'ordine");
                }

                const createdOrder: OrderResponse = await response.json();

                // Pulisci il carrello
                dispatch({ type: "CLEAR_CART" });

                // Naviga alla pagina di successo
                navigate("/order-success", { state: { order: createdOrder } });
                setError(null);
                break;

            } catch (err) {
                console.error("Error creating order:", err);
                setError("Errore nell'invio dell'ordine. Riprovo...");
                attempts++;
            }
        }

        if (attempts >= MAX_ATTEMPTS) {
            setError("Errore nell'invio dell'ordine. Riprova più tardi.");
            navigate(`/error?message=${error}`);
        }

        setLoading(false);
    };

    return (
        <div className="flex flex-col h-full min-h-0 bg-white">
            <Navbar
                title="Blue Crystal"
                subtitle={`Chicken -${state.table ? ` Tavolo ${state.table}` : 'Takeaway'}`}
                back={true}
                onBack={() => navigate(`/cart`)}
            />

            <div className="flex-1 overflow-y-auto no-scrollbar p-6 bg-[#F8FAFC]">
                <div className="max-w-md mx-auto space-y-6">

                    {/* Payment Selection */}
                    <section className="space-y-4">
                        <h2 className="text-sm font-bold text-[#185FA5] uppercase tracking-widest px-1">
                            Metodo di Pagamento
                        </h2>
                        <div className="grid grid-cols-1 gap-3">
                            {paymentMethods.map((method) => (
                                <button
                                    key={method.id}
                                    disabled={loading}
                                    onClick={() => dispatch({ type: "SET_PAYMENT", payload: method.id })}
                                    className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all text-left ${selectedMethod === method.id
                                            ? "border-[#378ADD] bg-white shadow-md ring-4 ring-blue-50"
                                            : "border-transparent bg-white/50 text-gray-500 opacity-70 hover:opacity-100"
                                        } ${loading ? "cursor-not-allowed opacity-50" : ""}`}
                                >
                                    <span className="text-4xl">{method.icon}</span>
                                    <div className="flex-1">
                                        <p className={`font-bold ${selectedMethod === method.id ? "text-[#185FA5]" : "text-gray-600"}`}>
                                            {method.label}
                                        </p>
                                        <p className="text-xs opacity-60 font-medium">
                                            {method.description}
                                        </p>
                                    </div>
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedMethod === method.id ? "border-[#378ADD] bg-[#378ADD]" : "border-gray-200"
                                        }`}>
                                        {selectedMethod === method.id && (
                                            <div className="w-2 h-2 bg-white rounded-full" />
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* Summary Card */}
                    <div className="bg-white rounded-3xl shadow-xl shadow-blue-900/5 p-8 border border-[#EBF5FF]">
                        <div className="flex flex-col items-center text-center mb-8">
                            <h2 className="text-sm font-bold text-[#185FA5] uppercase tracking-[0.2em] mb-2">
                                Riepilogo Ordine
                            </h2>
                            <div className="h-1 w-12 bg-[#378ADD] rounded-full opacity-30" />
                        </div>

                        <div className="space-y-4 mb-10">
                            <div className="flex justify-between items-center py-3 border-b border-gray-50 text-sm">
                                <span className="text-gray-500 font-medium">Servizio</span>
                                <span className="text-[#185FA5] font-bold">
                                    {state.serviceType === "dine-in" ? ` Consumazione al Tavolo - ${state.table}` : "Asporto / Takeaway"}
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b border-gray-50 text-sm">
                                <span className="text-gray-500 font-medium">Metodo scelto</span>
                                <span className="text-[#185FA5] font-bold">
                                    {selectedMethod === "cash" ? "Contanti" : "Carta"}
                                </span>
                            </div>
                            <div className="flex justify-between items-center pt-4">
                                <span className="text-lg font-bold text-[#185FA5]">Totale</span>
                                <span className="text-4xl font-black text-[#185FA5]">
                                    € {totalPrice.toFixed(2)}
                                </span>
                            </div>
                        </div>

                        <button
                            disabled={loading || state.items.length === 0}
                            className="w-full h-20 bg-[#185FA5] text-white rounded-2xl font-black text-2xl shadow-lg shadow-blue-900/20 active:scale-[0.98] transition-all hover:bg-blue-800 flex items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={handleConfirmOrder}
                        >
                            {loading ? (
                                <span>Invio in corso...</span>
                            ) : (
                                <>
                                    <span>{selectedMethod === "cash" ? "Concludi Ordine" : "Paga Ora"}</span>
                                    <span className="text-3xl">{selectedMethod === "cash" ? "✅" : "💳"}</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}