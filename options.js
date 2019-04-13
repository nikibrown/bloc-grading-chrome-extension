const refreshMessage = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'REFRESH_MESSAGE' });
  });
};

const toggleGraderTypeWrapper = (gradingPlatform) => {
  if (gradingPlatform === 'thinkful-platform') {
    document.getElementById('grading-type-wrapper').style.display = 'block';
  } else {
    document.getElementById('grading-type-wrapper').style.display = 'none';
  }
};

// Adds and removes the "active" class from the buttons smartly.
const toggleActiveButtons = (elementTarget) => {
  elementTarget.classList.add('active');

  switch (elementTarget.id) {
    case 'thinkful-platform':
      document.getElementById('bloc-platform').classList.remove('active');
      break;
    case 'bloc-platform':
      document.getElementById('thinkful-platform').classList.remove('active');
      break;
    case 'dev-grader':
      document.getElementById('design-grader').classList.remove('active');
      break;
    case 'design-grader':
      document.getElementById('dev-grader').classList.remove('active');
      break;
  }
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

  const platformButtons = document.getElementsByClassName('grading-platform');
  for (let button of platformButtons) {
    button.addEventListener('click', (e) => {
      chrome.storage.sync.set({ gradingPlatform: e.target.id });

      toggleGraderTypeWrapper(e.target.id);
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

    toggleActiveButtons(document.getElementById(data.graderType));
    toggleActiveButtons(document.getElementById(data.gradingPlatform));
    toggleGraderTypeWrapper(data.gradingPlatform);
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
