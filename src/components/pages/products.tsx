import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/cart";
import { useState, useEffect } from "react";
import Navbar from "../nav";
import type { ProductResponse } from "@/types/product.types";
import { getCategoryEmoji } from "@/constants/category";
import { Spinner } from "@/components/ui/spinner"
import CardProducts from "../cardProduct";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Products() {

    const { state } = useCart();
    const navigate = useNavigate();
    const [products, setProducts] = useState<ProductResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [attempts, setAttempts] = useState(0);

    const MAX_ATTEMPTS = 3;

    const { id } = useParams();
    const category_id = id ? parseInt(id) : null;

    useEffect(() => {
        const fetchProducts = async () => {
            while (attempts < MAX_ATTEMPTS) {
            setLoading(true);
            try {
                const response = await fetch(`${API_BASE_URL}/api/products/v1/category/id/${category_id}`);
                const data = await response.json();
                setProducts(data);
                setError(null);
                console.log("Fetched products:", data);
                break; // Exit loop on success
            } catch (error) {
                console.error("Error fetching products:", error);
                setError("Errore nel caricamento dei prodotti. Riprovo...");
                setAttempts(prev => prev + 1);
            } finally {
                setLoading(false);
            }
        }
    };
        if(attempts < MAX_ATTEMPTS) {
            fetchProducts();
        } else {
            setError("Errore nel caricamento dei prodotti. Riprova più tardi.");
            navigate(`/error?message=${error}`);
        }
    }, [category_id]);

    function handleBack() {
        navigate('/menu');
    }

    function handleProductClick(productId: number) {
        navigate(`/product/${productId}`);
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
                    title={`${getCategoryEmoji(products.length > 0 ? products[0].category.name : 'Prodotti')} ${products.length > 0 ? products[0].category.name : 'Prodotti'}`}
                    back={true}
                    subtitle={`Chicken -${state.table ? ` Tavolo ${state.table}` : 'Takeaway'}`}
                    onBack={handleBack}
                    cart={true}
                    onCart={() => navigate("/cart")}
                    items={state.items.reduce((total, item) => total + item.quantity, 0)}
                />

                <div className="flex flex-col flex-1 mx-16 my-4 gap-3 min-h-0">
                    <div className="flex-1 overflow-y-auto min-h-0 no-scrollbar">
                        {products.length > 0 ? (
                            <div className="grid grid-cols-2 gap-6 mt-2">
                                {products.map((prod) => (
                                    <CardProducts
                                        key={prod.id}
                                        id={prod.id}
                                        imgPath={prod.imgPath? prod.imgPath : undefined}
                                        category={prod.category.name}
                                        name={prod.name}
                                        description={prod.description}
                                        price={prod.price}
                                        onClick={() => handleProductClick(prod.id)}
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
    );
}