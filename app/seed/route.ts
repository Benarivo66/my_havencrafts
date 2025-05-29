import bcrypt from 'bcryptjs';
import postgres from 'postgres';
import { users, products, reviews } from '../lib/placeholder-data';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function seedUsers() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`DROP TABLE IF EXISTS users CASCADE;`;


  await sql`
    CREATE TABLE users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      is_seller BOOLEAN DEFAULT FALSE,
      bio TEXT,
      profile_image TEXT
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return sql`
        INSERT INTO users (id, name, email, password, is_seller, bio, profile_image)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword}, ${user.isSeller}, ${user.bio}, ${user.profileImage})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  return insertedUsers;
}

async function seedProducts() {
  await sql`
    CREATE TABLE IF NOT EXISTS products (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      price DECIMAL(10, 2) NOT NULL,
      image_url TEXT NOT NULL,
      seller_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE
    );
  `;

  const insertedProducts = await Promise.all(
    products.map((product) =>
      sql`
        INSERT INTO products (id, name, description, price, image_url, seller_id)
        VALUES (${product.id}, ${product.name}, ${product.description}, ${product.price}, ${product.imageUrl}, ${product.sellerId})
        ON CONFLICT (id) DO NOTHING;
      `
    )
  );

  return insertedProducts;
}

async function seedReviews() {
  await sql`
    CREATE TABLE IF NOT EXISTS reviews (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      seller_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
      content TEXT NOT NULL,
      rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5)
    );
  `;

  const insertedReviews = await Promise.all(
    reviews.map((review) =>
      sql`
        INSERT INTO reviews (id, seller_id, product_id, content, rating)
        VALUES (${review.id}, ${review.sellerId}, ${review.productId}, ${review.content}, ${review.rating})
        ON CONFLICT (id) DO NOTHING;
      `
    )
  );

  return insertedReviews;
}

export async function GET() {
  try {
    const result = await sql.begin((sql) => [
      seedUsers(),
      seedProducts(),
      seedReviews(),
    ]);

    return Response.json({ message: 'Handcraft DB seeded successfully' });
  } catch (error) {
    console.error(error);
    return Response.json({ error }, { status: 500 });
  }
}
