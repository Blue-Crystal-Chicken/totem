import { ArrowLeft, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";


type NavbarProps ={
    title: string;
    subtitle?: string;
    back?: boolean;
    cart?: boolean;
    onBack?: () => void;
    onCart?: () => void;
    items?: number;
}

export default function Navbar({
    title,
    subtitle,
    back,
    cart,
    onBack,
    onCart,
    items
}: NavbarProps){
    return (
        <div>
            <div className="h-16 flex items-center justify-between px-6 bg-blue-800 text-white shadow-sm w-full">
                <div className="flex items-center gap-4">
                    {back && (
                        <Button onClick={onBack}>
                            <ArrowLeft />
                        </Button>
                    )}
                    <div>
                        <h1 className="text-2xl font-bold ">{title}</h1>
                        {subtitle && <p className="text-sm text-blue-200">{subtitle}</p>}
                    </div>
                </div>
                {cart && (
                    <Button onClick={onCart}>
                        <div className="flex items-center justify-center gap-2">
                        <ShoppingCart />
                        {items && items > 0 && (
                            <span className="ml-1 text-sm font-bold text-white">{items}</span>
                        )}
                    </div>
                    </Button>
                )}
            </div>
        </div>
    )
}