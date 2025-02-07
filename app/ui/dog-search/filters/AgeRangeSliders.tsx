import { ReactNode, useState } from "react";
import Slider from "@mui/material/Slider";

function valuetext(value: number) {
  return `${value} years old`;
}

export default function AgeRangeSliders(): ReactNode {
  const [ageRange, setAgeRange] = useState<number[]>([0, 20]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setAgeRange(newValue as number[]);
  };

  return (
    <div className="w-full px-4">
      <Slider
        getAriaLabel={() => 'Age range'}
        value={ageRange}
        onChange={handleChange}
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