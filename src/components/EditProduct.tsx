import { ChangeEvent, FormEvent, useState } from "react"
import { useDispatch } from "react-redux"

const EditProduct = () => {
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState("")
  const dispatch = useDispatch()

  return (
    <div>
      <form className="box mt-5">
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
