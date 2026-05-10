import Home from "./components/pages/home";
import ModeSelection from "./components/pages/modeSelection";
import { Route, Routes } from "react-router-dom";
import TableSelection from "./components/pages/table_selection";
import MainLayout from "./components/layout/MainLayout";
import Menu from "./components/pages/menu";
import { useEffect, useState } from "react";
import type { CategoryResponseWithTotalProducts } from "./types/category.types";
import Products from "./components/pages/products";
import Product from "./components/pages/product";
import Cart from "./components/pages/cart";
import Checkout from "./components/pages/checkout";
import OrderSuccess from "./components/pages/order-success";
import Error from "./components/pages/error";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function App() {

  const [category, setCategory] = useState<CategoryResponseWithTotalProducts[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);

  const MAX_ATTEMPTS = 3;

  useEffect(() => {
    const fetchCategories = async () => {
      while (attempts < MAX_ATTEMPTS) {
        try {
          const response = await fetch(`${API_BASE_URL}/api/categories/v1/categories/tot_product`);
          const data: CategoryResponseWithTotalProducts[] = await response.json();
          setCategory(data);
          setError(null);
          console.log("Fetched categories:", data);
          break;
        } catch (error) {
          console.error("Error fetching categories:", error);
          setError("Errore nel caricamento delle categorie. Riprovo...");
          setAttempts(prev => prev + 1);
        }
      }
    }
    if (attempts < MAX_ATTEMPTS) {
      fetchCategories();
    } else {
      setError("Errore nel caricamento delle categorie. Riprova più tardi.");
    }
  }, []);

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/mode-selection" element={<ModeSelection />} />
        <Route path="/table-selection" element={<TableSelection />} />
        <Route path="/menu" element={<Menu category={category} />} />
        <Route path="/menu/:id" element={<Products />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/error" element={<Error />} />
      </Route>
    </Routes>
  );
}

export default App;