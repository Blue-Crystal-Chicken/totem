import { getImageUrl } from "@/constants/img";
import { Card } from "./ui/card";
import { getCategoryEmoji } from "@/constants/category";

interface CardProductsProps {
    id: number;
    name: string;
    description: string;
    price: number;
    imgPath?: string;
    category?: string;
    onClick?: () => void;
}

export default function CardProducts({ id, name, description, price, imgPath, category, onClick }: CardProductsProps) {
    const imageUrl = getImageUrl(imgPath);

    return (
        <Card
            onClick={onClick}
            className="cursor-pointer p-0 border-2 border-[#C8E8FF] rounded-2xl hover:border-[#378ADD] transition-all duration-200 active:scale-95 overflow-hidden flex flex-col hover:shadow-lg"
            key={id}
        >
            {/* Immagine o emoji fallback */}
            <div className="w-full h-32 bg-[#EBF5FF] flex items-center justify-center overflow-hidden">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <span className="text-5xl">
                        {getCategoryEmoji(category ?? "Prodotti")}
                    </span>
                )}
            </div>

            {/* Contenuto */}
            <div className="flex flex-col gap-1 p-3 flex-1">
                <h2 className="text-sm font-bold text-[#185FA5] leading-tight line-clamp-1">
                    {name}
                </h2>
                <p className="text-xs text-gray-400 line-clamp-2 flex-1">
                    {description}
                </p>
                <p className="text-sm font-bold text-[#185FA5] mt-1">
                    € {price.toFixed(2)}
                </p>
            </div>
        </Card>
    );
}