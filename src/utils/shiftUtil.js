export const isOnShift = (shift) => {
    const today = new Date();
    const timeNow = today.getHours();

    console.log("Shift: " + shift);

    if (shift === "ONE" && timeNow > 6 && timeNow < 14) {
        return true;
    } else if (shift === "TWO" && timeNow > 15 && timeNow < 23) {
        return true;
    }

    return false;
}