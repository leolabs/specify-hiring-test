import React from "react";
import { Box, Text } from "@chakra-ui/layout";
import { HStack, Spacer } from "@chakra-ui/react";
import { ColorToken } from "@prisma/client";

import { colorToRgba } from "../../util/color";
import { dbToColorToken } from "../../util/schemas/color-token";
import { ColorBox } from "./color-box";

interface RowProps {
  colorToken: ColorToken;
}

export const ColorTokenRow: React.FC<RowProps> = ({ colorToken }) => {
  const { value } = dbToColorToken(colorToken);

  return (
    <HStack
      as="li"
      p="4"
      mb="4"
      bg="card.bg"
      borderWidth="1px"
      borderColor="card.border"
      borderRadius="8"
      align="center"
    >
      <ColorBox color={value} />
      <Text pl="2" fontWeight="bold">
        {colorToken.name}
      </Text>
      <Text opacity="0.5">{colorToRgba(value)}</Text>
    </HStack>
  );
};
