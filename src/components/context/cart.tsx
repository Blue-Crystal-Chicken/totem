// context/CartContext.tsx
import { createContext, useContext, useReducer } from "react";
import type { CartItemType } from "@/types/cart.types";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface CartItem {
    id: string; // `product-{id}` | `offer-{id}` | `menu-{id}`
    type: CartItemType;
    referenceId: number;
    name: string;
    price: number;
    quantity: number;
    imgPath: string | null;
    category?: string;
}

export interface CartState {
    items: CartItem[];
    table?: number;
    total?: number;
    serviceType?: "dine-in" | "takeaway";
    paymentType?: "cash" | "card";
}

type CartAction =
    | { type: "ADD_ITEM"; payload: CartItem }
    | { type: "REMOVE_ITEM"; payload: { id: string } }
    | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
    | { type: "SET_TABLE"; payload: number }
    | { type: "SET_MODE"; payload: "dine-in" | "takeaway" }
    | { type: "SET_PAYMENT"; payload: "cash" | "card" }
    | { type: "CLEAR_CART" }
    | { type: "SET_TOTAL"; payload: { total: number } };

interface CartContextType {
    state: CartState;
    dispatch: React.Dispatch<CartAction>;
    totalItems: number;
    totalPrice: number;
}

// ─── Reducer ─────────────────────────────────────────────────────────────────

const initialState: CartState = { items: [] };

function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case "ADD_ITEM": {
            const existing = state.items.find(i => i.id === action.payload.id);
            if (existing) {
                return {
                    ...state,
                    items: state.items.map(i =>
                        i.id === action.payload.id
                            ? { ...i, quantity: i.quantity + action.payload.quantity }
                            : i
                    ),
                };
            }
            return { ...state, items: [...state.items, action.payload] };
        }

        case "REMOVE_ITEM":
            return {
                ...state,
                items: state.items.filter(i => i.id !== action.payload.id),
            };

        case "UPDATE_QUANTITY":
            return {
                ...state,
                items: state.items
                    .map(i =>
                        i.id === action.payload.id
                            ? { ...i, quantity: action.payload.quantity }
                            : i
                    )
                    .filter(i => i.quantity > 0),
            };

        case "SET_TABLE":
            return { ...state, table: action.payload, serviceType: "dine-in" };

        case "SET_MODE":
            return { ...state, serviceType: action.payload };

        case "SET_PAYMENT":
            return { ...state, paymentType: action.payload };

        case "CLEAR_CART":
            return initialState;

        case "SET_TOTAL":
            return { ...state, total: action.payload.total };

        default:
            return state;
    }
}

// ─── Context ─────────────────────────────────────────────────────────────────

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
    const totalPrice = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    return (
        <CartContext.Provider value={{ state, dispatch, totalItems, totalPrice }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = (): CartContextType => {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart deve essere usato dentro CartProvider");
    return ctx;
};