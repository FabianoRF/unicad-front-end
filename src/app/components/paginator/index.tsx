import Link from "next/link";
import { FiArrowRight, FiTrash2, FiMapPin, FiArrowLeft } from "react-icons/fi";

interface IPaginatorProps {
  nextPage: () => void;
  previousPage: () => void;
}

export default function Paginator({ nextPage, previousPage }: IPaginatorProps) {
  return (
    <>
      <FiArrowLeft onClick={previousPage} className="text-sky-90 w-4 h-4" />
      <FiArrowRight onClick={nextPage} className="text-sky-90 w-4 h-4" />
    </>
  );
}
