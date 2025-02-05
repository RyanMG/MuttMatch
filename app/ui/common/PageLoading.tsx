import { ReactNode } from "react";

export default function PageLoading(): ReactNode {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <div className="h-32 w-32">
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'>
          <circle fill='#FFBD28' stroke='#FFBD28' strokeWidth='4' r='15' cx='40' cy='65'>
            <animate attributeName='cy' calcMode='spline' dur='2' values='65;135;65;' keySplines='.5 0 .5 1;.5 0 .5 1' repeatCount='indefinite' begin='-.4'></animate>
          </circle>
          <circle fill='#FFBD28' stroke='#FFBD28' strokeWidth='4' r='15' cx='100' cy='65'>
            <animate attributeName='cy' calcMode='spline' dur='2' values='65;135;65;' keySplines='.5 0 .5 1;.5 0 .5 1' repeatCount='indefinite' begin='-.2'></animate>
          </circle>
          <circle fill='#FFBD28' stroke='#FFBD28' strokeWidth='4' r='15' cx='160' cy='65'>
            <animate attributeName='cy' calcMode='spline' dur='2' values='65;135;65;' keySplines='.5 0 .5 1;.5 0 .5 1' repeatCount='indefinite' begin='0'></animate>
          </circle>
        </svg>
      </div>
    </div>
  );
};
