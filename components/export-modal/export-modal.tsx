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

export const ExportModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const toast = useToast();
  const [selectedFormat, setSelectedFormat] = useState<ParserFormat | null>(
    null
  );

  const copyLink = () => {
    if (selectedFormat) {
      const url = new URL(window.location.href);
      url.pathname = "/api/colorTokens/export/" + selectedFormat.format;
      copy(url.toString());
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
      const downloadLink = document.createElement("a");
      downloadLink.href =
        "/api/colorTokens/export/" + selectedFormat.format + "?download=1";
      downloadLink.target = "_blank";
      downloadLink.download = "true";
      downloadLink.click();
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
          <Button onClick={copyLink} mr="4" variant="ghost">
            Copy Link
          </Button>
          <Button onClick={downloadFile} colorScheme="blue">
            Download as File
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
