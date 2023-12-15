"use client";

import { Button, Input } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FormEventHandler, useState } from "react";

export default function CreateRoom() {
  const [name, setName] = useState<string>();
  const admin = "TODO";

  const router = useRouter();

  async function createRoom() {
    const result = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ name, admin }),
    });
    const { roomId } = await result.json();
    router.push(`/chat/${roomId}`);
  }

  const onSubmitHandler: FormEventHandler = (e) => {
    e.preventDefault();
    createRoom();
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <Input value={name} onChange={(e) => setName(e.target.value)}></Input>
      <Button type="submit">만들기.</Button>
    </form>
  );
}
