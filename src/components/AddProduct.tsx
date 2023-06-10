import { ChangeEvent, FormEvent, useState } from "react"
import { useDispatch } from "react-redux"
import { saveProduts } from "../features/productSlice"
import { AppDispatch } from "../app/store"

const AddProduct = () => {
  const [title, setTitle] = useState<string>("")
  const [price, setPrice] = useState<string>("")
  const dispatch: AppDispatch = useDispatch()

  const createProduct = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    dispatch(saveProduts({ title, price }))
  }

  return (
    <div>
      <form onSubmit={createProduct} className="box mt-5">
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
          <button className="button is-success">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default AddProduct
