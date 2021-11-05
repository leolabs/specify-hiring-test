import { Button } from "@chakra-ui/button";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { useToast } from "@chakra-ui/toast";
import copy from "copy-to-clipboard";
import React, { useState } from "react";
import { ParserFormat } from "../../pages/api/colorTokens/export/formats";
import { CodePreview } from "./code-preview";
import { FormatSelector } from "./format-selector";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

/** Returns an URL for accessing the color tokens in the given format. */
const getUrlForFormat = (format: string) => {
  const url = new URL(window.location.href);
  url.pathname = "/api/colorTokens/export/" + format;
  return url.toString();
};

/**
 * Downloads the color tokens in the given format.
 * This method uses the link's download attribute to
 * trigger the download without opening a new tab.
 */
const downloadFormat = (format: string) => {
  const downloadLink = document.createElement("a");
  downloadLink.href = "/api/colorTokens/export/" + format + "?download=1";
  downloadLink.download = "true";
  downloadLink.click();
};

/**
 * Displays a modal that allows the user to export the color tokens as code.
 */
export const ExportModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const toast = useToast();
  const [selectedFormat, setSelectedFormat] = useState<ParserFormat | null>(
    null
  );

  const copyLink = () => {
    if (selectedFormat) {
      copy(getUrlForFormat(selectedFormat.format));
      toast({
        title: "Copied to clipboard",
        status: "success",
        variant: "subtle",
      });
      onClose();
    }
  };

  const downloadFile = () => {
    if (selectedFormat) {
      downloadFormat(selectedFormat.format);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Export Color Tokens</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <FormatSelector
            selectedFormat={selectedFormat}
            onFormatChange={setSelectedFormat}
          />
          <CodePreview format={selectedFormat} />
        </ModalBody>

        <ModalFooter>
          <Button
            disabled={!selectedFormat}
            onClick={copyLink}
            mr="4"
            variant="ghost"
          >
            Copy Link
          </Button>
          <Button
            disabled={!selectedFormat}
            onClick={downloadFile}
            colorScheme="blue"
          >
            Download as File
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
