import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ChakraProvider, Grid, GridItem } from "@chakra-ui/react";
import Head from "./_layout/head";
import Navigation from "./_layout/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>wow</title>
      </head>
      <body className={inter.className}>
        <ChakraProvider>
          <Grid
            templateAreas={`"header header"
                  "nav main"`}
            gridTemplateRows={"3rem 1fr"}
            gridTemplateColumns={"10rem 1fr"}
            gap="1"
            height={"100vh"}
            color="blackAlpha.700"
            fontWeight="bold"
          >
            <GridItem pl="2" bg="orange.300" area={"header"}>
              <Head />
            </GridItem>
            <GridItem pl="2" bg="pink.300" area={"nav"}>
              <Navigation />
            </GridItem>
            <GridItem pl="2" bg="green.300" area={"main"}>
              {children}
            </GridItem>
          </Grid>
        </ChakraProvider>
      </body>
    </html>
  );
}
