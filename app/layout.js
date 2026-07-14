export const metadata = {
  title: 'APSSB GS Portal',
  description: 'Free Practice Portal',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
