export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 py-6 mt-12">
      <div className="max-w-6xl mx-auto px-8 text-center text-sm text-gray-500 dark:text-gray-400">
        © {year} João Graça
      </div>
    </footer>
  )
}
