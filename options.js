const formatGradingText = (type) => `"${type && type.replace('-', ' ')}"`;
const refreshMessage = () => {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {action: 'REFRESH_MESSAGE'});
  });
};

function saveGraderData() {
  const optionButtons = document.getElementsByClassName('grader-type');
  for (let button of optionButtons) {
    button.addEventListener('click', (e) => {
      chrome.storage.sync.set({ graderType: e.target.id });
      document.getElementById('grader-type-is').innerText = `Grader type is: ${formatGradingText(e.target.id)}`;

      refreshMessage();
    });
  }

  const platformButtons = document.getElementsByClassName('grading-platform');
  for (let button of platformButtons) {
    button.addEventListener('click', (e) => {
      chrome.storage.sync.set({ gradingPlatform: e.target.id });
      document.getElementById('platform-grading').innerText = `You're grading: ${formatGradingText(e.target.id)}`;

      refreshMessage();
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
    document.getElementById('grader-type-is').innerText = `Grader type is: ${formatGradingText(data.graderType)}`;
    document.getElementById('platform-grading').innerText = `You're grading: ${formatGradingText(data.gradingPlatform)}`;
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
