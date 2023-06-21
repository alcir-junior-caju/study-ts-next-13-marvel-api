'use client';

import StyledComponentsRegistry from "./registry";
import GlobalStyle from '../styles/global';
import { Roboto } from 'next/font/google';
import { ReactNode } from "react";

const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en" className={roboto.className}>
      <head>
        <title>Seach Heroes</title>
      </head>
      <StyledComponentsRegistry>
        <GlobalStyle />
        <body>
          <main>
            {children}
          </main>
        </body>
      </StyledComponentsRegistry>
    </html>
  )
}
