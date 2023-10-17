import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";

export default function BackButton() {
  const router = useRouter();
  return (
    <div
      className="flex justify-start items-center gap-2 w-full max-w-3xl p-5 cursor-pointer "
      onClick={() => router.push("/")}
    >
      <FiArrowLeft className="text-sky-90 w-4 h-4 hover:text-gray-300" />
      <Link
        href="/create-delivery"
        className="flex items-center text-white  font-semibold hover:text-gray-300"
      >
        Voltar
      </Link>
    </div>
  );
}
