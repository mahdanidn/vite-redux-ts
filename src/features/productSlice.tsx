import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  createEntityAdapter,
  EntityState,
} from "@reduxjs/toolkit"
import axios from "axios"
import { ProductSliceState, ProductState } from "../interfaces"

type ProductType = {
  id: string | undefined
  title: string
  price: string
}

export const getProducts = createAsyncThunk("products/getProduct", async () => {
  const response = await axios.get("http://localhost:5000/products")
  return response.data
})

export const saveProduct = createAsyncThunk(
  "products/saveProduct",
  async ({ title, price }: { title: string; price: string }) => {
    const response = await axios.post("http://localhost:5000/products", {
      title,
      price,
    })
    return response.data
  },
)
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, title, price }: ProductType) => {
    const response = await axios.patch(`http://localhost:5000/products/${id}`, {
      title,
      price,
    })
    return response.data
  },
)

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id: string) => {
    await axios.delete(`http://localhost:5000/products/${id}`)
    return id
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
    builder.addCase(getProducts.fulfilled, (state, action) => {
      productEntity.setAll(state, action.payload)
    }),
      builder.addCase(saveProduct.fulfilled, (state, action) => {
        productEntity.addOne(state, action.payload)
      })
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      productEntity.removeOne(state, action.payload)
    }),
      builder.addCase(updateProduct.fulfilled, (state, action) => {
        productEntity.updateOne(state, action.payload)
      })
  },
})

export const productSelectors = productEntity.getSelectors(
  (state: { product: ProductSliceState }) => state.product,
)

export default productSlice.reducer
