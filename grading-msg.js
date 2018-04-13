window.onload = function() {
    console.log("Grading extension is running");
    // grab the HTML element that has the students name in it
    var studentNameContainer = document.getElementsByClassName('mentor-review-header');

    // get the text
    var studentNameSentence = studentNameContainer[0].innerText;
    // split the text
    var splitString = studentNameSentence.split(" ");

    // grab the name!
    var studentName = splitString[2];

    // grading message goes here
    var gradingMessage = "Hi " + studentName + "! \n\nNiki from the grading team here.\n\nIf anything here that I’ve mentioned is unclear, please don’t hesitate to [reach out for help via Slack.](https://www.bloc.io/resources/getting-unstuck) \n\nThanks, Niki";

    // get textzarea
    var submissionTextarea = document.getElementById('comment-box');

    // set value of text area with student name
    submissionTextarea.value = gradingMessage;
};
