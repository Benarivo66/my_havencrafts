'use client';

import { useState } from 'react';
import { useActionState } from 'react';
import { createReview, ReviewState } from '@/app/lib/actions';
import { Button } from '@/app/ui/button';

export default function ReviewForm({
  sellerId,
  productId,
}: {
  sellerId: string | undefined;
  productId: string;
}) {
  const initialState: ReviewState = { message: null, errors: {} };

  const [state, formAction] = useActionState(createReview, initialState);
  const [rating, setRating] = useState<number>(5);


  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="sellerId" value={sellerId} />
      <input type="hidden" name="productId" value={productId} />

      <div>
        <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
          Rating (1–5)
        </label>
        <input
          id="rating"
          name="rating"
          type="number"
          min={1}
          max={5}
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {state.errors?.rating && (
          <p className="mt-1 text-sm text-red-500">{state.errors.rating.join(', ')}</p>
        )}
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          Your Review
        </label>
        <textarea
          id="content"
          name="content"
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {state.errors?.content && (
          <p className="mt-1 text-sm text-red-500">{state.errors.content.join(', ')}</p>
        )}
      </div>

      <div>
        <Button type="submit">Submit Review</Button>
      </div>

      {state.message && (
        <p className="text-sm text-green-600">{state.message}</p>
      )}
    </form>
  );
}
