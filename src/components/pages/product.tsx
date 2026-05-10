import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/cart";
import { useEffect, useState } from "react";
import type { ProductResponse } from "@/types/product.types";
import { Spinner } from "../ui/spinner";
import ProductDetails from "../cardProductDetails";
import Navbar from "../nav";



const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Product() {

    const id = useParams();
    const productId = id.id || "";
    const { state } = useCart();
    const navigate = useNavigate();

    const [product, setProduct] = useState<ProductResponse>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
                setLoading(true);
                try {
                    const response = await fetch(`${API_BASE_URL}/api/products/v1/products/${productId}`);
                    const data = await response.json();
                    setProduct(data);
                } catch (error) {
                    console.error("Error fetching product:", error);
                } finally {
                    setLoading(false);
                }
        }
        fetchProduct();
    }, [productId]);


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
                        onBack={() => navigate(`/menu/` + (product ? product.category?.id : ""))}
                        cart={true}
                        onCart={() => navigate("/cart")}
                        items={state.items.reduce((total, item) => total + item.quantity, 0)}
                    />
                    <div className="flex-1 min-h-0">
                        {product ? (
                            <ProductDetails product={product} />
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-500">
                                <p>Product not found.</p>
                            </div>
                        )}
                    </div>
                </>
            )
            }
        </div>
    );
}