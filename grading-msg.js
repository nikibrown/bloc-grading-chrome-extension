window.onload = function() {
    if(window.location.href.includes("bloc")) {
        console.log("Grading extension is running");
        // grab the HTML element that has the students name in it
        const studentNameContainer = document.getElementsByClassName('mentor-review-header');

        // get the text
        const studentNameSentence = studentNameContainer[0].innerText;
        // split the text
        const splitString = studentNameSentence.split(" ");

        // grab the name!
        const studentName = splitString[2];

        // Your name here!
        const graderName = "Niki";

        // grading message goes here
        const gradingMessage = `Hi ${studentName}! ${graderName} from the grading team here!\n\n***\nIf anything here that I’ve mentioned is unclear, please don’t hesitate to [reach out for help via Slack.](https://www.bloc.io/resources/getting-unstuck) \n\nThanks, ${graderName}`

        // get textzarea
        const submissionTextarea = document.getElementById('comment-box');

        // set value of text area with student name
        submissionTextarea.value = gradingMessage;
    }

    // rawgit.com url magic
    if(window.location.href.indexOf("rawgit") > -1) {
        console.log("rawgit js");
        const urlProdInput = document.querySelector("#url-prod");

        const urlPasted = document.querySelector("#url");

        const changeURL = function () {
            document.location.href = urlProdInput.value;
        }

        urlPasted.addEventListener("input", function() {
            // needed to use setTimeout because the prodURL does not populate right away
            setTimeout(changeURL, 200);
        });
    }

};
