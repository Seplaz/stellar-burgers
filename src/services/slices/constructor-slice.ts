import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient, TOrder, TIngredient } from '@utils-types';

type TConstructorState = {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
  orderError: string | null;
};

const initialState: TConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null,
  orderError: null
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload;
        } else {
          state.constructorItems.ingredients.push(action.payload);
        }
      },
      prepare: (item: TIngredient) => {
        const id = nanoid();
        return { payload: { ...item, id } };
      }
    },
    moveIngredient: {
      reducer: (state, action: PayloadAction<{ from: number; to: number }>) => {
        const { from, to } = action.payload;
        const ingredients = state.constructorItems.ingredients;
        if (
          from >= 0 &&
          from < ingredients.length &&
          to >= 0 &&
          to < ingredients.length &&
          from !== to
        ) {
          const [movedItem] = ingredients.splice(from, 1);
          ingredients.splice(to, 0, movedItem);
        }
      },
      prepare: (from: number, to: number) => ({
        payload: { from, to }
      })
    },
    removeIngredient(state, action: PayloadAction<string>) {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (item) => item.id !== action.payload
        );
    },
    clearConstructor(state) {
      state.constructorItems.bun = null;
      state.constructorItems.ingredients = [];
    },
    setOrderModalData(state, action: PayloadAction<TOrder | null>) {
      state.orderModalData = action.payload;
    },
    setOrderRequest(state, action: PayloadAction<boolean>) {
      state.orderRequest = action.payload;
    },
    setOrderError(state, action: PayloadAction<string | null>) {
      state.orderError = action.payload;
    }
  }
});

export const {
  addIngredient,
  moveIngredient,
  removeIngredient,
  clearConstructor,
  setOrderModalData,
  setOrderRequest,
  setOrderError
} = constructorSlice.actions;

export default constructorSlice.reducer;
