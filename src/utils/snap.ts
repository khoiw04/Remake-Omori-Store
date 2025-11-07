export const snap = (value: number, length: number, fix: number) => {
    const step = 100 / length;
    let index = Math.round(value / step);

    const isMovingLeft = value + fix > index * step;
    
    if (isMovingLeft) {
        // Up
        index = Math.ceil(index / length) * length;
    } else {
        // Down
        index = Math.floor(index / length) * length;
    }

    return index * step;
};

export const snap100 = (value: number, length: number) => {
    const step = 100 / length;
    const index = Math.round(value / step);
    return index * step;

    // this function only works on [0% - 100%]
};

// export const snap = (value: number, length: number, fix = 20 ,threshold = 20) => {
//     const step = 100 / length;
//     let index = Math.round(value / step);
//     const delta = Math.abs(value - index * step);

//     if (delta < threshold) {
//         const isMovingLeft = value + fix > index * step;
        
//         if (isMovingLeft) {
//             // Up
//             index = Math.ceil(index / 3) * 3;
//         } else {
//             // Down
//             index = Math.floor(index / 3) * 3;
//         }
    
//         return index * step;
//     }
    
//     return value // No round
// };