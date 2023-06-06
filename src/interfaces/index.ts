import { EntityState } from "@reduxjs/toolkit"

export interface ProductState {
  id: number
  title: string
  price: number
}

export interface ProductSliceState extends EntityState<ProductState> {
  loading: boolean
  error: string | null
}
