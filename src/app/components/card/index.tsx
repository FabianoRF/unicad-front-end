import Link from "next/link";
import { FiArrowRight, FiTrash2, FiMapPin } from "react-icons/fi";

interface ICardProps {
  id: number;
  name: string;
  deliveryDate: string;
}

export default function Card({ deliveryDate, id, name }: ICardProps) {
  return (
    <li key={id} className="flex justify-between gap-x-6 py-5">
      <div className="flex items-center w-full gap-x-4">
        <FiMapPin className="w-8 h-8 text-sky-900" />
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900">
            {name}
          </p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
            {new Date(deliveryDate).getUTCDate()}
          </p>
        </div>
        <div className="flex flex-col">
          <Link
            href={{ pathname: "/map", query: { id } }}
            className="text-green-500 font-semibold flex justify-between items-center gap-1 text-xs cursor-pointer"
          >
            Ver rota <FiArrowRight className="w-4 h-4" />
          </Link>
          <div className="mt-2 text-red-500 font-semibold flex justify-between items-center gap-1 text-xs cursor-pointer">
            Excluir <FiTrash2 className="w-4 h-4" />
          </div>
        </div>
      </div>
    </li>
  );
}
