import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-center w-full bg-sky-900 h-20">
      <div className="flex justify-end w-full max-w-3xl p-5">
        <Link href="/create-delivery" className="text-white">
          Cadastrar nova rota
        </Link>
      </div>
    </header>
  );
}
