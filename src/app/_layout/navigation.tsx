import { Flex } from "@chakra-ui/layout";
import { Link } from "@chakra-ui/react";

export default function Navigation() {
  return (
    <Flex flexDirection={"column"}>
      <Link href="/">home</Link>
      <Link href="/chat">chat list</Link>
      <Link href="/chat/create">create chat</Link>
    </Flex>
  );
}
