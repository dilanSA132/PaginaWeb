import create from 'zustand';

interface CartItem {
  id: number;
  name: string;
  salePrice: number;
  image: string;
  quantity: number; 
}

interface CartState {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  calculateTotal: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: [],

  addToCart: (item) => set((state) => {
    const existingItem = state.cart.find((i) => i.id === item.id);
    if (existingItem) {
      // Si el producto ya está en el carrito, actualiza la cantidad
      return {
        cart: state.cart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        ),
      };
    }
    // Si el producto no está en el carrito, agrégalo
    return { cart: [...state.cart, item] };
  }),

  removeFromCart: (id) => set((state) => ({
    cart: state.cart.filter((item) => item.id !== id),
  })),

  updateQuantity: (id, quantity) => set((state) => ({
    cart: state.cart.map((item) =>
      item.id === id ? { ...item, quantity } : item
    ),
  })),

  calculateTotal: () => {
    const state = get();
    return state.cart.reduce((total, item) => total + (item.salePrice * item.quantity), 0);
  },
}));
