const cleanDate = date => {
    const months = {
        '01': 'Jan',
        '02': 'Feb',
        '03': 'Mar',
        '04': 'Apr',
        '05': 'May',
        '06': 'Jun',
        '07': 'Jul',
        '08': 'Aug',
        '09': 'Sep',
        '10': 'Oct',
        '11': 'Nov',
        '12': 'Dec',
    };
    let createdDate = date.split('T')[0];
    let year = createdDate.split('-')[0];
    let modifiedArray = createdDate.split('-').splice(1);
    modifiedArray[2] = year;
    modifiedArray[0] = months[modifiedArray[0]];
    return modifiedArray.join(' ');
};

const delayLoading = (time, func, bool = false) => {
    setTimeout(() => {
        func(bool);
    }, time)
};

const capitalizeFirstLetter = word => {
    const newWord = [];
    const capitalizedLetter = word.split('')[0].toUpperCase();
    word.split('').forEach((letter, i) => newWord.push(i === 0 ? capitalizedLetter : letter));
    return newWord;
};
const checkTypedIsNumber = typed => {
    let result = true;
    if (isNaN(parseInt(typed[typed.length - 1])) && typed !== "") {
        result = false;
    };
    return result;
};

export { cleanDate, delayLoading, capitalizeFirstLetter, checkTypedIsNumber };