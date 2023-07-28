const defaultChkList = ['lorem 1','lorem 2','lorem 3','lorem 4','lorem 5','lorem 6']
const feeling = document.getElementById('feeling')
const submit = document.getElementById('submit')
const logData = {}

defaultChkList.forEach((ele) => {
    const listContainer = document.getElementById('chkList')
    const listItem = document.createElement('li')
    listItem.innerHTML = ele
    listContainer.appendChild(listItem)
})

submit.addEventListener('click',(e) =>{
    if (feeling.value === '') {
        feeling.innerHTML = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos nobis temporibus repellat voluptate odit nihil atque totam, eaque cupiditate dolorem.'
    } else {
        return feeling.value
    }
})



const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(logData)
  };
  
fetch('/api', options);