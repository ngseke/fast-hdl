var getSelectedTab = (tab) => {
  var tabId = tab.id;
  var sendMessage = (messageObj) => chrome.tabs.sendMessage(tabId, messageObj)
  
  const $fields = [...document.querySelectorAll('input')]
 
  $fields.forEach(el => {
    const name = el.getAttribute('name')
    
    chrome.storage.sync.get(name, value => el.value = value[name] || '')
    
    el.addEventListener('change', ({ target }) => {
      chrome.storage.sync.set({ [target.getAttribute('name')]: target.value.trim() })
    })
  })
  
  sendMessage(tabId)
}
chrome.tabs.getSelected(null, getSelectedTab)