import { ReactNode, useState } from "react";
import Slider from "@mui/material/Slider";

function valuetext(value: number) {
  return `${value} years old`;
}

export default function AgeRangeSliders({
  minAgeSelection = 0,
  maxAgeSelection = 20,
  handleChange
}: {
  minAgeSelection: number | undefined;
  maxAgeSelection: number | undefined;
  handleChange: (ages: number[]) => void;
}): ReactNode {

  const onChangeAgeRange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') return;
    handleChange(newValue);
  };

  return (
    <div className="w-full px-4">
      <Slider
        getAriaLabel={() => 'Age range'}
        value={[minAgeSelection, maxAgeSelection]}
        onChange={onChangeAgeRange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        shiftStep={1}
        step={1}
        marks
        min={0}
        max={20}
/>
    </div>
  )
}