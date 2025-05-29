import { openSans, roboto } from './fonts';

export function Footer() {
  return (
    <footer
      className={`bg-primary text-white px-4 py-6 text-sm ${openSans.className}`}
    >
      <div className="flex flex-col items-center text-center gap-2 md:flex-row md:justify-between md:text-left">
        <p>© 2025 Handcraft Haven. All rights reserved.</p>
        <p>Developers: Anthony I., Andrew O., Gleyson O., Gilbert K.</p>
        <p>
          Contact us:
          <a href="mailto:team5@wdd430.com" className="underline ml-1">
            team5@wdd430.com
          </a>{' '}
          |
          <a href="tel:07012349876" className="underline ml-1">
            07012349876
          </a>
        </p>
      </div>
    </footer>
  );
}

  