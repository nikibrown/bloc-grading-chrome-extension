## Bloc / Thinkful Grading Firefox Extension

Firefox extension for graders to auto fill with a grading signature and greeting

### Installation instructions

- Download or clone this repo (If you download the zip you will need to unzip the file)
- In Firefox go to [about:debugging](about:debugging)
- Click "Load Temporary Add-on"
- Select any of the files in the plugin directory
- You have to manually load the extension every time firefox is closed and reopened

### Usage

- Open the options by clicking on the chrome extension icon.
- Enter your name and the program you're grading.
![extension options](https://t.gyazo.com/teams/leovegas/7753d89a481ac07be48a342f8d060219.png)
- Go to any submission that you've claimed from the grading queue and the snippet will be added
 on page load. It will automatically adapt to the program you selected.
- Changing the program while grading will automatically re-populate the text field, this is 
useful to avoid refreshing the page, but be careful as it will override anything you wrote before.
- You can also customize the intro message from the default to your own.
