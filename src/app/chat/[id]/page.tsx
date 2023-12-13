"use client";

import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from "react";

export default function ChatRoom({
  params: { id },
}: {
  params: { id: string };
}) {
  const [chatRoomText, setChatRoomText] = useState<string>(id);
  const [chatInput, setChatInput] = useState<string>();

  useEffect(() => {
    setChatRoomText(id);
  }, []);

  const onChangeInput: ChangeEventHandler<HTMLInputElement> = (evt) => {
    setChatInput(evt.target.value);
  };

  const onSubmit: FormEventHandler = (event) => {
    setChatInput("");
    event.preventDefault();
  };
  return (
    <Stack spacing={4}>
      <Text>{chatRoomText}</Text>
      <form onSubmit={onSubmit}>
        <InputGroup>
          <Input
            placeholder="여기에 채팅을 입력하세요."
            onChange={onChangeInput}
            onSubmit={onSubmit}
            value={chatInput}
          />
          <InputRightElement>
            <Button type={"submit"}>전송</Button>
          </InputRightElement>
        </InputGroup>
      </form>
    </Stack>
  );
}
