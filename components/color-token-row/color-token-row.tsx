import React, { useState } from "react";
import { useSWRConfig } from "swr";
import { ColorToken } from "@prisma/client";
import { Text } from "@chakra-ui/layout";
import { DeleteIcon } from "@chakra-ui/icons";
import { HStack, IconButton, Spacer } from "@chakra-ui/react";

import { colorToRgba } from "../../util/schemas/color";
import { dbToColorToken } from "../../util/schemas/color-token";
import { ColorBox } from "../color-box/color-box";
import { ColorTokenList } from "../../pages/api/colorTokens";
import { DeleteDialog } from "./delete-dialog";

interface RowProps {
  colorToken: ColorToken;
}

export const ColorTokenRow: React.FC<RowProps> = ({ colorToken }) => {
  const { mutate } = useSWRConfig();
  const { value } = dbToColorToken(colorToken);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const deleteRow = async () => {
    mutate(
      "/api/colorTokens",
      (l: ColorTokenList) => ({
        colorTokens: l.colorTokens.filter((t) => t.id !== colorToken.id),
      }),
      false
    );

    await fetch(`/api/colorTokens/${colorToken.id}`, { method: "DELETE" });
  };

  return (
    <HStack
      as="li"
      px="4"
      h="16"
      mb="4"
      bg="card.bg"
      borderWidth="1px"
      borderColor="card.border"
      borderRadius="8"
      align="center"
    >
      <ColorBox color={value} />
      <HStack flexWrap="wrap">
        <Text pl="2" fontWeight="bold">
          {colorToken.name}
        </Text>
        <Text opacity="0.5">{colorToRgba(value)}</Text>
      </HStack>
      <Spacer />
      <IconButton
        onClick={() => setShowDeleteDialog(true)}
        variant="ghost"
        icon={<DeleteIcon />}
        aria-label="Delete this token"
      />
      <DeleteDialog
        isOpen={showDeleteDialog}
        colorToken={colorToken}
        onCancel={() => setShowDeleteDialog(false)}
        onDelete={deleteRow}
      />
    </HStack>
  );
};
