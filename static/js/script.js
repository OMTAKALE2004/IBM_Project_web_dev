console.log("hie")


// console.log((JSON.stringify(data)))
// console.log(data1)
dataDate = new Date(data)
// console.log("cactual:",dataDate)
data = JSON.stringify(data)
let startYear = dataDate.getFullYear()
// console.log("year:",startYear)
let startMonth = dataDate.getMonth()
let startDate = dataDate.getDate()
// console.log("month",startMonth)
// console.log("dat:",startDate)
let periodLength =data1-'0';
let remainCurrHighlightDays = 0;
let interval = 0;
let remainNextHighlightDays = 0;
// console.log("per",periodLength)
// console.log("satr:",startMonth)
const daysTag = document.querySelector(".days"),
currentDate = document.querySelector(".current-date"),
prevNextIcon = document.querySelectorAll(".icons span");


let form = document.querySelector('form')





let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();
// console.log(date,currMonth,currYear)

const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];

const renderCalendar = (interval  = 0) => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), 
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); 
    let liTag = "";
    
    let highData = new Date(startYear,startMonth,startDate + (27*interval))
    // console.log("intre: ",interval)
    let nextHighData = new Date(startYear,startMonth,startDate + (27*(interval+1)))
    let highDate = highData.getDate(),
    highMonth = highData.getMonth(),
    highYear = highData.getFullYear();
    let nextHighDate = nextHighData.getDate(),
    nextHighMonth = nextHighData.getMonth(),
    nextHighYear = nextHighData.getFullYear();
    // console.log("high: ",highData)
    // console.log("nextne: ",nextHighData)
    let highlightDate = false;
    let currHighlight = false;
    // console.log(firstDayofMonth,lastDateofMonth,lastDateofLastMonth)
    for (let i = firstDayofMonth; i > 0; i--) { 
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }
    // let formula = prevStartDate+28-1
    // let nextNextHighlightDate = formula>lastDateofMonth?formula-lastDateofMonth:formula;
    // console.log("nexnenx:",nextNextHighlightDate)
    // console.log("chigh date" ,highDate)
    for (let i = 1; i <= lastDateofMonth; i++) { 
        
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() 
                     && currYear === new Date().getFullYear() ? "active" : "";
        
        if(currYear==highYear && (currMonth==highMonth) && i>=highDate && i <= highDate+periodLength-1){
            highlightDate = "nextHighlight";
        }
        else{
            highlightDate = false;
        }
        if(currYear==highYear && currMonth-1 == highMonth  && (lastDateofLastMonth - highDate +1)+i<=periodLength){
            highlightDate = "nextHighlight";
        }
        if(currYear==startYear && currMonth==startMonth && i>=startDate && i <= startDate+periodLength-1){
            
            currHighlight = "currHighlight";
        }else{
            currHighlight = false;

        }
        if(currYear==startYear && currMonth==startMonth && i<periodLength && startDate+i>lastDateofMonth){
            remainCurrHighlightDays++;
        }
        if(remainCurrHighlightDays && (currMonth-1)==startMonth){
            
            currHighlight = "currHighlight";
            remainCurrHighlightDays--;
        }
        if(currYear==nextHighYear && currMonth==nextHighMonth && i>=nextHighDate && i <= nextHighDate+periodLength-1){
            highlightDate = "nextHighlight"
        }

        liTag += `<li class="${isToday?isToday:currHighlight?currHighlight:highlightDate?highlightDate:isToday}">${i}</li>`;
        currHighlight = false;
        highlightDate = false;
    }

    for (let i = lastDayofMonth; i < 6; i++) { 
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
    }
    currentDate.innerText = `${months[currMonth]} ${currYear}`; 
    daysTag.innerHTML = liTag;
}
renderCalendar();

prevNextIcon.forEach(icon => { 
    icon.addEventListener("click", () => { 

        if(icon.id === "prev"){
            interval--;
        }else{
            interval++;
        }
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
        
        if(currMonth < 0 || currMonth > 11) { 
            
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear(); 
            currMonth = date.getMonth(); 
        } else {
            date = new Date(); 
        }
        renderCalendar(interval);
    });
});