import React from "react";
import { ColorToken } from "@prisma/client";
import { Button } from "@chakra-ui/button";
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/modal";

interface DeleteProps {
  colorToken: ColorToken;
  isOpen: boolean;
  onDelete: () => void;
  onCancel: () => void;
}

export const DeleteDialog: React.FC<DeleteProps> = ({
  colorToken,
  isOpen,
  onDelete,
  onCancel,
}) => {
  const cancelRef = React.useRef<HTMLButtonElement>();

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onCancel}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete {colorToken.name}?
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can&apos;t undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onCancel}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={onDelete} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
