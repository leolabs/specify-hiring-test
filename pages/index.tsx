import React, { useState } from "react";
import Head from "next/head";
import { Container, Heading, Spacer } from "@chakra-ui/layout";
import { AddIcon, DownloadIcon } from "@chakra-ui/icons";
import { HStack, IconButton } from "@chakra-ui/react";

import { ColorTokenList } from "../components/color-token-list/color-token-list";
import { ExportModal } from "../components/export-modal/export-modal";
import { NewTokenModal } from "../components/new-token-modal/new-token-modal";

export default function ColorTokens() {
  const [showExportModal, setShowExportModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <Container>
      <Head>
        <title>ACME Color Tokens</title>
        <link rel="favicon" href="/favicon.ico" />
      </Head>

      <HStack>
        <Heading fontSize={["2xl", "3xl"]} py="8">
          ACME Color Tokens
        </Heading>
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

      <ColorTokenList />

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
