"use client";
import Header from "./components/header";
import { useEffect, useState } from "react";
import { IDelivery } from "./models/delivery";
import Card from "./components/card";

export default function Home() {
  const [deliveries, setDeliveries] = useState<IDelivery[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.BASE_URL}/delivery`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
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
            <Card
              key={delivery.id}
              id={delivery.id}
              deliveryDate={delivery.deliveryDate}
              name={delivery.name}
            ></Card>
          ))}
      </ul>
    </main>
  );
}
