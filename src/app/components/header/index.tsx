import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-center w-full bg-sky-900 h-20">
      <div className="flex justify-end w-full max-w-3xl p-5">
        <Link
          href="/create-delivery"
          className="flex items-center text-white font-semibold bg-green-500 py-3 px-8 rounded-lg"
        >
          Cadastrar nova rota
        </Link>
      </div>
    </header>
  );
}
