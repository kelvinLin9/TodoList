const txt = document.querySelector('.text')
const list = document.querySelector('.list')
const tab = document.querySelector('.tab')
const tabs = document.querySelectorAll('.tab li')
const btnAdd = document.querySelector('.btn_add')
const btnClear = document.querySelector('.btn_clear')
const todoLength = document.querySelector('.todoLength')
data = []
showData = []
state = 'all'

// 新增
btnAdd.addEventListener('click', addTodo)
txt.addEventListener('keyup', (e) => {
  if (e.key == 'Enter'){
    addTodo()
  }
})
function addTodo() {
  if (txt.value.trim() === ''){
    alert('請輸入代辦事項')
    return
  }
  obj = {
    value: txt.value,
    id: new Date().getTime(),
    checked: ''
  }
  data.push(obj)
  txt.value = ''
  toggle()
}

// 渲染
function renderData(updateData) {
  let str = ''
  let count = 0
  if (updateData){
    showData = updateData
  } else{
    showData = data
  }
  data.forEach((i) => {
    if (i.checked == ''){
      count ++
    }
  })
  showData.forEach((i) => {
    str += `
      <li>
        <label class="checkbox" for="">
          <input type="checkbox" ${i.checked} data-id="${i.id}"/>
          <span>${i.value}</span>
        </label>
        <a href="#" class="edit">
          <i class="fa-solid fa-pen" data-id="${i.id}"></i>
        </a>
        <a href="#" class="delete">
          <i class="fa-solid fa-trash" data-id="${i.id}"></i>
        </a>
      </li>
    `
  })
  list.innerHTML = str
  todoLength.innerHTML = count
}

// 切換待辦是否完成&編輯&刪除
list.addEventListener('click', (e) => {
  // 如果只有a標籤裡面有data-id屬性，點input區塊就拿不到屬性值
  let id = e.target.getAttribute('data-id')
  if(e.target.classList.value == 'fa-solid fa-trash') {
    data = data.filter(i => i.id != id)
  }else if (e.target.classList.value == 'fa-solid fa-pen') {
    newValue = prompt('編輯吧!少年!!')
    data.forEach((item,index) => {
      if (item.id == id) {
        data[index].value = newValue
      }
    })
  }else if(e.target.nodeName == 'INPUT') {
    data.forEach((item,index) => {
      if (item.id == id) {
        if(data[index].checked == ''){
          data[index].checked = 'checked'
        } else if(data[index].checked == 'checked') {
          data[index].checked = ''
        }
      }
    })
  }
  toggle()
})

// 刪除已完成
btnClear.addEventListener('click', () =>{
  data = data.filter(i => i.checked == '')
  renderData()
})

// tab切換
tab.addEventListener('click', (e) =>{
  tabs.forEach((i) => {
    i.classList.remove('active')
  })
  e.target.classList.add('active')
  state = e.target.getAttribute('data-tab')
  toggle()
})

function toggle() {
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

