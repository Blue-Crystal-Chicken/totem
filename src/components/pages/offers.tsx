import type { OfferResponse } from "@/types/offer.types";
import { useEffect, useState } from "react";
import CardProducts from "../cardProduct";
import Navbar from "../nav";
import products from "./products";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import { Spinner } from "../ui/spinner";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Offers(){

    const [offers,setOffers] = useState<OfferResponse[]>([]);
    const [loading, setLoading] = useState(true);

    const { state } = useCart();
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchOffer = async () =>{
            setLoading(true);
            try{
                const response = await fetch(`${API_BASE_URL}/api/offers`);
                const data: OfferResponse[] = await response.json();
                setOffers(data);
                console.log("Fetched offers:", data);
            }catch(error){
                console.error("Error fetching offers:", error);
            }finally{
                setLoading(false);
            }
        };
        fetchOffer();
    },[])

    function handleBack() {
        navigate('/home');
    }

    function handleOfferClick(offerId: number) {
        navigate(`/offer/${offerId}`);
    }


    return(
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
                                onCart={() => navigate("/cart")}
                                items={state.items.reduce((total, item) => total + item.quantity, 0)}
                            />
            
                            <div className="flex flex-col flex-1 mx-16 my-4 gap-3 min-h-0">
                                <div className="flex-1 overflow-y-auto min-h-0 no-scrollbar">
                                    {offers.length > 0 ? (
                                        <div className="grid grid-cols-1 gap-6 mt-2">
                                            {offers.map((prod) => (
                                                <CardProducts
                                                    key={prod.id}
                                                    id={prod.id}
                                                    imgPath={prod.imgPath? prod.imgPath : undefined}
                                                    name={prod.name}
                                                    description={prod.description}
                                                    price={prod.price}
                                                    onClick={() => handleOfferClick(prod.id)}
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