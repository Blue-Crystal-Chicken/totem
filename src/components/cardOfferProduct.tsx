import { getCategoryEmoji } from "@/constants/category";

interface CardOfferProductProps {
    name: string;
    price: number;
    quantity: number;
    imgPath?: string;
}


export default function CardOfferProduct({ name, price, quantity, imgPath }: CardOfferProductProps) {

   return (
    <div className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-2xl hover:border-blue-200 hover:shadow-md transition-all duration-200 w-full max-w-full min-h-[72px]">
        
        {/* Quantity */}
        <div className="w-12 text-center flex-shrink-0">
            <span className="text-xl font-semibold text-blue-600">
                {quantity}x
            </span>
        </div>

        {/* Immagine quadrata piccola */}
        <div className="w-14 h-14 flex-shrink-0 rounded-xl overflow-hidden border border-blue-100 bg-blue-50">
            
            {imgPath ? (
                <img 
                    src={imgPath} 
                    alt={name} 
                    className="w-full h-full object-cover"
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center text-3xl bg-gradient-to-br from-blue-100 to-cyan-100">
                    {getCategoryEmoji("Prodotti")}
                </div>
            )}
        </div>

        {/* Nome prodotto - centro */}
        <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate text-[17px]">
                {name}
            </h3>
        </div>

        {/* Prezzo - destra */}
        <div className="flex-shrink-0 text-right">
            <span className="text-xl font-bold text-blue-700">
                {price * quantity}€
            </span>
        </div>
    </div>
);
}