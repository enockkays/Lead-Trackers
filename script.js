// HINTS:
// localStorage.setItem("myLeads", "www.quick.com")
// let name = localStorage.getItem("myLeads")
// console.log(name)
// localStorage.clear()

// console.log(leadsFromLocalStorage)

let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const deleteBtn = document.getElementById("delete-btn")
const ulEl = document.getElementById("ul-el")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
const saveBtn = document.getElementById("save-btn")



if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

saveBtn.addEventListener("click", function () {
    chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })

})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        //listItems += "<li><a target='_blank' href='" + myLeads[i] + "'>" + myLeads[i] + "</a></li>"
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'> 
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

inputBtn.addEventListener("click", function() {
    myLeads.push( inputEl.value );
    inputEl.value = ""
    // Convert an array into a string
    // Save the leads array to local storage
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
})

deleteBtn.addEventListener('dblclick', function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})
