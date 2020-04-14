export const isToday = (someDate) => {
    const today = new Date();

    return someDate.getDate() === today.getDate() &&
        someDate.getMonth() === today.getMonth() &&
        someDate.getFullYear() === today.getFullYear()
}

export const getDayTimeText = (someDate) => {
    if (isToday(someDate)) {
        return `${someDate.getDate}/${someDate.getMonth}/${someDate.getYear}`
    }

    return someDate.toLocaleString();
}