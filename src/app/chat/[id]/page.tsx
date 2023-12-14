"use client";

import {
  Button,
  Container,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import io from "socket.io-client";

function textAddReducer(
  state: { textList: string[] },
  action: { textList: string[] },
) {
  if (action?.textList) {
    return { textList: state.textList.concat(...action.textList) };
  }
  return state;
}

export default function ChatRoom({
  params: { id },
}: {
  params: { id: string };
}) {
  const [chatRoomData, chatRoomDispath] = useReducer(textAddReducer, {
    textList: [] as string[],
  });

  const [chatInput, setChatInput] = useState<string>();
  const [socketClient, setSocketClient] = useState<any>();
  const scrollContainer = useRef<HTMLDivElement>(null);

  const roomString = `${id}_room`;

  useEffect(() => {
    const _socketClient = io(window.location.origin);

    _socketClient.on("connect", () => {
      console.log("connection server");
      chatRoomDispath({ textList: [roomString] });
    });
    _socketClient.on(roomString, (msg) => {
      chatRoomDispath({ textList: [msg] });
      const currentScrollContainer = scrollContainer.current;
      if (currentScrollContainer) {
        currentScrollContainer.scrollTop = currentScrollContainer.scrollHeight;
      }
    });
    _socketClient.emit("listen_room", id);

    setSocketClient(_socketClient);
    return () => {
      if (_socketClient) {
        _socketClient.close();
      }
    };
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
      <VStack align={"start"} overflow={"auto"} ref={scrollContainer}>
        {chatRoomData?.textList?.map?.((text, i) => (
          <Text key={i}>{text}</Text>
        ))}
      </VStack>
      <form onSubmit={onSubmit} style={{ height: "5rem" }}>
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
