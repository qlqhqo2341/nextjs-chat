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
  useReducer,
  useState,
} from "react";
import io from "socket.io-client";

function textAddReducer(state: { text: string }, action: { text: string }) {
  if (action?.text) {
    return { text: `${state.text}\n${action.text}` };
  }
  return state;
}

export default function ChatRoom({
  params: { id },
}: {
  params: { id: string };
}) {
  const [chatRoomData, chatRoomDispath] = useReducer(textAddReducer, {
    text: "",
  });

  const [chatInput, setChatInput] = useState<string>();
  const [socketClient, setSocketClient] = useState<any>();

  const roomString = `${id}_room`;

  useEffect(() => {
    chatRoomDispath({ text: roomString });

    const _socketClient = io(window.location.origin);

    _socketClient.on("connect", () => {
      console.log("connection server");
    });
    _socketClient.on(roomString, (msg) => {
      chatRoomDispath({ text: msg });
    });
    _socketClient.emit("listen_room", id);

    setSocketClient(_socketClient);
  }, []);

  const onChangeInput: ChangeEventHandler<HTMLInputElement> = (evt) => {
    setChatInput(evt.target.value);
  };

  const onSubmit: FormEventHandler = async (event) => {
    await socketClient.emit(roomString, chatInput);

    setChatInput("");
    event.preventDefault();
  };
  return (
    <Stack spacing={4}>
      <Text>{chatRoomData.text}</Text>
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
