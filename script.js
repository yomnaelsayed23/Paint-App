
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
toolBtns = document.querySelectorAll(".tool")
fillColor = document.querySelector("#fill-color")
sizeSlider = document.querySelector("#size-slider")
colorBtns = document.querySelectorAll(".colors .option")
colorPicker = document.querySelector("#color-picker")
clearCanvas = document.querySelector(".clear-canvas")


// global variables with defult values 
let prevMouseX ,prevMouseY,
isDrowing = false,
brushWidth = 5,
selectedTool = "brush",
selectedColor = "#000";


const setCanvasBackground = () => {
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width , canvas.height);
    ctx.fillStyle = selectedColor;
}

window.addEventListener("load", () => {

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    setCanvasBackground()
});

// drawing regtangle 
const drawrect = (e) => {
    if (!fillColor.checked){
        return  ctx.strokeRect(e.offsetX, e.offsetY ,prevMouseX - e.offsetX , prevMouseY - e.offsetY);

    }else{
        return  ctx.fillRect(e.offsetX, e.offsetY ,prevMouseX - e.offsetX , prevMouseY - e.offsetY);

    }
}
// drawing circle 
const drawCircle = (e) => {
    ctx.beginPath();
    let radius = Math.sqrt(Math.pow((prevMouseX - e.offsetX), 2) + Math.pow((prevMouseY - e.offsetY), 2));
    ctx.arc(prevMouseX,prevMouseY, radius, 0 , 2 * Math.PI)
    fillColor.checked ? ctx.fill() :ctx.stroke();
    
} 

// draw Triangle
const drawTriangle = (e) => {
    ctx.beginPath();
    ctx.moveTo(prevMouseX, prevMouseY);
    // ctx.moveTo(prevMouseX, prevMouseY);
    ctx.moveTo(prevMouseX, prevMouseY);

    ctx.lineTo(e.offsetX, e.offsetY)
    ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY);

    ctx.closePath();
    fillColor.checked ? ctx.fill() :ctx.stroke();

    
}
// start drawing 
const startDraw = (e) =>{
    isDrowing = true;
    prevMouseX = e.offsetX;
    prevMouseY = e.offsetY;
    ctx.beginPath();
    ctx.lineWidth = brushWidth;
    ctx.strokeStyle = selectedColor;
    ctx.fillStyle = selectedColor;
    snapshot = ctx.getImageData(0, 0, canvas.width,canvas.height);
}

// drawing 
const drawing = (e) => {
    if(!isDrowing) return;
    ctx.putImageData(snapshot, 0, 0)


    if (selectedTool === "brush" || selectedTool === "eraser")
    {
        ctx.strokeStyle = selectedTool === "eraser" ? "#fff" : selectedColor
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    }else if(selectedTool === "regtangle"){
       drawrect(e);
    }else if(selectedTool === "circle"){
       drawCircle(e)
    }else{
        drawTriangle(e);
    }
}
toolBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".options .active").classList.remove("active");
        btn.classList.add("active")
        selectedTool = btn.id
        console.log(selectedTool)
    })
    
});

sizeSlider.addEventListener("change", () => brushWidth = sizeSlider.value)

colorBtns.forEach(btn => {
    btn.addEventListener("click", () =>{
        document.querySelector(".options .selected").classList.remove("selected");
        btn.classList.add("selected")
    selectedColor = window.getComputedStyle(btn).getPropertyValue("background-color");
    })
});


colorPicker.addEventListener("change", () => {
    colorPicker.parentElement.style.background = colorPicker.value;
    colorPicker.parentElement.click();
})

clearCanvas.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
})

canvas.addEventListener("mousedown", startDraw)
canvas.addEventListener("mousemove", drawing )
canvas.addEventListener("mouseup", () => {isDrowing = false} )

