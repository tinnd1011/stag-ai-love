import IconCreate from "./create";
import IconEarn from "./earn";
import IconMyDapps from "./my-dapps";
import IconStake from "./stake";
import IconStore from "./store";

export const IconItem = ({
  index,
  isActive,
}: {
  index: number;
  isActive: boolean;
}) => {
  const ICONS = {
    0: <IconStore isActive={isActive} />,
    1: <IconEarn isActive={isActive} />,
    2: <IconCreate isActive={isActive} />,
    3: <IconMyDapps isActive={isActive} />,
    4: <IconStake isActive={isActive} />,
  };

  return <>{ICONS[index as keyof typeof ICONS]}</>;
};
