"use client";
import Header from "./components/header";
import { useCallback, useEffect, useState } from "react";
import { IDelivery } from "./models/delivery";
import Card from "./components/card";
import Paginator from "./components/paginator";
import Button from "./components/button";

export default function Home() {
  const [deliveries, setDeliveries] = useState<IDelivery[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [limit, setLimit] = useState<number>(10);
  const [offset, setOffset] = useState<number>(0);
  const [countItems, setCountItems] = useState<number>(0);

  const previousPage = async () => {
    if (offset !== 0) {
      setOffset(offset - 10);
      await getDeliveries();
    }
  };

  const nextPage = async () => {
    const isOffsetLimit = offset + 10 > countItems;
    if (!isOffsetLimit) {
      setOffset(offset + 10);
      await getDeliveries();
    }
  };

  const onDeleteFinished = async () => {
    await getDeliveries();
  };

  const onDeleteStarted = () => {
    setLoading(true);
  };

  const getDeliveries = useCallback(async () => {
    setLoading(true);
    fetch(`${process.env.BASE_URL}/delivery?limit=${limit}&offset=${offset}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setDeliveries(data.list);
        setCountItems(data.count);
        setLoading(false);
      });
  }, [limit, offset]);

  useEffect(() => {
    getDeliveries();
  }, [getDeliveries]);

  return (
    <main className="flex flex-col items-center">
      <Header>
        <Button title="Cadastrar nova rota" />
      </Header>
      <ul role="list" className="divide-y divide-gray-100 w-full max-w-3xl p-5">
        <h1 className="text-gray-900 font-semibold  py-3">
          Lista de entregas:
        </h1>
        {isLoading && <div className="text-black">Loading...</div>}

        {!isLoading &&
          deliveries.map((delivery) => (
            <>
              <Card
                key={delivery.id}
                id={delivery.id}
                deliveryDate={delivery.deliveryDate}
                name={delivery.name}
                onDeleteStarted={() => onDeleteStarted()}
                onDeleteFinished={() => onDeleteFinished()}
              ></Card>
            </>
          ))}
      </ul>
      <Paginator nextPage={nextPage} previousPage={previousPage}></Paginator>
    </main>
  );
}
