"use client";
import Header from "./components/header";
import { useEffect, useState } from "react";
import { IDelivery } from "./models/delivery";
import Card from "./components/card";
import Paginator from "./components/paginator";
import Link from "next/link";
import Button from "./components/button";

export default function Home() {
  const [deliveries, setDeliveries] = useState<IDelivery[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [limit, setLimit] = useState<number>(10);
  const [offset, setOffset] = useState<number>(0);

  function previousPage() {
    console.log("previousPage");
  }

  function nextPage() {
    console.log("nextPage");
  }

  useEffect(() => {
    fetch(`${process.env.BASE_URL}/delivery?limit=${limit}&offset=${offset}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setDeliveries(data.list);
        setLoading(false);
      });
  }, [limit, offset]);

  return (
    <main className="flex flex-col items-center">
      <Header>
        <Button title="Cadastrar nova rota" />
      </Header>
      <ul role="list" className="divide-y divide-gray-100 w-full max-w-3xl p-5">
        {isLoading && <div className="text-black">Loading...</div>}

        {!isLoading &&
          deliveries.map((delivery) => (
            <>
              <Card
                key={delivery.id}
                id={delivery.id}
                deliveryDate={delivery.deliveryDate}
                name={delivery.name}
              ></Card>

              <Paginator
                nextPage={nextPage}
                previousPage={previousPage}
              ></Paginator>
            </>
          ))}
      </ul>
    </main>
  );
}
