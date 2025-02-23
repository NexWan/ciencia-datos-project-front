import React from 'react'
import Card from '~/custom/Card'
import type { Product } from '~/utils/Product'

function ProductCard({product, onClose}: {product: Product, onClose: () => void}) {
  return (
    <Card className="w-64 h-64 gallery-card-bg" onClose={onClose}>
        <div className="flex flex-col items-center justify-center">
            <img src={product.image} alt={product.name} className="w-16 h-16 rounded-full" />
            <h2 className="text-lg text-white text-shadow font-semibold">{product.name}</h2>
            <p className="text-sm text-white">{product.description}</p>
            <p className="text-sm text-white font-semibold">{'$' + product.price}</p>
        </div>
    </Card>
  )
}

export default ProductCard