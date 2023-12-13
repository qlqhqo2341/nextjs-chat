import { Flex } from "@chakra-ui/react";
import Link from "next/link";

export default function ChatListPage() {
  return (
    <Flex flexDirection={"column"}>
      <ul>
        <li>
          <Link href="/chat/1">hoho</Link>
        </li>
      </ul>
    </Flex>
  );
}
