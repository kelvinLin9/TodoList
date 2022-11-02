const todoInput = document.querySelector('.text')
const list = document.querySelector('.list')
const tab = document.querySelector('.tab')
const tabs = document.querySelectorAll('.tab li')
const btnAdd = document.querySelector('.btn_add')
const btnClear = document.querySelector('.btn_clear')
const todoLength = document.querySelector('.todoLength')
let data = []
let showData = []
let state = 'all'
let count = 0

// 新增
btnAdd.addEventListener('click', addTodo)
todoInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter'){
    addTodo()
  }
})
function addTodo() {
  if (todoInput.value.trim() === ''){
    alert('請輸入代辦事項')
    return
  }
  let obj = {
        value: todoInput.value,
        id: new Date().getTime(),
        checked: ''
  }
  data.push(obj)
  todoInput.value = ''
  filterData()
}

// 渲染
function renderData(updateData) {
  CalculateToDo()
  let str = ''
  updateData.forEach((i) => {
    str += `
      <li>
        <label class="checkbox" for="">
          <input type="checkbox" ${i.checked} data-id="${i.id}"/>
          <span>${i.value}</span>
        </label>
        <a href="#" class="edit">
          <i class="fa-solid fa-pen" data-id="${i.id}" data-method="edit"></i>
        </a>
        <a href="#" class="delete">
          <i class="fa-solid fa-trash" data-id="${i.id}" data-method="delete"></i>
        </a>
      </li>
    `
  })
  list.innerHTML = str
  todoLength.innerHTML = count
}

// 計算未完成待辦
function CalculateToDo() {
  count = 0
  data.forEach((i) => {
    if (i.checked == ''){
      count ++
    }
  })
}

// 切換待辦是否完成&編輯&刪除
list.addEventListener('click', (e) => {
  // 如果只有a標籤裡面有data-id屬性，點input區塊就拿不到屬性值
  let id = e.target.getAttribute('data-id')
  // 先判斷點到的是第幾筆待辦
  indexOfId = data.findIndex((item)=>{
    return item.id == id
  })
  console.log(indexOfId)
  if(e.target.getAttribute('data-method') === 'delete') {
    data.splice(indexOfId, 1)
  }else if (e.target.getAttribute('data-method') === 'edit') {
    newValue = prompt('編輯吧!少年!!')
    data[indexOfId].value = newValue
  }else if(e.target.nodeName === 'INPUT') {     
    if(data[indexOfId].checked === ''){
      data[indexOfId].checked = 'checked'
    } else if(data[indexOfId].checked === 'checked') {
      data[indexOfId].checked = ''
    }
  }
  filterData()
})

// 刪除已完成
btnClear.addEventListener('click', () =>{
  data = data.filter(i => i.checked === '')
  filterData()
})

// tab切換
tab.addEventListener('click', (e) =>{
  tabs.forEach((i) => {
    i.classList.remove('active')
  })
  e.target.classList.add('active')
  state = e.target.getAttribute('data-tab')
  filterData()
})

function filterData() {
  let updateData = []
  if(state === 'all'){
    updateData = data
  }else if (state === 'work'){
    updateData = data.filter(i => i.checked === '')
  } else {
    updateData = data.filter(i => i.checked === 'checked')
  }
  renderData(updateData)
}

