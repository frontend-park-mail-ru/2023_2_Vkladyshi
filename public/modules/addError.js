export function returnError(page, string) {
    removeErrorNodes(page);

    const errorElement = document.createElement('div');
    errorElement.classList.add('error');
    errorElement.textContent = string;
    errorElement.style.color = "red"
    page.appendChild(errorElement);
}

function removeErrorNodes(page) {
    const errorNodes = page.getElementsByClassName('error');
    while (errorNodes.length > 0) {
        errorNodes[0].parentNode.removeChild(errorNodes[0]);
    }
}