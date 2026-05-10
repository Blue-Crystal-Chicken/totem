

interface CardCartProductProps {
    name: string;
    quantity: number;
    price: number;
    img?: string;
    onUpdateQuantity: (quantity: number) => void;
    onRemove: () => void;
}

export default function CardCartProduct({ name, quantity, price, img, onUpdateQuantity, onRemove }: CardCartProductProps) {
    return (
        <div className="bg-white border border-[#EBF5FF] rounded-2xl shadow-sm p-4 hover:shadow-md transition-all">
            <div className="flex gap-4">
                {/* Product Image */}
                <div className="w-24 h-24 bg-[#F8FAFC] rounded-xl overflow-hidden shrink-0 border border-[#EBF5FF]">
                    <img
                        src={img || ""}
                        alt={name}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Product Info */}
                <div className="flex flex-col flex-1 justify-between py-0.5">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-lg font-bold text-[#185FA5] leading-tight">{name}</h3>
                            <p className="text-[#378ADD] font-semibold mt-1">€ {price.toFixed(2)}</p>
                        </div>
                        <button
                            onClick={onRemove}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-red-50 text-red-400 hover:bg-red-100 hover:text-red-600 transition-colors active:scale-90"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center bg-[#F8FAFC] rounded-xl p-1 border border-[#EBF5FF]">
                            <button
                                disabled={quantity === 1}
                                onClick={() => onUpdateQuantity(quantity - 1)}
                                className="w-10 h-10 flex items-center justify-center rounded-lg bg-white text-[#185FA5] shadow-sm border border-[#EBF5FF] disabled:opacity-30 active:scale-90 transition-all font-bold text-xl"
                            >
                                −
                            </button>
                            <span className="w-10 text-center font-black text-[#185FA5] text-lg">
                                {quantity}
                            </span>
                            <button
                                onClick={() => onUpdateQuantity(quantity + 1)}
                                className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#378ADD] text-white shadow-sm active:scale-90 transition-all font-bold text-xl"
                            >
                                +
                            </button>
                        </div>
                        <div className="text-right">
                            <span className="text-xs font-bold text-[#185FA5] uppercase opacity-50 block leading-none mb-1">
                                Subtotale
                            </span>
                            <span className="text-xl font-black text-[#185FA5]">
                                € {(price * quantity).toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}