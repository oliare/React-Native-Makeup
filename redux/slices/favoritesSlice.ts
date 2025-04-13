import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoritesState {
  items: Product[];
}

const initialState: FavoritesState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites(state, action: PayloadAction<Product>) {
      const exists = state.items.find(p => p.id == action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeFromFavorites(state, action: PayloadAction<number>) {
      state.items = state.items.filter(p => p.id != action.payload);
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
