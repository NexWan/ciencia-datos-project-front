import React, { useState } from 'react'
import Card from '~/custom/Card'
import type { Product } from '~/utils/Product'
import { FaPencil } from "react-icons/fa6";
import { updateProduct } from '~/utils/fetchDB';

function ProductCard({product, onClose}: {product: Product, onClose: () => void}) {
  const [isEditing, setIsEditing] = useState(false)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const updatedProduct = {
      id: product.id,
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      price: Number(formData.get('price')),
      image: product.image,
      tags: [formData.get('tag') as string]
    }
    console.log(await updateProduct(updatedProduct));
    setIsEditing(false)
    
  }
  return (
    <Card className="w-64 h-max gallery-card-bg" onClose={onClose}>
        <div className="flex flex-col items-center justify-center">
          <img src={product.image} alt={product.name} className="w-16 h-16 rounded-full" />
          {!isEditing && (
            <>
              <h2 className="text-xl text-white text-shadow font-semibold">{product.name}</h2>
              <p className="text-sm text-white">{product.description}</p>
              <p className="text-sm text-white font-semibold">{'$' + product.price}</p>
              <p className='text-sm text-white bg-inputs rounded-full px-2 py-1 font-semibold'>{product.tags[0]}</p>
            </>
          )}
            <button onClick={() => setIsEditing(!isEditing)} className="text-white bg-inputs hover:bg-blue-700 p-2 rounded-full">
                <FaPencil />
            </button>
            {isEditing && (
                <form className="flex flex-col items-center justify-center" onSubmit={handleSubmit}>
                    <span className="text-white text-xl">Name</span>
                    <input
                        name="name"
                        type="text"
                        defaultValue={product.name}
                        className="border-2 bg-white border-black rounded-md p-2 w-full text-black"
                      />
                      <span className="text-white text-xl">Description</span>
                      <input
                        name="description"
                        type="text"
                        defaultValue={product.description}
                        className="border-2 bg-white border-black rounded-md p-2 w-full text-black"
                      />
                      <span className="text-white text-xl">Price</span>
                      <input
                        name="price"
                        type="number"
                        defaultValue={product.price}
                        className="border-2 border-black bg-white rounded-md p-2 w-full text-black"
                      />
                      <span className="text-white text-xl">Tag</span>
                      <select name="tag" className="border-2 bg-white border-black rounded-md p-2 w-full text-black">
                        <option value="1">Cars</option>
                        <option value="0">Toys</option>
                        <option value="3">GPU</option>
                        <option value="2">CPU</option>
                        <option value="6">Phones</option>
                      </select>
                      <button
                        type="submit"
                        className="bg-inputs text-white p-2 rounded-md mt-5"
                      >
                        Save
                      </button>
              </form>
              )}
        </div>
    </Card>
  )
}

export default ProductCard