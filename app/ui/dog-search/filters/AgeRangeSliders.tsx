import { ReactNode } from "react";
import Slider from "@mui/material/Slider";
import { useSearchFilterQueryContext } from "@context/searchFilterQueryProvider";

function valuetext(value: number) {
  return `${value} years old`;
}

export default function AgeRangeSliders(): ReactNode {
  const { ageRange, setAgeRange } = useSearchFilterQueryContext();

  const onChangeAgeRange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') return;
    setAgeRange(newValue);
  };

  return (
    <div className="w-full px-4">
      <Slider
        getAriaLabel={() => 'Age range'}
        value={[ageRange[0], ageRange[1]]}
        onChange={onChangeAgeRange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        shiftStep={1}
        step={1}
        marks
        min={0}
        max={15}
      />
    </div>
  )
}