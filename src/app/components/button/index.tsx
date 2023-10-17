import Link from "next/link";

interface IButtonProps {
  title: string;
}

export default function Button({ title }: IButtonProps) {
  return (
    <div className="flex justify-end w-full max-w-3xl p-5">
      <Link
        href="/create-delivery"
        className="flex items-center text-white font-semibold bg-green-500 py-3 px-8 rounded-lg"
      >
        {title}
      </Link>
    </div>
  );
}
