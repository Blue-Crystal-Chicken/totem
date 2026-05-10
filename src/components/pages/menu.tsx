import type { CategoryResponseWithTotalProducts } from "@/types/category.types";
import { useCart } from "../context/cart";
import Navbar from "../nav";
import MyCard from "../card";
import { useNavigate } from "react-router-dom";
import { getCategoryEmoji } from "@/constants/category";



export default function Menu({ category }: { category: CategoryResponseWithTotalProducts[] }) {
    const { state } = useCart();
    const navigate = useNavigate();

    return (
        <div className="flex flex-col h-full">
            <Navbar
                title="Blue Crystal"
                subtitle={`Chicken -${state.table ? ` Tavolo ${state.table}` : 'Takeaway'}`}
                cart={true}
                onCart={() => navigate("/cart")}
                items={state.items.reduce((total, item) => total + item.quantity, 0)}
            />
            <div className="flex flex-col flex-1 mx-16 my-4 gap-3 min-h-0">
                <div className="flex-1 overflow-y-auto min-h-0 no-scrollbar">
                <h1 className="text-xl font-bold">Categorie</h1>
                    <div className="grid grid-cols-3 gap-4 mt-2">
                        {category.map((cat) => (
                            <MyCard
                                key={cat.category.id}
                                title={cat.category.name}
                                icon={getCategoryEmoji(cat.category.name)}
                                
                                description={`${cat.count} Prodott${cat.count != 1 ? 'i' : 'o'}`}
                                bg="#EBF5FF"
                                onClick={() => navigate(`/menu/${cat.category.id}`)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}