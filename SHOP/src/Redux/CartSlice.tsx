import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
    incInCart: (state, action: PayloadAction<number>) => {
      // const existingItem = state.items.find(item => item.id === action.payload);
      // if (existingItem) {
      //   existingItem.quantity += 1;
      // }
      // state.items = state.items.filter(item => item.id !== action.payload || existingItem);
    }
  },
});

export const { addToCart, removeFromCart, clearCart, incInCart } = cartSlice.actions;
export default cartSlice.reducer;

