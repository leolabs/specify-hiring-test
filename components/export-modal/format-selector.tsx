import { Alert } from "@chakra-ui/alert";
import { Center } from "@chakra-ui/layout";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/spinner";
import React, { useEffect } from "react";
import useSWR from "swr";
import type {
  FormatList,
  ParserFormat,
} from "../../pages/api/colorTokens/export/formats";
import { fetcher, FetchError } from "../../util/swr-fetcher";

interface Props {
  selectedFormat: ParserFormat;
  onFormatChange: (format: ParserFormat) => void;
}

export const FormatSelector: React.FC<Props> = ({
  selectedFormat,
  onFormatChange,
}) => {
  const { data, error, isValidating } = useSWR<FormatList, FetchError>(
    "/api/colorTokens/export/formats",
    fetcher
  );

  // When the list of formats is loaded, automtically select the first format
  useEffect(() => {
    if (data) {
      onFormatChange(data.formats[0]);
    }
  }, [data]);

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
