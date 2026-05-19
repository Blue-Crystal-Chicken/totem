import { useCart } from "../context/cart";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { MenuResponse } from "@/types/menu.types";
import Navbar from "../nav";
import { Spinner } from "../ui/spinner";
import CardMenuDetails from "../cardMenuDetails";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export default function MenuDetails() {

    const id = useParams();
    const menuId = id.id || "";

    const { state } = useCart();
    const navigate = useNavigate();

    const [menu, setMenu] = useState<MenuResponse>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
            const fetchMenu = async () => {
                    setLoading(true);
                    try {
                        const response = await fetch(`${API_BASE_URL}/api/menus/${menuId}`);
                        const data = await response.json();
                        setMenu(data);
                        console.log("Menu: ", data);
                    } catch (error) {
                        console.error("Error fetching menu:", error);
                    } finally {
                        setLoading(false);
                    }
            }
            fetchMenu();
        }, [menuId]);


    return (
        <div className="h-full flex flex-col">
            {loading ? (
                <div className="flex items-center justify-center flex-1">
                    <Spinner className="size-8" />
                </div>
            ) : (
                <>
                    <Navbar
                        title="Blue Crystal"
                        subtitle={`Chicken -${state.table ? ` Tavolo ${state.table}` : 'Takeaway'}`}
                        back={true}
                        onBack={() => navigate("/home")}
                        cart={true}
                        onCart={() => navigate("/cart")}
                        items={state.items.reduce((total, item) => total + item.quantity, 0)}
                    />
                    <div className="flex-1 min-h-0">
                        {menu ? (
                            <CardMenuDetails menu={menu} />
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-500">
                                <p>Menu not found.</p>
                            </div>
                        )}
                    </div>
                </>
            )
            }
        </div>
            
        )
}