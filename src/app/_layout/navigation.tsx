import { Flex } from "@chakra-ui/layout";
import { Link } from "@chakra-ui/react";

export default function Navigation() {
  return (
    <Flex flexDirection={"column"}>
      <Link href="/">home</Link>
      <Link href="/aaa">aaa</Link>
    </Flex>
  );
}
