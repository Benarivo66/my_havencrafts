import postgres from 'postgres';
import {
    SellerField,
    ProductField
} from './definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchSellers() {
  try {
    const sellers = await sql<SellerField[]>`
      SELECT
        id,
        name,
        email,
        bio,
        phone,
        profileImage
      FROM users
      WHERE isSeller = true
      ORDER BY name ASC
    `;

    return sellers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all sellers.');
  }
}
export async function fetchProducts() {
  try {
    const products = await sql<ProductField[]>`
      SELECT
        id,
        name,
        description,
        price,
        sellerId,
      FROM products
      ORDER BY name ASC
    `;

    return products;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all products.');
  }
}
