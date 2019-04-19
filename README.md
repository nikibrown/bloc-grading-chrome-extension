## Bloc / Thinkful Grading Chrome Extension

Chrome extension for Bloc graders to auto fill with default grading message and students name.

### Video walk through

[http://nikib.ro/wn/screenshots/grading-chrome-ext-howto.mp4](http://nikib.ro/wn/screenshots/grading-chrome-ext-howto.mp4)

- Bloc: Only works when `#submission` is at the end of URL (or textarea is visible on the page): 
[https://www.bloc.io/users/nick-noel/checkpoints/2017#submission](https://www.bloc.io/users/nick-noel/checkpoints/2017#submission) (ie you are clicking on a link from the grading spreadsheet)
- Thinkful: Only works when the url it's from `lark.thinkful.com/grading/`

### Installation instructions

- Download or clone this repo
- In Chrome go to [chrome://extensions/](chrome://extensions/)
- Turn on developer mode
- ![developer mode](http://nikib.ro/wn/screenshots/Extensions_2018-04-09_08-05-18.jpg)
- Click on `load unpacked` and browse to the extension files that you cloned or downloaded
- Thats it!
- To refresh the page (when you pull from the repo or make changes) you can click on the refresh 
icon.

### Usage

- Open the options by clicking on the chrome extension icon.
- Enter your name and the program you're grading.
![extension options](https://t.gyazo.com/teams/leovegas/7753d89a481ac07be48a342f8d060219.png)
- Go to any submission that you've claimed from the grading queue and the snippet will be added
 on page load. It will automatically adapt to the program you selected.
- Changing the program while grading will automatically re-populate the text field, this is 
useful to avoid refreshing the page, but be careful as it will override anything you wrote before.
- You can also customize the intro message from the default to your own.
