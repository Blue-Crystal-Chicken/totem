import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import Navbar from "../nav";
import { getImageUrl } from "@/constants/img";
import CardCartProduct from "../cardCartProduct";
import { Button } from "../ui/button";


export default function Cart() {

    const { state, dispatch } = useCart();
    const navigate = useNavigate();

    const total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleRemoveItem = (id: string) => {
        dispatch({ type: "REMOVE_ITEM", payload: { id } });
    };

    const handleUpdateQuantity = (id: string, quantity: number) => {
        dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
    };

    const handleClearCart = () => {
        dispatch({ type: "CLEAR_CART" });
    };

    const handleProceedToCheckout = () => {
        dispatch({ type: "SET_TOTAL", payload: { total } });
        navigate("/checkout");
    };

    const handleGoBack = () => {
        navigate("/home");
    }

    return (
        <div className="flex flex-col h-full min-h-0 bg-white">
            <Navbar
                title="Blue Crystal"
                subtitle={`Chicken -${state.table ? ` Tavolo ${state.table}` : 'Takeaway'}`}
                back={true}
                onBack={handleGoBack}
            />

            {state.items.length > 0 ? (
                <>
                    {/* Lista Prodotti Scrollabile */}
                    <div className="flex-1 overflow-y-auto min-h-0 no-scrollbar px-4 pt-4 pb-6 flex flex-col gap-4">
                        {state.items.map((item, index) => (
                            <CardCartProduct
                                key={`${item.id}-${index}`}
                                name={item.name}
                                quantity={item.quantity}
                                price={item.price}
                                img={item.imgPath ? getImageUrl(item.imgPath) : ""}
                                ingredientNames={item.ingredientNames}
                                onUpdateQuantity={(quantity: number) => handleUpdateQuantity(item.id, quantity)}
                                onRemove={() => handleRemoveItem(item.id)}
                            />
                        ))}
                    </div>

                    {/* Footer Fisso */}
                    <div className="shrink-0 border-t border-[#C8E8FF] bg-[#F8FAFC] p-6 space-y-5 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)]">
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-[#185FA5] uppercase tracking-widest">
                                    Totale Ordine
                                </span>
                                <span className="text-lg text-gray-500 font-medium">
                                    {state.items.reduce((total, item) => total + item.quantity, 0)} prodotti
                                </span>
                            </div>
                            <div className="text-right">
                                <span className="text-3xl font-black text-[#185FA5]">
                                    € {total.toFixed(2)}
                                </span>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Button
                                onClick={handleClearCart}
                                className="h-16 px-6 rounded-2xl bg-red-50 text-red-600 font-bold text-lg shadow-sm hover:bg-red-100 hover:text-red-700 transition-colors"
                            >
                                Svuota
                            </Button>
                            <Button
                                onClick={handleProceedToCheckout}
                                className="flex-1 h-16 rounded-2xl bg-primary text-white font-black text-xl shadow-lg shadow-blue-900/20 transition-all active:scale-[0.98] hover:bg-blue-800 flex items-center justify-center gap-3"
                            >
                                <span className="mr-2">Paga ora</span>
                                <span className="text-2xl inline-block animate-slide-left">➔</span>
                            </Button>
                        </div>
                    </div>
                </>
            ) : (
                <div className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-[#F8FAFC]">
                    <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-xl mb-8">
                        <span className="text-6xl">🛒</span>
                    </div>
                    <h2 className="text-3xl font-bold text-[#185FA5] mb-4">Il tuo carrello è vuoto</h2>
                    <p className="text-gray-500 text-lg mb-10 max-w-xs">
                        Aggiungi i tuoi piatti preferiti dal menu per iniziare l'ordine.
                    </p>
                    <Button
                        onClick={handleGoBack}
                        className="px-10 py-4 bg-primary text-white font-bold rounded-2xl shadow-lg transition-all active:scale-95 hover:bg-blue-800"
                    >
                        Vai al Menu
                    </Button>
                </div>
            )}
        </div>
    );
}

