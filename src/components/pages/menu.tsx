import type { CategoryResponseWithTotalProducts } from "@/types/category.types";
import { useCart } from "../context/cart";
import Navbar from "../nav";
import MyCard from "../card";
import { useNavigate } from "react-router-dom";
import { getCategoryEmoji } from "@/constants/category";
import type { OfferResponse } from "@/types/offer.types";
import { getImageUrl } from "@/constants/img";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import type { MenuResponse } from "@/types/menu.types";


interface MenuProps {
    category: CategoryResponseWithTotalProducts[];
    offers: OfferResponse[];
    menus: MenuResponse[];
}



export default function Menu({ category, offers, menus }: MenuProps) {
    const { state } = useCart();
    const navigate = useNavigate();


    function handleClickOffer(id?: number){
        if(id){
            navigate(`/offer/${id}`);
            return; 
        }
        navigate(`/offer`);
    }

    function handleClickMenu(id?: number){
        if(id){
            navigate(`/menu/${id}`);
            return; 
        }
        navigate(`/menu`);
    }

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
                <div>
                <div className="flex  justify-between items-center ">
                <h1 className="text-xl font-bold">Offerte</h1>
                <Button className="gost" onClick={() => handleClickOffer()}>
                    See all <ArrowRight/>
                </Button>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-2">
                        {offers.map((offer) => (
                            <MyCard
                                key={offer.id}
                                title={offer.name}
                                description={offer.description}
                                image={getImageUrl(offer.imgPath)}
                                bg="#FFD700"
                                onClick={() => handleClickOffer(offer.id)}
                            />
                        ))}
                    </div>
                </div>
                <div>
                <div className="flex  justify-between items-center ">
                <h1 className="text-xl font-bold">Menu</h1>
                <Button className="gost" onClick={() => handleClickMenu()}>
                    See all <ArrowRight/>
                </Button>
                </div>
                <div className="grid grid-cols-3 gap-4 m-2">
                        {menus.map((menu) => (
                            <MyCard
                                key={menu.id}
                                title={menu.name}
                                description={menu.description}
                                image={getImageUrl(menu.imgPath)}
                                bg="#EEF4FF"
                                onClick={() => handleClickMenu(menu.id)}
                            />
                        ))}
                    </div>
                </div>
                <div>
                <h1 className="text-xl font-bold">Categorie</h1>
                    <div className="grid grid-cols-3 gap-4 m-2">
                        {category.map((cat) => (
                            <MyCard
                                key={cat.category.id}
                                title={cat.category.name}
                                icon={getCategoryEmoji(cat.category.name)}
                                description={`${cat.count} Prodott${cat.count != 1 ? 'i' : 'o'}`}
                                bgIcon="#EBF5FF"
                                onClick={() => navigate(`/category/${cat.category.id}`)}
                            />
                        ))}
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}