
/* export const init = (listWidth: number, itemWidth: number, itemsLength: number) => {

    calcNumberOfActiveItems(listWidth, itemWidth, 0, 0, itemsLength);

};

export const onPointerMove = (listWidth: number, itemWidth: number, translateX: number, numberOfActiveItems: number, itemsLength: number) => {

    calcNumberOfActiveItems(listWidth, itemWidth, translateX, numberOfActiveItems, itemsLength);
};

export const onPointerUp = (listWidth: number, itemWidth: number, translateX: number, numberOfActiveItems: number, itemsLength: number) => {

    calcNumberOfActiveItems(listWidth, itemWidth, translateX, numberOfActiveItems, itemsLength);

}; */

export const calcNumberOfActiveItems = (
    listWidth: number, 
    itemWidth: number, 
    translateX: number, 
    numberOfActiveItems: number, 
    itemsLength: number): number => {

    //console.log("calcNumberOfActiveItems", translateX, itemWidth, listWidth);
    if(numberOfActiveItems >= itemsLength) return numberOfActiveItems;

    const newNumberOfActiveItems = Math.ceil((listWidth + Math.abs(translateX)) / itemWidth);

    return newNumberOfActiveItems <= numberOfActiveItems ? numberOfActiveItems : newNumberOfActiveItems;

};