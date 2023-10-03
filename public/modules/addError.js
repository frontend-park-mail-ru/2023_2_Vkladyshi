export function returnError(string) {
    removeErrorNodes();

    const errorElement = document.querySelector('.errorString');
    errorElement.style.display = "block";
    errorElement.textContent = string;
}

function removeErrorNodes() {
    const errorElement = document.querySelector('.errorString');
    errorElement.textContent = "";

}
