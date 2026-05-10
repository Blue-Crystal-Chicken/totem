import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

interface CardProps {
    title: string;
    description?: string;
    price?: number;
    image?: string;
    icon?: string;
    count?: number;
    bg?: string;
    onClick?: () => void;
}

export default function MyCard({
    title,
    description,
    price,
    image,
    icon,
    count,
    bg,
    onClick
}: CardProps) {
    return (
        <Card
            onClick={onClick}
            className="group cursor-pointer w-full max-w-[180px] aspect-square rounded-3xl border-2 border-[#C8E8FF] 
                       hover:border-[#378ADD] hover:shadow-xl hover:-translate-y-1 
                       transition-all duration-300 active:scale-[0.97] 
                       flex flex-col items-center p-5 gap-4 bg-white overflow-hidden"
        >
            {/* Icona */}
            {icon && (
                <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl shadow-sm flex-shrink-0"
                    style={{ background: bg ?? "#EBF5FF" }}
                >
                    {icon}
                </div>
            )}

            {/* Immagine Prodotto */}
            {image && !icon && (
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden flex-shrink-0">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
            )}

            {/* Testo - FORZATO AL CENTRO */}
            <CardHeader className="p-0 w-full text-center flex-1 flex flex-col justify-center items-center">
                <CardTitle className="text-sm font-semibold text-[#185FA5] leading-tight w-full text-center">
                    {title}
                </CardTitle>
                
                {description && (
                    <p className="text-xs text-gray-500 mt-1.5 line-clamp-2 w-full text-center">
                        {description}
                    </p>
                )}
            </CardHeader>

            {/* Prezzo e Count */}
            <div className="w-full flex flex-col items-center gap-1 mt-auto">
                {count !== undefined && (
                    <p className="text-xs font-medium text-[#378ADD]">
                        {count} prodotti
                    </p>
                )}

                {price !== undefined && (
                    <p className="text-lg font-bold text-[#185FA5]">
                        €{price.toFixed(2)}
                    </p>
                )}
            </div>
        </Card>
    );
}