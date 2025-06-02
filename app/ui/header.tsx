import { openSans, roboto } from './fonts';
import Link from 'next/link';
import { Search } from 'lucide-react';

export function Header() {
  return (
    <header className={`flex items-center justify-between px-6 py-4 bg-primary text-white ${openSans.className}`}>

      <div className="flex items-center space-x-6">
        <Link href="/" className={`text-xl font-bold ${roboto.className}`}>
          Handcraft Haven
        </Link>
        <Link href="/dashboard/sellers" className="hover:underline">Sellers</Link>
        <Link href="#" className="hover:underline">Products</Link>
        <Link href="#" className="hover:underline">Join Us</Link>
      </div>

      <div className="flex items-center space-x-4">
        <Link href="/login" className="hover:underline">Login</Link>
        <button aria-label="Search" className="hover:text-gray-300">
          <Search size={20} />
        </button>
      </div>
    </header>
  );
}

  