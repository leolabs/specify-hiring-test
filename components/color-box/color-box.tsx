import { Box } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { Tooltip } from "@chakra-ui/tooltip";
import copy from "copy-to-clipboard";
import React from "react";
import { Color, colorToRgba } from "../../util/schemas/color";

import checkers from "./transparent-checkers.svg";

interface Props {
  color: Color;
}

/**
 * Displays a single color and allows it to be copied to the clipboard.
 */
export const ColorBox: React.FC<Props> = ({ color }) => {
  const toast = useToast();
  const rgba = colorToRgba(color);

  const copyToClipboard = () => {
    copy(rgba);
    toast({
      title: "Copied to clipboard",
      status: "success",
      variant: "subtle",
    });
  };

  return (
    <div className="color-box">
      <Tooltip label="Tap to copy">
        <Box
          onClick={copyToClipboard}
          backgroundColor={rgba}
          cursor="pointer"
          w="8"
          h="8"
        />
      </Tooltip>

      <style jsx>{`
        .color-box {
          overflow: hidden;
          border-radius: 0.4rem;
          background: #eee url(${checkers.src});
          background-size: 11px;
          flex-shrink: 0;
        }
      `}</style>
    </div>
  );
};
