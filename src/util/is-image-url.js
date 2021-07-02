
export const urlValidate = url => new Promise(resolve => {
    let img = new Image();
    img.src = url;
    img.onerror = img.onabort = function () {
        resolve("error");
    };
    img.onload = function () {
        resolve("success");
    };
});
