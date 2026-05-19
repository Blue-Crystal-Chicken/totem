import { getImageUrl } from "@/constants/img";
import { getCategoryEmoji } from "@/constants/category";
import type { ProductResponse } from "@/types/product.types";
import { useCart } from "./context/cart";
import { Button } from "./ui/button";
import { useState } from "react";
import { Check } from "lucide-react";

interface ProductDetailsProps {
    product: ProductResponse;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
    const imageUrl = getImageUrl(product.imgPath ?? undefined);

    const genericAttrs = [
        { label: "Dimensione", icon: "📐", value: product.size ?? "", show: !!product.size },
        { label: "Quantità", icon: "📦", value: `${product.quantity}`, show: product.quantity != null },
        { label: "Peso", icon: "⚖️", value: `${product.weight} g`, show: product.weight != null },
        { label: "Litri", icon: "💧", value: `${product.liters} L`, show: product.liters != null },
    ];

    const foodAttrs = [
        { label: "Piccante", icon: "🌶️", value: "Piccante", show: !!product.isSpicy },
        { label: "Gusto", icon: "🍬", value: product.flavor ?? "", show: !!product.flavor },
        { label: "Temperatura", icon: "🌡️", value: product.temperature ?? "", show: !!product.temperature },
        { label: "Gassato", icon: "🫧", value: "Gassato", show: !!product.isCarbonated },
    ];

    const nutritionAttrs = [
        { label: "Calorie", icon: "🔥", value: `${product.calories} kcal`, show: product.calories != null },
        { label: "Vegetariano", icon: "🥦", value: "Vegetariano", show: !!product.isVegetarian },
        { label: "Vegano", icon: "🌱", value: "Vegano", show: !!product.isVegan },
        { label: "Senza Glutine", icon: "🌾", value: "Senza Glutine", show: !!product.isGlutenFree },
    ];

    const visibleGeneric = genericAttrs.filter(a => a.show);
    const visibleFood = foodAttrs.filter(a => a.show);
    const visibleNutrition = nutritionAttrs.filter(a => a.show);

    const { dispatch } = useCart();
    const state = useCart().state;

    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(product.price);

    const handleAddToCart = () => {
        const extraNames = product.ingredients
            ?.filter(ing => selectedExtras.includes(ing.id))
            .map(ing => ing.name) || [];
            
        // Genera un ID unico basato sul prodotto e gli extra selezionati
        // Ordiniamo gli ID degli extra per garantire che la stessa combinazione abbia lo stesso ID carrello
        const sortedExtras = [...selectedExtras].sort((a, b) => a - b);
        const uniqueId = sortedExtras.length > 0 
            ? `product-${product.id}-extra-${sortedExtras.join('-')}`
            : `product-${product.id}`;

        dispatch({
            type: "ADD_ITEM",
            payload: {
                id: uniqueId,
                type: "PRODUCT",
                referenceId: product.id,
                name: product.name,
                price: price, // Usa il prezzo corrente che include gli extra
                quantity: quantity,
                imgPath: product.imgPath ?? null,
                category: product.category?.name,
                ingredientIds: sortedExtras,
                ingredientNames: extraNames,
            }
        });
    };

    const [selectedExtras, setSelectedExtras] = useState<number[]>([]);

    const handleAddExtraIngredient = (ingredient: { id: number; name: string; price: number }) => {
        const isSelected = selectedExtras.includes(ingredient.id);

        if (isSelected) {
            // Rimuovi extra
            setSelectedExtras(prev => prev.filter(id => id !== ingredient.id));
            setPrice(prev => prev - ingredient.price);
        } else {
            // Aggiungi extra
            setSelectedExtras(prev => [...prev, ingredient.id]);
            setPrice(prev => prev + ingredient.price);
        }
    };

    return (
        <div className="flex flex-col h-full min-h-0 bg-white">

            {/* Hero Image */}
            <div className="relative w-full h-56 bg-[#EBF5FF] flex items-center justify-center overflow-hidden shrink-0">
                {imageUrl ? (
                    <>
                        <img
                            src={imageUrl}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-b from-black/10 to-black/30" />
                    </>
                ) : (
                    <span className="text-9xl opacity-90">
                        {getCategoryEmoji(product.category?.name ?? "Prodotti")}
                    </span>
                )}
            </div>

            {/* Contenuto Scrollabile */}
            <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar px-4 pt-5 pb-6 flex flex-col gap-6">

                {/* Nome + Prezzo */}
                <div className="flex items-start justify-between gap-3">
                    <h1 className="text-2xl font-bold text-[#185FA5] leading-tight flex-1">
                        {product.name}
                    </h1>
                    <span className="text-2xl font-bold text-[#378ADD] whitespace-nowrap">
                        € {product.price.toFixed(2)}
                    </span>
                </div>

                {/* Descrizione */}
                {product.description && (
                    <p className="text-sm text-gray-600 leading-relaxed">
                        {product.description}
                    </p>
                )}

                {/* Sezioni Attributi */}
                <div className="grid grid-cols-2 gap-2.5">
                    {visibleGeneric.length > 0 && (
                        <section>
                            <h2 className="text-xs font-bold text-[#185FA5] uppercase tracking-widest mb-3">
                                Informazioni
                            </h2>
                            <div className="grid grid-cols-3 gap-2.5">
                                {visibleGeneric.map(attr => (
                                    <div
                                        key={attr.label}
                                        className="flex flex-col items-center gap-1 bg-[#EBF5FF] border border-[#C8E8FF] rounded-2xl px-3 py-3.5 hover:bg-[#E0F0FF] transition-all"
                                    >
                                        <span className="text-3xl mb-1">{attr.icon}</span>
                                        <span className="text-[10px] font-semibold text-[#185FA5] text-center leading-none">
                                            {attr.label}
                                        </span>
                                        <span className="text-sm font-semibold text-[#378ADD] text-center mt-0.5">
                                            {String(attr.value)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {visibleFood.length > 0 && (
                        <section>
                            <h2 className="text-xs font-bold text-[#185FA5] uppercase tracking-widest mb-3">
                                Caratteristiche
                            </h2>
                            <div className="grid grid-cols-3 gap-2.5">
                                {visibleFood.map(attr => (
                                    <div
                                        key={attr.label}
                                        className="flex flex-col items-center gap-1 bg-[#EBF5FF] border border-[#C8E8FF] rounded-2xl px-3 py-3.5 hover:bg-[#E0F0FF] transition-all"
                                    >
                                        <span className="text-3xl mb-1">{attr.icon}</span>
                                        <span className="text-sm font-semibold text-[#378ADD] text-center">
                                            {String(attr.value)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {visibleNutrition.length > 0 && (
                        <section>
                            <h2 className="text-xs font-bold text-[#185FA5] uppercase tracking-widest mb-3">
                                Valori Nutrizionali
                            </h2>
                            <div className="grid grid-cols-3 gap-2.5">
                                {visibleNutrition.map(attr => (
                                    <div
                                        key={attr.label}
                                        className="flex flex-col items-center gap-1 bg-[#EBF5FF] border border-[#C8E8FF] rounded-2xl px-3 py-3.5 hover:bg-[#E0F0FF] transition-all"
                                    >
                                        <span className="text-3xl mb-1">{attr.icon}</span>
                                        <span className="text-[10px] font-semibold text-[#185FA5] text-center">
                                            {attr.label}
                                        </span>
                                        {attr.label === "Calorie" && (
                                            <span className="text-sm font-semibold text-[#378ADD]">
                                                {String(attr.value)}
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Ingredienti */}
                {product.ingredients?.length > 0 && (
                    <section>
                        <h2 className="text-xs font-bold text-[#185FA5] uppercase tracking-widest mb-3">
                            Extra Ingredienti
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {product.ingredients.map(ing => {
                                const isSelected = selectedExtras.includes(ing.id);
                                return (
                                    <Button
                                        key={ing.id}
                                        className={`rounded-2xl border border-[#C8E8FF] transition-all ${
                                            isSelected
                                                ? "bg-[#185FA5] text-white hover:bg-[#144c84]"
                                                : "bg-[#EBF5FF] text-blue-600 hover:bg-blue-800 hover:text-white"
                                        }`}
                                        onClick={() => handleAddExtraIngredient(ing)}
                                    >
                                        {ing.name} 
                                        <div className="text-xs font-semibold flex items-center gap-2">
                                            <span className="inline-block w-2 text-center">
                                                {isSelected ? <Check /> : "+"}
                                            </span>
                                            € {ing.price.toFixed(2)}
                                        </div>
                                    </Button>
                                );
                            })}
                        </div>
                    </section>
                )}
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
                        <h1 className="font-bold text-[#185FA5] text-4xl tabular-nums">€ {(price * quantity).toFixed(2)}</h1>
                        </div>
                        </div>
                </div>
                {/* Bottone Aggiungi al carrello */}
                    <Button
                        onClick={handleAddToCart}
                        className="flex-1 h-18 min-h-18 rounded-2xl bg-[#185FA5] text-xl font-black text-white shadow-lg transition-all active:scale-[0.98] hover:bg-[#144c84] w-full"
                        disabled={quantity <= 0}
                    >
                        Aggiungi al carrello 
                    </Button>
            </div>
        </div>
        </div>
    );
}