const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);
const standardFeedbackText = `
## 👍 What you did well


## ❌ Required changes to pass the assignment


## 💡 Optional changes / Ideas / Improvements


## 🛠️ Resources for further learning
`;

// Needs to be global as we want to keep the original message intact even after refreshing message
let contentInTextArea = '';

// Receive a message from options.js (the extension popup) to refreeh the message
browser.runtime.onMessage.addListener((request) => {
  if (request.action === 'REFRESH_MESSAGE') {
    updateMessage('REFRESH');
  }
});

const updateMessage = (type) => {

// Populate grader options.
// Pass null to get all store
  browser.storage.sync.get(null).then((data) => {
    const graderName = data.graderName || '';
    const gradingProgram = data.gradingProgram;

    const feedbackQuestionText = 'If it’s a question about the feedback, feel free to resubmit' +
      ' with a question and the grading team will get back to you as quickly as possible.';
    const wantToLearnMoreText = '\n\nWant to learn more? Check out our group sessions & QA' +
      ' resources page http://bit.ly/gs-g-home with hours of recorded video and live sessions.';

    const isBlocWebsite = window.location.href.includes('bloc');
    const isThinkfulWebsite = window.location.href.includes('thinkful');

    const graderSignature = `\n\nThanks,\n ${graderName && `__${graderName}__`}`;

    // Tabs here matters as its translated into HTML space.
    const createMessage = (message, studentName) =>
`${getIntroText(graderName, studentName)}
${standardFeedbackText}
\n\n
${contentInTextArea}
\n\n***\n
${message}
${graderSignature}`;

    const getProgramMessage = studentName => {
      let message = '';
      switch (gradingProgram) {
        case 'design-track':
          message = `If anything here that I’ve mentioned is unclear, please don’t hesitate to reach out for technical assistance via Slack: https://www.bloc.io/resources/getting-unstuck. ${feedbackQuestionText} ${wantToLearnMoreText}`
          break;
        case 'product-design-flex':
          message = `If anything here that I’ve mentioned is unclear, please don’t hesitate to reach out for technical assistance via Slack in the #product-design channel: https://thinkful.slack.com/messages/product-design/. ${feedbackQuestionText}`
          break;
        case 'web-development-track':
          message = `If anything here that I’ve mentioned is unclear, please don’t hesitate to reach out for technical assistance via Slack: https://www.bloc.io/resources/getting-unstuck. ${feedbackQuestionText} ${wantToLearnMoreText}`
          break;
        case 'software-development-track':
          message = `If anything here that I’ve mentioned is unclear, please don’t hesitate to reach out for technical assistance via Slack: https://www.bloc.io/resources/getting-unstuck. ${feedbackQuestionText} ${wantToLearnMoreText}`
          break;
        case 'engineering-flex':
          message = `If anything here that I’ve mentioned is unclear, please don’t hesitate to reach out for technical assistance. You can also join our scheduled Front End office hours: https://www.thinkful.com/open-sessions/qa-sessions/frontend/ If it’s a question about the feedback, feel free to resubmit with a question.\n${feedbackQuestionText}`
          break;
        case 'ei-nw':
          message = `If anything here that I’ve mentioned is unclear, please don’t hesitate to join an Q&A session for technical assistance via Slack: https://www.thinkful.com/open-sessions/qa-sessions/. \n${feedbackQuestionText}`
          break;
        case 'data-analytics':
          message = `If anything here that I’ve mentioned is unclear, please don’t hesitate to reach out for technical assistance via Slack in the #data-analytics channel: https://thinkful.slack.com/messages/data-analytics You can also join our scheduled Data Analytics office hours: https://www.thinkful.com/open-sessions/qa-sessions/data%20analytics/. \n${feedbackQuestionText}`
          break;
        case 'data-science':
          message = `If anything here that I’ve mentioned is unclear, please don’t hesitate to reach out for technical assistance via Slack in the #data-science channel: https://thinkful.slack.com/messages/data-science You can also join our scheduled Data Analytics office hours: https://www.thinkful.com/open-sessions/qa-sessions/data%20science/. \n${feedbackQuestionText}`
          break;
      }

      return (
        message
        ? createMessage(message, studentName)
        : 'Please select which program you\'re grading in the extension options'
      );

    };

    // Use the customized intro message if there's one, otherwise the default.
    const getIntroText = (graderName, studentName) => {
      const customIntro = data.introMessage && data.introMessage
        .replace(/\${studentName}/g, studentName)
        .replace(/\${graderName}/g, graderName);

      return customIntro ? `${customIntro}\n\n` : `Hi ${studentName}! ${graderName && `${graderName} from the grading team here.`}`;
    };

    if (isBlocWebsite) {
      // get textzarea
      const submissionTextarea = document.getElementById('comment-box');

      if (submissionTextarea) {
        // Find the clean up the student's first name
        const studentNameContainer = document.getElementsByClassName('mentor-review-header');
        const studentNameSentence = studentNameContainer[0].innerText.split(' ');
        const studentName = capitalizeFirstLetter(studentNameSentence[2]);

        // set value of text area with student name
        submissionTextarea.value = getProgramMessage(studentName);
      }
    } else if (isThinkfulWebsite) {
      // get textzarea
      const submissionTextarea = document.getElementById('content');

      if (submissionTextarea) {

        // Get content in the text area as Thinkful adds the grading instructions there.
        if (type === 'INITIAL') {
          contentInTextArea = submissionTextarea.value;
        }
        // Ge the student's name (which doesn't have a specific class :( ).
        const fullStudentName =
          document.getElementsByClassName('submission-grader-card-top-bar')[0]
            .getElementsByTagName('a')[0]
            .innerHTML;

        // Take only the first name
        const studentName = capitalizeFirstLetter(fullStudentName.split(' ')[0]);

        // Populate the text area with the relevant message
        submissionTextarea.value = getProgramMessage(studentName);
      }
    }
  });

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

window.onload = function () {
  updateMessage('INITIAL');
};
