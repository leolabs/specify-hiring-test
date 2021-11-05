import React from "react";
import { Center, Spinner, Alert, List } from "@chakra-ui/react";

import { useColorTokens } from "../../hooks/use-color-tokens";
import { ColorTokenRow } from "../color-token-row/color-token-row";

/**
 * Fetches the color tokens from the API and renders them in a list.
 */
export const ColorTokenList: React.FC = () => {
  const { data, error, isValidating } = useColorTokens();

  if (error) {
    return <Alert status="error">Error: {error.message}</Alert>;
  }

  if (data?.colorTokens.length === 0) {
    return (
      <Alert>
        You don&apos;t have any color tokens yet. Tap the plus button to add
        your first color token.
      </Alert>
    );
  }

  if (data) {
    return (
      <List>
        {data.colorTokens.map((t) => (
          <ColorTokenRow key={t.id} colorToken={t} />
        ))}
      </List>
    );
  }

  if (isValidating) {
    return (
      <Center h="100px">
        <Spinner size="xl" />
      </Center>
    );
  }

  return null;
};
