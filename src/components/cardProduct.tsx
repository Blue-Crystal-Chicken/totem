import { getImageUrl } from "@/constants/img";
import { Card } from "./ui/card";
import { getCategoryEmoji } from "@/constants/category";
import { useCart } from "./context/cart";
import { useState } from "react";

interface CardProductsProps {
    id: number;
    name: string;
    description?: string;
    price: number;
    imgPath?: string;
    category?: string;
    onClick?: () => void;
}

export default function CardProducts({ id, name, description, price, imgPath, category, onClick }: CardProductsProps) {
    const imageUrl = getImageUrl(imgPath);
    const { dispatch } = useCart();
    const state = useCart().state;

    const [quantity, setQuantity] = useState(state.items.find(i => i.id === `product-${id}`)?.quantity || 0);

    const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const productId = `product-${id}`;
    const newQuantity = quantity + 1;

    setQuantity(newQuantity);

    dispatch({
        type: "ADD_ITEM",
        payload: {
            id: productId,
            type: "PRODUCT",
            referenceId: id,
            name,
            price,
            quantity: newQuantity,
            imgPath: imgPath ?? null,
            category: category ?? "Prodotti",
        }
    });
};

    const handleUpdateQuantity = (productId: number | string, quantity: number,e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        const id = typeof productId === "number" ? `product-${productId}` : productId;
        setQuantity(quantity);
        dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
    };

    return (
        <Card
            onClick={onClick}
            className="cursor-pointer p-0 border border-slate-200 rounded-2xl hover:border-[#378ADD] transition-all duration-300 active:scale-[0.98] overflow-hidden flex flex-col hover:shadow-xl bg-white group"
            key={id}
        >
            {/* Immagine con Overlay leggero al passaggio del mouse */}
            <div className="w-full h-40 bg-slate-50 flex items-center justify-center overflow-hidden relative">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <span className="text-5xl transition-transform duration-300 group-hover:scale-110">
                        {getCategoryEmoji(category ?? "Prodotti")}
                    </span>
                )}
                {/* Badge opzionale per la categoria */}
                <div className="absolute top-2 left-2 bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded-full text-[10px] font-bold text-[#185FA5] uppercase tracking-wider">
                    {category}
                </div>
            </div>

            {/* Contenuto */}
            <div className="flex flex-col p-4">
                <h2 className="text-sm font-bold text-slate-800 leading-tight line-clamp-1 group-hover:text-[#378ADD] transition-colors">
                    {name}
                </h2>
                
                <p className="text-xs text-slate-500 line-clamp-2 mt-1 min-h-8">
                    {description}
                </p>

                <div className="flex items-center justify-between mt-3">
                    <p className="text-base font-black text-[#185FA5]">
                        € {price.toFixed(2)}
                    </p>
                        <div className="flex items-center bg-slate-100 rounded-full p-1 shadow-sm border border-slate-200">
    
                            <button
                                onClick={(e) => handleUpdateQuantity(id, quantity - 1, e)}
                                disabled={quantity === 0}
                                className="h-7 w-7 flex items-center justify-center rounded-full bg-white text-[#185FA5] font-bold text-lg hover:bg-[#185FA5] hover:text-white transition-all active:scale-90 shadow-sm"
                            >
                                −
                            </button>

                            <span className="min-w-8 text-center text-sm font-black text-slate-800">
                                {quantity}
                            </span>

                            <button
                                onClick={quantity == 0 ? handleAddToCart : (e) => handleUpdateQuantity(id, quantity + 1,e)}
                                className="h-7 w-7 flex items-center justify-center rounded-full bg-[#185FA5] text-white font-bold text-lg hover:brightness-110 transition-all active:scale-90 shadow-sm"
                            >
                                +
                            </button>

                        </div>
                        
                </div>
            </div>
        </Card>
    );
}