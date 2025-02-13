const screenSizeButton = document.getElementById("screen-size-btn");

function showScreenSize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    alert(`Текущий размер экрана:\nШирина: ${width}px\nВысота: ${height}px`);
}

screenSizeButton.addEventListener("click", showScreenSize);