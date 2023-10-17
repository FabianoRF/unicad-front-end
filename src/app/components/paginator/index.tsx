import { FiArrowRight, FiArrowLeft } from "react-icons/fi";

interface IPaginatorProps {
  nextPage: () => void;
  previousPage: () => void;
}

export default function Paginator({ nextPage, previousPage }: IPaginatorProps) {
  return (
    <div className="flex gap-3">
      <FiArrowLeft
        onClick={previousPage}
        className="text-sky-900 w-6 h-6 cursor-pointer"
      />

      <FiArrowRight
        onClick={nextPage}
        className="text-sky-900 w-6 h-6 cursor-pointer"
      />
    </div>
  );
}
