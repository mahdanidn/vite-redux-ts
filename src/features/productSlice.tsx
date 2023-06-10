import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  createEntityAdapter,
  EntityState,
} from "@reduxjs/toolkit"
import axios from "axios"
import { ProductSliceState, ProductState } from "../interfaces"

export const getProduts = createAsyncThunk("products/getProduct", async () => {
  const response = await axios.get("http://localhost:5000/products")
  return response.data
})

export const saveProduts = createAsyncThunk(
  "products/saveProduct",
  async ({ title, price }: { title: string; price: string }) => {
    const response = await axios.post("http://localhost:5000/products", {
      title,
      price,
    })
    return response.data
  },
)

const productEntity = createEntityAdapter({
  selectId: (product: ProductState) => product.id,
})

const initialState: EntityState<ProductState> = productEntity.getInitialState()

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProduts.fulfilled, (state, action) => {
      productEntity.setAll(state, action.payload)
    }),
      builder.addCase(saveProduts.fulfilled, (state, action) => {
        productEntity.addOne(state, action.payload)
      })
  },
})

export const productSelectors = productEntity.getSelectors(
  (state: { product: ProductSliceState }) => state.product,
)

export default productSlice.reducer
