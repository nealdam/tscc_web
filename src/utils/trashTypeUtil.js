export const getTrashTypeName = (type) => {
    if (type === "ORGANIC") {
        return "Hữu cơ";
    } else if (type === "RECYCLE") {
        return "Tái chế";
    } else {
        return "Loại khác";
    }
}