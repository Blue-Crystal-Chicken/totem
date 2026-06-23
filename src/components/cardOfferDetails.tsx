import { getImageUrl } from "@/constants/img";
import type { OfferResponse } from "@/types/offer.types"
import { useState } from "react";
import { useCart } from "./context/cart";
import { getCategoryEmoji } from "@/constants/category";
import { Button } from "./ui/button";
import CardOfferProduct from "./cardOfferProduct";

interface CardOfferDetailsProps {
    offer: OfferResponse;
}

export default function CardOfferDetails({ offer }: CardOfferDetailsProps) {
    const imageUrl = getImageUrl(offer.imgPath ?? undefined);
    const { dispatch } = useCart();
    
        const [quantity, setQuantity] = useState(1);
    
        const handleAddToCart = () => {
            dispatch({
                type: "ADD_ITEM",
                payload: {
                    id: `offer-${offer.id}`,
                    type: "OFFER",
                    referenceId: offer.id,
                    name: offer.name,
                    price: offer.price,
                    quantity: quantity,
                    imgPath: offer.imgPath ?? null,
                }
            });
        };

    
    return (
        <div className="flex flex-col h-full min-h-0 bg-white">
        
                    {/* Hero Image */}
                    <div className="relative w-full h-56 bg-[#EBF5FF] flex items-center justify-center overflow-hidden shrink-0">
                        {imageUrl ? (
                            <>
                                <img
                                    src={imageUrl}
                                    alt={offer.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-linear-to-b from-black/10 to-black/30" />
                            </>
                        ) : (
                            <span className="text-9xl opacity-90">
                                {getCategoryEmoji("Prodotti")}
                            </span>
                        )}
                    </div>

            {/* Contenuto Scrollabile */}
            <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar px-4 pt-5 pb-6 flex flex-col gap-6">
            {/* Nome + Prezzo */}
                <div className="flex items-start justify-between gap-3">
                    <h1 className="text-2xl font-bold text-[#185FA5] leading-tight flex-1">
                        {offer.name}
                    </h1>
                    <span className="text-2xl font-bold text-[#378ADD] whitespace-nowrap">
                        € {offer.price.toFixed(2)}
                    </span>
                </div>

                {/* Descrizione */}
                {offer.description && (
                    <p className="text-sm text-gray-600 leading-relaxed">
                        {offer.description}
                    </p>
                )}

                <div className="grid grid-cols-1 gap-2.5">
                    {offer.offerProducts.map((prod) => (
                            <CardOfferProduct 
                            name={prod.productName}
                            price={prod.unitPrice}
                            quantity={prod.quantity}
                            imgPath={getImageUrl(prod.productImagePath)}   
                            />
                        ))}
                    </div>
            </div>
            {/* Barra azione fissa in basso */}
                        <div className="shrink-0 border-t border-[#C8E8FF] bg-gray-100 backdrop-blur-md px-4 py-4">
            
                            <div className="flex flex-col items-center justify-center mt-3 w-full gap-4">
                                <div className="flex items-center justify-between gap-2 text-xs text-gray-500 w-full">
                                    <div className="flex items-center gap-12">
                                        {/* Pulsante − */}
                                <button
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                    className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#185FA5] text-3xl font-bold text-white shadow-md transition-all active:scale-90 hover:bg-[#144c84]"
                                >
                                    −
                                </button>
                                    <div className="w-20 flex items-center justify-center">
                                        <h1 className="text-6xl font-black text-[#378ADD] tabular-nums">
                                            {quantity}
                                        </h1>
                                    </div>
                                {/* Pulsante + */}
                                <button
                                    onClick={() => setQuantity(q => q + 1)}
                                    className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#378ADD] text-3xl font-bold text-white shadow-md transition-all active:scale-90 hover:bg-[#2f79c2]"
                                >
                                    +
                                </button>
                                </div>
                                    <div className="flex flex-col items-center justify-center gap-1">
                                    <h2 className="text-gray-500 text-xl">
                                        Totale: 
                                    </h2>
                                    <div className="w-64 flex items-center justify-center">
                                    <h1 className="font-bold text-[#185FA5] text-4xl tabular-nums">€ {(offer.price * quantity).toFixed(2)}</h1>
                                    </div>
                                    </div>
                            </div>
                            {/* Bottone Aggiungi al carrello */}
                                <Button
                                    onClick={handleAddToCart}
                                    className="flex-1 h-18 min-h-18 rounded-2xl bg-[#185FA5] text-xl font-black text-white shadow-lg transition-all active:scale-[0.98] hover:bg-[#144c84] w-full"
                                >
                                    Aggiungi al carrello 
                                </Button>
                        </div>
                    </div>
        </div>
    )
}

