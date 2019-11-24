import React from "react";
import classes from "./CategoryShowcase.module.scss";
import iconsHref from "../../static/icons/ICONS.svg";
import Button from "../UI/Button/Button";

export type Condition = {
  label: string;
  hrefId: string;
};

interface CategoryShowcaseProps {
  title: string;
  conditions: Condition[];
  orderButtonClick: (event: any) => void | undefined;
  isCalcButton: boolean;
  calcButtonClick: ((event: any) => void | undefined) | undefined;
}

const CategoryShowcase = ({
  title,
  conditions,
  orderButtonClick,
  isCalcButton = false,
  calcButtonClick = undefined
}: CategoryShowcaseProps) => {
  const conditionElements = conditions.map((value, index) => {
    return (
      <li key={classes.Condition + index} className={classes.Condition}>
        <svg
          className={classes.Svg}
          width={"10"}
          height={"10"}
          viewBox={"0 0 1024 1024"}
        >
          <use xlinkHref={iconsHref + value.hrefId} />
        </svg>
        <p className={classes.Paragraph}>{value.label}</p>
      </li>
    );
  });

  return (
    <div className={classes.CategoryShowcase}>
      <div className={classes.Wrapper}>
        <h3 className={classes.Title}>{title}</h3>

        <ul className={classes.Conditions}>{conditionElements}</ul>

        <div className={classes.Buttons}>
          <Button
            label={"Заказать"}
            type={"OUTLINED"}
            onClick={orderButtonClick}
          />

          {isCalcButton && (
            <Button
              label={"Рассчитать стоимость"}
              type={"OUTLINED"}
              onClick={calcButtonClick}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryShowcase;
