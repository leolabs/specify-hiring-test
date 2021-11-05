import React, { useEffect, useRef, useState } from "react";
import Color from "color";
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
import { RgbaColor } from "react-colorful";
import { Input } from "@chakra-ui/input";
import { Alert } from "@chakra-ui/alert";

import { ColorPicker } from "./color-picker";
import { colorToRgba } from "../../util/schemas/color";
import { useColorTokens } from "../../hooks/use-color-tokens";
import { ApiError } from "../../types/api";
import { ColorToken } from "../../util/schemas/color-token";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const INITIAL_NAME = "";
const INITIAL_COLOR = { r: 0, g: 0, b: 0, a: 1 };

/**
 * A modal for creating a new color token.
 */
export const NewTokenModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const toast = useToast();
  const { data, mutate } = useColorTokens();

  const nameRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState(INITIAL_NAME);

  // Color represents the structured format, while textColor can be
  // anything a user enters – even invalid data, so we have to be careful.
  const [color, setColor] = useState<RgbaColor>(INITIAL_COLOR);
  const [textColor, setTextColor] = useState("");
  const [colorIsInvalid, setColorIsInvalid] = useState(false);

  // State related to adding the token
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isDuplicateName = data?.colorTokens.some((t) => t.name === name);

  useEffect(() => {
    if (!isOpen) {
      setName(INITIAL_NAME);
      setColor(INITIAL_COLOR);
      setIsSubmitting(false);
      setError(null);
    }
  }, [isOpen]);

  // When the color picker changes, show the color in the text field.
  useEffect(() => setTextColor(colorToRgba(color)), [color]);

  /** Tries to parse the user input into a valid color. */
  const tryParseColor = (inputColor: string) => {
    try {
      const color = Color(inputColor);
      const { r, g, b, alpha } = color.rgb().object();
      setColor({ r, g, b, a: alpha ?? 1 });
      setColorIsInvalid(false);
      return true;
    } catch (e) {
      setColorIsInvalid(true);
      console.error(e);
      return false;
    }
  };

  /** Submits the new color to our API and mutates the schema */
  const addColorToken = async () => {
    setIsSubmitting(true);

    const body: ColorToken = {
      name,
      value: color,
      // TODO: We could let the user add their own meta maybe
      meta: { source: "localStyles" },
    };

    const result = await fetch("/api/colorTokens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    setIsSubmitting(false);

    if (result.ok) {
      mutate(); // Update the color tokens
      onClose();
      toast({
        title: "Token added",
        description: "Your token has been added to the list",
        status: "success",
        variant: "subtle",
      });
    } else {
      const error: ApiError = await result.json();
      setError(error.error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      initialFocusRef={nameRef}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add a New Color Token</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          {error && (
            <Alert status="error" mb="4">
              Error: {error}
            </Alert>
          )}

          <Input
            ref={nameRef}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Token Name (e.g. Colors/Accent)"
            isInvalid={isDuplicateName}
            mb="4"
          />
          <ColorPicker color={color} onChange={setColor} />
          <Input
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
            onBlur={(e) => tryParseColor(e.target.value)}
            onPaste={(e) => {
              const success = tryParseColor(e.clipboardData.getData("text"));
              // If the color is valid, cancel the paste because
              // we insert the rgba representation automatically.
              if (success) {
                e.preventDefault();
              }
            }}
            style={{ fontVariantNumeric: "tabular-nums" }}
            isInvalid={colorIsInvalid}
            mt="4"
          />
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose} mr="4" variant="ghost">
            Cancel
          </Button>
          <Button
            onClick={addColorToken}
            isLoading={isSubmitting}
            isDisabled={isSubmitting || !name || isDuplicateName}
            colorScheme="blue"
          >
            Add Color Token
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
