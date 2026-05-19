import { useEffect, useState } from "react";
import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";
import type { MenuResponse } from "@/types/menu.types";
import { Spinner } from "../ui/spinner";
import Navbar from "../nav";
import CardProducts from "../cardProduct";



const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Menus() {
    const { state } = useCart();
    const navigate = useNavigate();

    const [menus, setMenus] = useState<MenuResponse[]>([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchMenus = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${API_BASE_URL}/api/menus`);
                const data: MenuResponse[] = await response.json();
                setMenus(data);
                console.log("Fetched menus:", data);
            } catch (error) {
                console.error("Error fetching menus:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMenus();
    }, []);

    function handleClickMenu(id: number){
        navigate(`/menu/${id}`);
    }

    function handleClickCart(){
        navigate("/cart");
    }

    function handleBack(){
        navigate("/home");
    }

    return (

        <>
        {loading ? (
            <div className="flex items-center justify-center h-full">
                <Spinner className="size-8" />
            </div>
        ) : (
            <div className="flex flex-col h-full">
                            <Navbar
                                title={"Offerte"}
                                back={true}
                                subtitle={`Chicken -${state.table ? ` Tavolo ${state.table}` : 'Takeaway'}`}
                                onBack={handleBack}
                                cart={true}
                                onCart={handleClickCart}
                                items={state.items.reduce((total, item) => total + item.quantity, 0)}
                            />
            
                            <div className="flex flex-col flex-1 mx-16 my-4 gap-3 min-h-0">
                                <div className="flex-1 overflow-y-auto min-h-0 no-scrollbar">
                                    {menus.length > 0 ? (
                                        <div className="grid grid-cols-1 gap-6 mt-2">
                                            {menus.map((prod) => (
                                                <CardProducts
                                                    key={prod.id}
                                                    id={prod.id}
                                                    imgPath={prod.imgPath? prod.imgPath : undefined}
                                                    name={prod.name}
                                                    description={prod.description}
                                                    price={prod.price}
                                                    onClick={() => handleClickMenu(prod.id)}
                                                />
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-gray-500">Nessun prodotto disponibile.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                }
        </>

    )
    


}