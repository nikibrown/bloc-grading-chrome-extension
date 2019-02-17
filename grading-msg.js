  window.onload = function () {
    const isBloc = window.location.href.includes('bloc');
    const isThinkful = window.location.href.includes('thinkful');
    // Your name here!
    const graderName = 'Obed';

    if (isBloc) {
      // grab the HTML element that has the students name in it
      const studentNameContainer = document.getElementsByClassName('mentor-review-header');

      // get the text
      const studentNameSentence = studentNameContainer[0].innerText;
      // split the text
      const splitString = studentNameSentence.split(' ');

      // grab the name!
      const studentName = splitString[2];

      // grading message goes here
      const gradingMessage = `Hi ${studentName}! ${graderName} from the grading team here!\n\n***\nIf anything here that I’ve mentioned is unclear, please don’t hesitate to [reach out for help via Slack.](https://www.bloc.io/resources/getting-unstuck) \n\nThanks, **${graderName}**\n\n_Granding Team Member_`;

      // get textzarea
      const submissionTextarea = document.getElementById('comment-box');

      // set value of text area with student name
      submissionTextarea.value = gradingMessage;
    }

    if (isThinkful) {
      // get textzarea
      const submissionTextarea = document.getElementById('content');
      // Get content in the text area as Thinkful something adds the instructions in here
      const contentInTextArea = submissionTextarea.value;

      if(submissionTextarea) {
        // Ge the student's name (which doesn't have a specific class :( ).
        const fullStudentName =
          document.getElementsByClassName('submission-grader-card-top-bar')[0]
            .getElementsByTagName('a')[0]
            .innerHTML;

        // Take only the first name
        const studentName = fullStudentName.split(" ")[0];
        const thinkfulSlackLink = "https://thinkful.slack.com/messages/general-discussion/";
        // grading message goes here
        const gradingMessage = `Hi ${studentName}! ${graderName} from the grading team here!\n\n${contentInTextArea}\n\n***\nIf anything here that I’ve mentioned is unclear, please don’t hesitate to [reach out for help via Slack.](${thinkfulSlackLink}) \n\nThanks, **${graderName}**\n\nGranding Team Member`;
        // set value of text area with student name
        submissionTextarea.value = gradingMessage;
      }
    }

    // rawgit.com url magic
    if (window.location.href.indexOf('rawgit') > -1) {
      console.log('rawgit js');
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
