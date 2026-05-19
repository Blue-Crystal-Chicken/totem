import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/cart";
import { useEffect, useState } from "react";
import type { OfferResponse } from "@/types/offer.types";
import { Spinner } from "../ui/spinner";
import Navbar from "../nav";
import CardOfferDetails from "../cardOfferDetails";



const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Offer(){
    const id = useParams();
    const offerId = id.id || "";

    const { state } = useCart();
    const navigate = useNavigate();

    const [offer, setOffer] = useState<OfferResponse>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
            const fetchOffer = async () => {
                    setLoading(true);
                    try {
                        const response = await fetch(`${API_BASE_URL}/api/offers/${offerId}`);
                        const data = await response.json();
                        setOffer(data);
                        console.log("Offer: ", data);
                    } catch (error) {
                        console.error("Error fetching offer:", error);
                    } finally {
                        setLoading(false);
                    }
            }
            fetchOffer();
        }, [offerId]);



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
                        {offer ? (
                            <CardOfferDetails offer={offer} />
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-500">
                                <p>Offer not found.</p>
                            </div>
                        )}
                    </div>
                </>
            )
            }
        </div>
    );

}