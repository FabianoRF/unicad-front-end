"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import Header from "../components/header";
import Input from "../components/input";
import { ICreateDelivery } from "../models/delivery";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import BackButton from "../components/backButton";

export type Inputs = {
  name: string;
  deliveryDate: Date;
  initialLatitude: number;
  initialLongitude: number;
  finalLatitude: number;
  finalLongitude: number;
  teste: string;
};

export default function CreateDelivery() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const body: ICreateDelivery = {
      ...data,
      initialLatitude: +data.initialLatitude,
      initialLongitude: +data.initialLongitude,
      finalLatitude: +data.finalLatitude,
      finalLongitude: +data.finalLatitude,
      deliveryDate: new Date(data.deliveryDate),
    };

    fetch(`${process.env.BASE_URL}/delivery`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then(() => {
      router.push("/");
    });

    console.log("date", body);
  };

  return (
    <div>
      <Header>
        <Header>
          <BackButton />
        </Header>
      </Header>
      <form className="flex justify-center" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2 w-full max-w-3xl p-5 justify-between items-center ">
          <Input
            type="text"
            label="Digite o nome:"
            name="name"
            register={register}
            required
          />
          <Input
            label="Digite o a data de entrega:"
            type="date"
            name="deliveryDate"
            min={new Date().toISOString().split("T")[0]}
            register={register}
            key="deliveryDate"
            required
          />
          <Input
            label="Digite a latitude do ponto de partida:"
            name="initialLongitude"
            type="number"
            register={register}
            step="0.00000001"
            key="initialLongitude"
            required
          />
          <Input
            label="Digite a longitude do ponto de partida:"
            type="number"
            name="initialLatitude"
            key="initialLatitude"
            step="0.00000001"
            register={register}
            required
          />
          <Input
            label="Digite a latitude do destino:"
            type="number"
            name="finalLatitude"
            key="finalLatitude"
            step="0.00000001"
            register={register}
            required
          />
          <Input
            label="Digite a longitude do destino:"
            type="number"
            name="finalLongitude"
            key="finalLongitude"
            step="0.00000001"
            register={register}
            required
          />
          {errors.deliveryDate && <span>This field is required</span>}
          <input
            type="submit"
            className="text-white bg-green-500  hover:bg-green-700 py-3 px-8 rounded-lg cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
}
