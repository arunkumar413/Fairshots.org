import { CLOUDINARY_API, FAIRSHOTS_API } from "./constants";

export function uploadPhoto(userType, id, token, url) {
    return async dispatch => {
        try {
            const config = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `bearer ${token}`
                },
                body: JSON.stringify({ photos: [{ [`${userType}Id`]: id, cloudlink: url }] })
            };
            console.log(config);
            const res = await fetch(`${FAIRSHOTS_API}api/${userType}/${id}/photos`, config);
            if (res.ok) {
                const ret = await res.json();
                console.log(ret);
                dispatch({
                    type: userType === "project" ? "PHOTO_UPLOADED" : "PROFILE_PHOTO_UPLOADED",
                    payload: ret
                });
            } else throw await res.text();
        } catch (e) {
            console.log(e);
            dispatch({
                type: userType === "project" ? "PROJECT_ERROR" : "UPLOAD_ERROR",
                payload: e
            });
        }
    };
}

export async function sendPhotoGetUrl(file, upreset = "kahvrgme") {
    try {
        const fd = new FormData(); // need to improve this
        fd.append("file", file);
        fd.append("upload_preset", upreset);
        const imgUp = await fetch(`${CLOUDINARY_API}/upload`, {
            method: "POST",
            body: fd
        });
        const imgRes = await imgUp.json();
        console.log(imgRes);
        return imgRes;
    } catch (e) {
        throw e;
    }
}

export function delPhoto(userType, id, token, photoItem) {
    return async dispatch => {
        try {
            const config = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `bearer ${token}`
                },
                body: JSON.stringify({ photoIds: [photoItem.id] })
            };
            const res = await fetch(`${FAIRSHOTS_API}api/${userType}/${id}/photos`, config);
            if (res.ok) {
                const ret = await res.json();
                console.log(ret);
                dispatch({
                    type: userType === "project" ? "PHOTO_DELETED" : "PROFILE_PHOTO_DELETED",
                    payload: photoItem
                });
            } else throw await res.text();
        } catch (e) {
            dispatch({
                type: userType === "project" ? "PROJECT_ERROR" : "UPLOAD_ERROR",
                payload: e
            });
        }
    };
}
