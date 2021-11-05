import React, { useEffect } from "react";
import { Alert } from "@chakra-ui/alert";
import { Center } from "@chakra-ui/layout";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/spinner";

import { useExportFormats } from "../../hooks/use-export-formats";
import type { ParserFormat } from "../../pages/api/colorTokens/export/formats";

interface Props {
  selectedFormat: ParserFormat;
  onFormatChange: (format: ParserFormat) => void;
}

/**
 * Fetches the export formats from the API and displays them in a button group.
 */
export const FormatSelector: React.FC<Props> = ({
  selectedFormat,
  onFormatChange,
}) => {
  const { data, error, isValidating } = useExportFormats();

  // When the list of formats is loaded, automtically select the first format
  useEffect(() => {
    if (data) {
      onFormatChange(data.formats[0]);
    }
  }, [data, onFormatChange]);

  if (error) {
    return <Alert>Error: {error.message}</Alert>;
  }

  if (data) {
    return (
      <div>
        <ButtonGroup size="sm" isAttached variant="outline" mb="4">
          {data?.formats.map((format) => (
            <Button
              key={format.format}
              mr="-px"
              onClick={() => onFormatChange(format)}
              isActive={selectedFormat?.format === format.format}
            >
              {format.name}
            </Button>
          ))}
        </ButtonGroup>
      </div>
    );
  }

  if (isValidating) {
    return (
      <Center h="8">
        <Spinner size="md" />
      </Center>
    );
  }

  return null;
};
