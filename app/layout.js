// app/layout.js

import './globals.css'; // Import global CSS if you have any

export const metadata = {
  title: 'My SPA',
  description: 'A simple SPA with Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <nav>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              {/* Add more navigation links as needed */}
            </ul>
          </nav>
        </header>
        <main>{children}</main>
        <footer>
          <p>© 2024 My SPA</p>
        </footer>
      </body>
    </html>
  );
}
