'use server';

import { z } from 'zod';
import postgres from 'postgres';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
 
const updateProductFormSchema = z.object({
    id: z.string(),
    description: z.string({
      invalid_type_error: 'Please write a description',
    }),
    sellerId: z.string(),
  });

const createReviewFormSchema = z.object({
    id: z.string(),
    content: z.string({
      invalid_type_error: 'Please write a content',
    }),
    rating:z.coerce
      .number()
      .min(1, { message: 'Rating must be at least 1.' })
      .max(5, { message: 'Rating cannot be more than 5.' }),
    sellerId: z.string(),
    productId: z.string()
  });

  export type State = {
    errors?: {
      description?: string[];
    };
    message?: string | null;
  };

  export type ReviewState = {
    errors?: {
      rating?: string[];
      content?: string[];
    };
    message?: string | null;
  };
 
const CreateReview = createReviewFormSchema.omit({ id: true});
const UpdateInvoice = updateProductFormSchema.omit({ id: true });
 
export async function createReview(prevState: ReviewState, formData: FormData) {
    const validatedFields = CreateReview.safeParse({
      productId: formData.get('productId'),
      sellerId: formData.get('sellerId'),
      rating: formData.get('rating'),
      content: formData.get('content')
    });

    if (!validatedFields.success) {
        return {
          errors: validatedFields.error.flatten().fieldErrors,
          message: 'Missing Fields. Failed to Create Review.',
        };
      }

    const { productId, sellerId, rating, content } = validatedFields.data;
   
    try {
      await sql`
        INSERT INTO reviews (productId, sellerId, rating, content)
        VALUES (${productId}, ${sellerId}, ${rating}, ${content})
      `;
    } catch (error) {
        return {
            message: 'Database Error: Failed to Create Review.',
          };
    }
   
    revalidatePath(`/dashboard/sellers/${sellerId}`);
    redirect(`/dashboard/sellers/${sellerId}`);
  }

  export async function updateProduct(
    id: string,
    prevState: State,
    formData: FormData,
  ) {
    const validatedFields = UpdateInvoice.safeParse({
      description: formData.get('description'),
      sellerId: formData.get('sellerId')
    });
   
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Update Product.',
      };
    }
   
    const { description, sellerId } = validatedFields.data;   
    try {
      await sql`
        UPDATE products
        SET description = ${description}
        WHERE id = ${id}
      `;
    } catch (error) {
      return { message: 'Database Error: Failed to Update Product' };
    }
   
    revalidatePath(`/dashboard/sellers/${sellerId}/`);
    redirect(`/dashboard/sellers/${sellerId}/`);
  }

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
  ) {
    try {
      await signIn('credentials', formData);
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return 'Invalid credentials.';
          default:
            return 'Something went wrong.';
        }
      }
      throw error;
    }
  }