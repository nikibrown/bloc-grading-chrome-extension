// This block needs to be before the window,onload as the chrome storage it's async.
let graderName = '';
let devGrader = false;
let designGrader = false;

// Populate grader options
chrome.storage.sync.get('graderName', (data) => graderName = data.graderName);
chrome.storage.sync.get('graderType', (data) => devGrader = data.graderType === 'dev-grader');
chrome.storage.sync.get('graderType', (data) => designGrader = data.graderType === 'design-grader');

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);
const getGraderSignature = () => `\n\nThanks, ${graderName && `**${graderName}**`}\n\n_Grading Team Member_`;
const getIntroText = (studentName) => `Hi ${studentName}! ${graderName && `${graderName} from the grading team here!`} \n\n`;

window.onload = function () {
  const isBloc = window.location.href.includes('bloc');
  const isThinkful = window.location.href.includes('thinkful');

  if (isBloc) {
    // grab the HTML element that has the students name in it
    const studentNameContainer = document.getElementsByClassName('mentor-review-header');

    // get the text
    const studentNameSentence = studentNameContainer[0].innerText;
    // split the text
    const splitString = studentNameSentence.split(' ');

    // grab the name!
    const studentName = capitalizeFirstLetter(splitString[2]);
    const blocDevGraderMessage = `${getIntroText(studentName)}If anything here that I’ve mentioned is unclear, please don’t hesitate to [reach out for help via Slack.](https://www.bloc.io/resources/getting-unstuck) ${getGraderSignature()}`;

    // get textzarea
    const submissionTextarea = document.getElementById('comment-box');

    if (submissionTextarea) {
      // set value of text area with student name
      submissionTextarea.value = blocDevGraderMessage;
    }
  }

  if (isThinkful) {
    // get textzarea
    const submissionTextarea = document.getElementById('content');

    if (submissionTextarea) {
      // Get content in the text area as Thinkful something adds the instructions in here
      const contentInTextArea = submissionTextarea.value;
      // Ge the student's name (which doesn't have a specific class :( ).
      const fullStudentName =
        document.getElementsByClassName('submission-grader-card-top-bar')[0]
          .getElementsByTagName('a')[0]
          .innerHTML;

      // Take only the first name
      const studentName = capitalizeFirstLetter(fullStudentName.split(' ')[0]);

      // Dev and Designer messages, each its different
      const thinkfulDevMessage = `${getIntroText(studentName)}${contentInTextArea}***\nIf anything here that I’ve mentioned is unclear, please don’t hesitate to join an Q&A session for technical assistance via [Slack](https://www.thinkful.com/open-sessions/qa-sessions/). If it’s a question about the feedback, feel free to resubmit with a question and the grading team will get back to you as quickly as possible. ${getGraderSignature()}`;
      const thinkfulDesignMessage = `${getIntroText(studentName)}${contentInTextArea}***\nIf anything here that I’ve mentioned is unclear, please don’t hesitate to reach out for technical assistance via Slack in the [#product-design channel](https://thinkful.slack.com/messages/product-design/). If it’s a question about the feedback, feel free to resubmit with a question. ${getGraderSignature()}`;

      if (devGrader) {
        submissionTextarea.value = thinkfulDevMessage;
      } else if (designGrader) {
        submissionTextarea.value = thinkfulDesignMessage;
      } else {
        submissionTextarea.value = 'Please select your grader type in the extension options';
      }
    }
  }

  // rawgit.com url magic
  if (window.location.href.indexOf('rawgit') > -1) {
    const urlProdInput = document.querySelector('#url-prod');

    const urlPasted = document.querySelector('#url');

    const changeURL = function () {
      document.location.href = urlProdInput.value;
    };

    urlPasted.addEventListener('input', function () {
      // needed to use setTimeout because the prodURL does not populate right away
      setTimeout(changeURL, 200);
    });
  }

};
