import React from "react";
import useSWR from "swr";
import Highlight from "react-highlight";
import { Alert } from "@chakra-ui/alert";
import { Box, Center } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";

import { fetcher, FetchError } from "../../util/swr-fetcher";
import { ParserFormat } from "../../pages/api/colorTokens/export/formats";

interface Props {
  format: ParserFormat;
}

export const CodePreview: React.FC<Props> = ({ format }) => {
  const { data, error, isValidating } = useSWR<string, FetchError>(
    `/api/colorTokens/export/${format?.format ?? ""}`,
    (url) => fetcher(url, "text")
  );

  console.log({ data, error, isValidating });

  if (error) {
    return <Alert>Error: {error.message}</Alert>;
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
