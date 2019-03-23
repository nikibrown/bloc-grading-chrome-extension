function saveUserData() {
  let optionButtons = document.getElementsByClassName('grader-type');
  for (let button of optionButtons) {
    button.addEventListener('click', (e) => {
      chrome.storage.sync.set({ graderType: e.target.id });
      document.getElementById('grader-type-is').innerText = `Grader type is: ${e.target.id}`
    });
  }

  const graderName = document.getElementById('grader-name');
  graderName.addEventListener('input', (e) => {
    chrome.storage.sync.set({ graderName: e.target.value });
    console.log(e.target.value);
  });
}

function populateUserData() {
  chrome.storage.sync.get('graderName', (data) => {
    document.getElementById('grader-name').value = data && data.graderName || '';
  });
  chrome.storage.sync.get('graderType', (data) => {
    document.getElementById('grader-type-is').innerText = `Grader type is: "${data.graderType.replace('-', ' ')}"`
  });
}

populateUserData();
saveUserData();
