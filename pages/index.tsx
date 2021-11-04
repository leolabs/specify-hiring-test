import React, { useState } from "react";
import Head from "next/head";
import { Center, Container, Heading, List, Spacer } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { AddIcon, DownloadIcon } from "@chakra-ui/icons";
import { Alert } from "@chakra-ui/alert";
import { HStack, IconButton } from "@chakra-ui/react";

import { ColorTokenRow } from "../components/color-token-row/color-token-row";
import { ExportModal } from "../components/export-modal/export-modal";
import { NewTokenModal } from "../components/new-token-modal/new-token-modal";
import { useColorTokens } from "../hooks/use-color-tokens";

const TokenList: React.FC = () => {
  const { data, error, isValidating } = useColorTokens();

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
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <Container>
      <Head>
        <title>ACME Color Tokens</title>
      </Head>

      <HStack>
        <Heading py="8">ACME Color Tokens</Heading>
        <Spacer />
        <IconButton
          onClick={() => setShowCreateModal(true)}
          icon={<AddIcon />}
          aria-label="Add a color token"
        />
        <IconButton
          onClick={() => setShowExportModal(true)}
          icon={<DownloadIcon />}
          aria-label="Export color tokens"
        />
      </HStack>

      <TokenList />

      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
      />

      <NewTokenModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
    </Container>
  );
}
