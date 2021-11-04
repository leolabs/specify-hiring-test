import React from "react";
import { RgbaColorPicker } from "react-colorful";

// We just pass all props on to the RgbaColorPicker.
type Props = React.ComponentProps<typeof RgbaColorPicker>;

/** A slightly modified color picker */
export const ColorPicker: React.FC<Props> = (props) => {
  return (
    <div className="color-picker">
      <RgbaColorPicker {...props} />

      <style jsx>{`
        .color-picker :global(.react-colorful) {
          width: 100%;
          height: 300px;
        }
      `}</style>
    </div>
  );
};
