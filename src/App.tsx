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
import type { OfferResponse } from "./types/offer.types";
import Offers from "./components/pages/offers";
import Offer from "./components/pages/offer";
import type { MenuResponse } from "./types/menu.types";
import Menus from "./components/pages/menus";
import MenuDetails from "./components/pages/menuDetails";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function App() {

  const [category, setCategory] = useState<CategoryResponseWithTotalProducts[]>([]);
  const [offers, setOffers] = useState<OfferResponse[]>([]);
  const [menus, setMenus] = useState<MenuResponse[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/api/categories/v1/categories/tot_product`);
          const data: CategoryResponseWithTotalProducts[] = await response.json();
          setCategory(data);
          console.log("Fetched categories:", data);
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
    }
    const fetchOffers = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/offers/v1/top?limit=3`);
        const data: OfferResponse[] = await response.json();
        setOffers(data);
        console.log("Fetched offers:", data);
      } catch (error) {
        console.error("Error fetching offers:", error);
      }
    }

    const fetchMenus = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/menus/v1/top?limit=3`);
        const data: MenuResponse[] = await response.json();
        setMenus(data);
        console.log("Fetched menus:", data);
      } catch (error) {
        console.error("Error fetching menus:", error);
      }
    };
    fetchCategories();
    fetchOffers();
    fetchMenus();
  }, []);

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/mode-selection" element={<ModeSelection />} />
        <Route path="/table-selection" element={<TableSelection />} />
        <Route path="/home" element={<Menu category={category} offers={offers} menus={menus} />} />
        <Route path="/category/:id" element={<Products />} />
        <Route path="/offer" element={<Offers />} />
        <Route path="/offer/:id" element={<Offer />} />
        <Route path="/menu" element={<Menus />} />
        <Route path="/menu/:id" element={<MenuDetails />} />
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