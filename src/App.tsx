import * as React from "react";
import { ChakraProvider, Box, Text, Link, VStack, Code, Grid, theme, Container, Flex } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Logo } from "./Logo";
import Home from "./pages/Home";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Flex justify="flex-end" p={3}>
      <ColorModeSwitcher />
    </Flex>
    <Container maxW="container.lg" p={3}>
      <Home />
    </Container>
  </ChakraProvider>
);
