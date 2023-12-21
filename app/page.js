import Link from "next/link";
import SchoolForm from "./addschools/page";

export default function Home() {
  return (
    <main className="flex items-center justify-center h-screen">
      <Link href={'/addschools'}>
        <div className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Add School</div>
      </Link>
      <Link href={'/showschools'}>
        <div className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Show Schools</div>
      </Link>
    </main>
  )
}
