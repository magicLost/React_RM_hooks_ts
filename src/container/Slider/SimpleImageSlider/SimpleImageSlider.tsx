import React from "react";
import classes from "./SimpleImageSlider.module.scss";
import Scroller, { GetScrollerItems } from "../../Scrollers/Scroller/Scroller";
import ImgWithLoading from "../../../component/UI/ImgWithLoading/ImgWithLoading";

interface SimpleImageSliderProps {
  photos: string[];
}

const SimpleImageSlider = ({ photos }: SimpleImageSliderProps) => {
  const getScrollerItems: GetScrollerItems = (
    itemClass,
    onItemClick,
    numberOfActiveItems,
    itemRef
  ) => {
    console.log("get scroller items");
    return photos.map((value, index: number) => {
      //console.log("get scroller items", itemRef);
      let isActive = index + 1 <= numberOfActiveItems;
      console.log("IS ACTIVE", isActive);

      return (
        <li
          key={itemClass + index}
          className={itemClass}
          ref={index === 0 ? itemRef : undefined}
          data-index={index}
        >
          <div className={classes.PhotoWrapper}>
            <ImgWithLoading
              alt={"Пример нашей работы."}
              isActive={isActive}
              src={photos[index]}
            />
          </div>
        </li>
      );
    });
  };

  return (
    <div className={classes.SimpleImageSlider}>
      <Scroller items={photos} getItems={getScrollerItems} />
    </div>
  );
};

export default SimpleImageSlider;
