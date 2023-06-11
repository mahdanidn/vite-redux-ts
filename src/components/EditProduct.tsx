import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  getProducts,
  productSelectors,
  updateProduct,
} from "../features/productSlice"
import { useParams, useNavigate } from "react-router-dom"
import { AppDispatch } from "../app/store"
import { ProductSliceState } from "../interfaces"

const EditProduct = () => {
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState("")
  const dispatch: AppDispatch = useDispatch()

  type ProductParams = {
    id: string
  }
  const navigate = useNavigate()
  const { id } = useParams<ProductParams>()

  const product = useSelector((state: { product: ProductSliceState }) =>
    productSelectors.selectById(state, id ?? ""),
  )

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

  useEffect(() => {
    if (product) {
      setTitle(product.title)
      setPrice(product.price.toString())
    }
  }, [product])

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await dispatch(updateProduct({ id, title, price }))
    navigate("/")
  }

  return (
    <div>
      <form onSubmit={handleUpdate} className="box mt-5">
        <div className="field">
          <label className="label">Title</label>
          <div className="control">
            <input
              type="text"
              className="input"
              placeholder="Title"
              value={title}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Price</label>
          <div className="control">
            <input
              type="text"
              className="input"
              placeholder="price"
              value={price}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPrice(e.target.value)
              }
            />
          </div>
        </div>
        <div className="field">
          <button className="button is-success">Update</button>
        </div>
      </form>
    </div>
  )
}

export default EditProduct
