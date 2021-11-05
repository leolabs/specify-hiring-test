import React from "react";
import Highlight from "react-highlight";
import { Alert } from "@chakra-ui/alert";
import { Box, Center } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";

import { ParserFormat } from "../../pages/api/colorTokens/export/formats";
import { useExportPreview } from "../../hooks/use-export-preview";

interface Props {
  format: ParserFormat;
}

/**
 * Fetches and displays the exported code in the specified format.
 */
export const CodePreview: React.FC<Props> = ({ format }) => {
  const { data, error, isValidating } = useExportPreview(format?.format);

  if (error) {
    return <Alert status="error">Error: {error.message}</Alert>;
  }

  if (data) {
    return (
      <Box bg="card.bg" borderRadius="6" px="3" py="2">
        <Highlight className={format.language}>{data}</Highlight>
      </Box>
    );
  }

  if (isValidating) {
    return (
      <Center h="400px">
        <Spinner size="xl" />
      </Center>
    );
  }

  return null;
};
