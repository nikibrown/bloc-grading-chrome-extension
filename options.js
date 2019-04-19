const refreshMessage = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'REFRESH_MESSAGE' });
  });
};

// Adds and removes the "active" class from the buttons smartly.
const toggleActiveButtons = (elementTarget) => {
  const selectedProgram = document.getElementsByClassName('active');

  // for loop, safer than deselecting only one.
  for (let program of selectedProgram) {
    program.classList.remove('active');
  }

  elementTarget.classList.add('active');
};

function saveGraderData() {
  const optionButtons = document.getElementsByClassName('grader-type');
  for (let button of optionButtons) {
    button.addEventListener('click', (e) => {
      chrome.storage.sync.set({ graderType: e.target.id });
      refreshMessage();
      toggleActiveButtons(e.target);
    });
  }

  const platformButtons = document.getElementsByClassName('grading-program');
  for (let button of platformButtons) {
    button.addEventListener('click', (e) => {
      chrome.storage.sync.set({ gradingProgram: e.target.id });

      refreshMessage();
      toggleActiveButtons(e.target);
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

    if (data.gradingProgram) {
      toggleActiveButtons(document.getElementById(data.gradingProgram));
    }
  });
}

function saveIntroMessage() {
  const introMessage = document.getElementById('intro-message');
  introMessage.addEventListener('input', (e) => {
    chrome.storage.sync.set({ introMessage: e.target.value });
  });
}

saveIntroMessage();
populateUserData();
saveGraderData();
