"use client";
import Link from "next/link";
import Header from "./components/header";
import { useEffect, useState } from "react";

export interface IDelivery {
  id: number;
  name: string;
  deliveryDate: Date;
  initialLatitude: number;
  initialLongitude: number;
  finalLatitude: number;
  finalLongitude: number;
}

export default function Home() {
  const [deliveries, setDeliveries] = useState<IDelivery[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.BASE_URL}/delivery`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        console.log("data ", data);
        setDeliveries(data.list);
        setLoading(false);
      });
  }, []);

  return (
    <main className="flex flex-col items-center">
      <Header></Header>
      <ul role="list" className="divide-y divide-gray-100 w-full max-w-3xl p-5">
        {isLoading && <div className="text-black">Loading...</div>}

        {!isLoading &&
          deliveries.map((delivery) => (
            <li key={delivery.id} className="flex justify-between gap-x-6 py-5">
              <div className="flex w-full gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {delivery.name}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    {new Date(delivery.deliveryDate).getUTCDate()}
                  </p>
                </div>
                <div className="flex">
                  <Link href="/route" className="text-black">
                    Ver rota
                  </Link>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </main>
  );
}
