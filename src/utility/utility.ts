
export const calcIncreasedIndex = (index: number, itemsLength: number) => {

    return index < itemsLength - 1 ? index + 1 : index;

};

export const calcDecreasedIndex = (index: number) => {

    return index > 0 ? index - 1 : index;

};