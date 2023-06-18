import Provider from './components/Provider';
import './globals.css';

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 ">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
