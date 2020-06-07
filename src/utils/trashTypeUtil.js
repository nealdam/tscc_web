import TrashTypeGroup from "../molecule/trashTypeGroup/TrashTypeGroup";
import React from 'react'


export const getTrashTypeName = (type) => {
    if (type === "ORGANIC") {
        return "Hữu cơ";
    } else if (type === "RECYCLE") {
        return "Tái chế";
    } else {
        return "Loại khác";
    }
}

export const getTrashTypeGroup = (trashArea, isText) => {
    let isOrganic = false;
    let isRecycle = false;
    let isOther = false;

    if (trashArea.type.name === "ORGANIC") {
        isOrganic = true;
    } else if (trashArea.type.name === "RECYCLE") {
        isRecycle = true;
    } else {
        isOther = true;
    }

    trashArea.lTrashForms.forEach(trashForm => {
        if (trashForm.trashType.name === "ORGANIC") {
            isOrganic = true;
        } else if (trashForm.trashType.name === "RECYCLE") {
            isRecycle = true;
        } else {
            isOther = true;
        }
    });

    if (isText) {
        let text = "";
        if (isOrganic) {
            text = text + "Hữu cơ, ";
        }
        if (isRecycle) {
            text = text + "Tái chế, ";
        }
        if (isOther) {
            text = text + "Loại khác";
        }

        if (text.endsWith(", ")) {
            text.substr(0, text.length - 2);
        }

        return text
    }

    return (
        <TrashTypeGroup
            isOrganic={isOrganic}
            isRecycle={isRecycle}
            isOther={isOther}
        />
    )
}