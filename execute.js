const fieldNames = [
  { name: 'name', keyword: '姓名' },
  { name: 'line', keyword: 'Line' },
  { name: 'mobile', keyword: '手' },
  { name: 'email', keyword: '信' },
]


window.addEventListener('DOMContentLoaded', execute)

function isLau () {
  const keywords = ["\u6d77\u5e95", "\u795e\u79d8"]
  return keywords.every(_ => document.body.textContent.includes(_))
}

function execute () {
  if (!isLau()) return
  
  console.log("🍲 %c\u6488\u6488\u586b\u904b\u4f5c\u4e2d...", 'color: #e63946')
  
  fieldNames.forEach(({ name, keyword }) => {
    const input = findInput(keyword)
    if (!input) return
    chrome.storage.sync.get(name, value => {
      input.value = value[name] || ''
      input.dispatchEvent(new Event('input', { bubbles: true }))
    })
  })
  
  setTimeout(() => {
    window.scrollTo(0, 999999)
    setTimeout(() => openSelect(), 150)
  }, 100)
}

function findInput (searchText) {
  let tags = document.querySelectorAll(".freebirdFormviewerComponentsQuestionBaseRoot")
  let found

  for (let i = 0; i < tags.length; i++) {
    if (tags[i].textContent.includes(searchText)) {
      found = tags[i];
      break;
    }
  }
  if (!found) return
  return found.querySelector('input')
}
 
 
function openSelect () {
  document.querySelector('[role="listbox"] > [role="presentation"]')
    .dispatchEvent(new Event('click', { bubbles: true }))
}