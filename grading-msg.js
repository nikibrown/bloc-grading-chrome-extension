const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);
const getGraderSignature = (graderName) => `\nThanks, ${graderName && `__${graderName}__`}`;
const separator = `\n\n***\n`;

// const port = chrome.runtime.connect();

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.action === 'REFRESH_MESSAGE'){
      updateMessage();
    }
})

const updateMessage = () => {

// Populate grader options.
// Pass null to get all store
  chrome.storage.sync.get(null, (data) => {
    const graderName = data.graderName || '';
    const devGrader = data.graderType === 'dev-grader';
    const designGrader = data.graderType === 'design-grader';
    const isBlocGrading = data.gradingPlatform === 'bloc-platform';
    const isThinkfulGrading= data.gradingPlatform === 'thinkful-platform';
    const isBlocWebsite = window.location.href.includes('bloc');
    const isThinkfulWebsite = window.location.href.includes('thinkful');

    const blocDevGraderMessage = studentName =>
      `${getIntroText(graderName, studentName)}${separator}If anything here that I’ve mentioned is unclear, please don’t hesitate to [reach out for help via Slack.](http://bit.ly/bloc-grading-unstuck) \n\nWant to learn more? Check out our [group sessions & QA resources page](http://bit.ly/gs-g-home) with hours of recorded video and live sessions.\n ${getGraderSignature(graderName)}`;

    // Use the customized intro message if there's one, otherwise the default.
    const getIntroText = (graderName, studentName) => {
      const customIntro = data.introMessage && data.introMessage
        .replace(/\${studentName}/g, studentName)
        .replace(/\${graderName}/g, graderName);

      return customIntro ? `${customIntro}\n\n` : `Hi ${studentName}! ${graderName && `${graderName} from the grading team here!`}\n\n`;
    };

    if (isBlocWebsite) {
      // grab the HTML element that has the students name in it
      const studentNameContainer = document.getElementsByClassName('mentor-review-header');

      // get the text
      const studentNameSentence = studentNameContainer[0].innerText;
      // split the text
      const splitString = studentNameSentence.split(' ');

      // grab the name!
      const studentName = capitalizeFirstLetter(splitString[2]);

      // get textzarea
      const submissionTextarea = document.getElementById('comment-box');

      if (submissionTextarea) {
        // set value of text area with student name
        submissionTextarea.value = blocDevGraderMessage(studentName);
      }
    } else if (isThinkfulWebsite) {
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

        // Dev and Designer messages for thinkful, each its different
        const thinkfulDevMessage = `${getIntroText(graderName, studentName)}${contentInTextArea}${separator}If anything here that I’ve mentioned is unclear, please don’t hesitate to join an Q&A session for technical assistance via [Slack](http://bit.ly/tf-dev-grading-help). If it’s a question about the feedback, feel free to resubmit with a question and the grading team will get back to you as quickly as possible. \n\nWant to learn more? Check out our [group sessions & QA resources page](http://bit.ly/gs-g-home) with hours of recorded video and live sessions.\n ${getGraderSignature(graderName)}`;

        const thinkfulDesignMessage = `${getIntroText(graderName, studentName)}${contentInTextArea}${separator}If anything here that I’ve mentioned is unclear, please don’t hesitate to reach out for technical assistance via Slack in the [#product-design channel](http://bit.ly/td-pdf-grading-help). If it’s a question about the feedback, feel free to resubmit with a question.\n\nWant to learn more? Check out our [group sessions & QA resources page](http://bit.ly/gs-g-home) with hours of recorded video and live sessions.\n ${getGraderSignature(graderName)}`;

        if(isThinkfulGrading) {
          if (devGrader) {
            submissionTextarea.value = thinkfulDevMessage;
          } else if (designGrader) {
            submissionTextarea.value = thinkfulDesignMessage;
          } else {
            submissionTextarea.value = 'Please select your grader type in the extension options';
          }
        } else if(isBlocGrading){
          submissionTextarea.value = blocDevGraderMessage(studentName);
        }
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
}

window.onload = function () {
  updateMessage();
};
