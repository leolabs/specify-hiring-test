import React, { useState } from "react";
import Head from "next/head";
import useSWR from "swr";
import { Center, Container, Heading, List, Spacer } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { AddIcon, DownloadIcon } from "@chakra-ui/icons";

import { fetcher, FetchError } from "../util/swr-fetcher";
import type { ColorTokenList } from "./api/colorTokens";
import { Alert } from "@chakra-ui/alert";
import { ColorTokenRow } from "../components/color-token-row/color-token-row";
import { HStack, IconButton } from "@chakra-ui/react";
import { ExportModal } from "../components/export-modal/export-modal";

const TokenList: React.FC = () => {
  const { data, error, isValidating } = useSWR<ColorTokenList, FetchError>(
    "/api/colorTokens",
    fetcher
  );

  if (isValidating) {
    return (
      <Center h="100px">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error) {
    return <Alert>Error: {error.message}</Alert>;
  }

  return (
    <List>
      {data.colorTokens.map((t) => (
        <ColorTokenRow key={t.id} colorToken={t} />
      ))}
    </List>
  );
};

export default function ColorTokens() {
  const [showExportModal, setShowExportModal] = useState(false);

  return (
    <Container>
      <Head>
        <title>ACME Color Tokens</title>
      </Head>

      <HStack>
        <Heading py="8">ACME Color Tokens</Heading>
        <Spacer />
        <IconButton icon={<AddIcon />} aria-label="Add a color token" />
        <IconButton
          icon={<DownloadIcon />}
          onClick={() => setShowExportModal(true)}
          aria-label="Export color tokens"
        />
      </HStack>

      <TokenList />

      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
      />
    </Container>
  );
}
