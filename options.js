const getGraderType = (type) => `"${type.replace('-', ' ')}"`;

function saveGraderData() {
  let optionButtons = document.getElementsByClassName('grader-type');
  for (let button of optionButtons) {
    button.addEventListener('click', (e) => {
      chrome.storage.sync.set({ graderType: e.target.id });
      document.getElementById('grader-type-is').innerText = `Grader type is: ${getGraderType(e.target.id)}`;
    });
  }

  const graderName = document.getElementById('grader-name');
  graderName.addEventListener('input', (e) => {
    chrome.storage.sync.set({ graderName: e.target.value });
  });
}

function populateUserData() {
  chrome.storage.sync.get(null, (data) => {
    document.getElementById('grader-name').value = data && data.graderName || '';
    document.getElementById('intro-message').value = data.introMessage || '';
    document.getElementById('grader-type-is').innerText = `Grader type is: ${getGraderType(data.graderType)}`;
  });
}

function saveIntroMessage(){
  const introMessage = document.getElementById('intro-message');
  introMessage.addEventListener('input', (e) => {
    chrome.storage.sync.set({ introMessage: e.target.value });
  });
}

saveIntroMessage();
populateUserData();
saveGraderData();
