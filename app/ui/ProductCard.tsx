'use client';

import { useActionState } from 'react';
import { updateProduct, State} from '@/app/lib/actions';
import { useState } from 'react';
import { ProductField } from '@/app/lib/definitions';
import Link from 'next/link';

export default function ProductCard({ product, sellerId, rating }: { product: ProductField, sellerId: string, rating: number }) {
  const [isEditing, setIsEditing] = useState(false);
  const initialState: State = { message: null, errors: {} };
  const updateAction = updateProduct.bind(null, product.id);
  const [state, formAction] = useActionState(updateAction, initialState);

  return (
    <div className="bg-tertiary2 shadow rounded-lg p-4">
      <img
        src={`/products/${product.name.split(" ").slice(-1)[0].toLowerCase()}.webp`}
        alt={product.name}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h4 className="text-lg font-semibold">{product.name}</h4>
      <p className="mt-2 font-medium text-primary">
  ⭐ Rating: {rating}
</p>

      <Link className="mt-4 mb-4 inline-block bg-secondary text-white px-4 py-2 rounded hover:bg-tertiary" href={`/dashboard/reviews/${product.id}`}>Review product</Link>

      {isEditing ? (
        <form action={formAction} className="space-y-2">
             <input type="hidden" id="sellerId" name="sellerId" value={sellerId}></input>
          <textarea
            name="description"
            defaultValue={product.description}
            className="w-full p-2 border rounded"
          />
          {state?.errors?.description && (
            <p className="text-red-500 text-sm">{state.errors.description}</p>
          )}
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-secondary text-white px-4 py-1 rounded"
            >
              Save
            </button>
            <button
              type="button"
              className="text-sm text-gray-500"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <p className="text-sm text-gray-600">{product.description}</p>
          <button
            onClick={() => setIsEditing(true)}
            className="mt-2 text-sm text-secondary underline"
          >
            Edit Description
          </button>
        </>
      )}
    </div>
  );
}
