import './globals.css';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'BuildOS · Construction intelligence', description: 'AI-native operating system for general contractors' };
export default function Layout({children}:{children:React.ReactNode}) {return <html lang="en"><body>{children}</body></html>}
