# Prayer timetable

Muslim prayer timetable app for deployment on Raspberry Pi (or similar). It is meant to be used on public displays to show your local community's prayer times. Can be used in masjids, mosques or even home. Optimised for Full HD screens. 

It uses React for frontend rendering and momentjs for time manipulation. Please note that this is at alpha stage and built specifically for my own needs.

This software is provided as-is, with no warranty of any kind. I provide it for free and do not expect and ask for any compensation. What's more, I will help you setup your own presentation screen and even install for free, but you will cover the postal bills in case you send me your own Raspberry Pi for setup.

Instructions on full deployment coming some time.

## Quick Start

### Standalone app:

    git clone https://github.com/ench0/prayer-timetable-react
    (modify to your own needs)
    yarn build

### Note
    This app should be used in conjuction with your own API from the website etc. For standalone app with vanilla JS and authentication, check prayer-timetable npm package.

## Features
* Prayer times
* Jamaah times
* Jamaah calculation offsets/methods
* Automatic refresh of frontend after backend/admin update
* Next prayer countdown
* Jummuah notification
* Themes (coming soon)
* Announcements/messages
* Mobile view/app (coming soon)
* Hijri dates
* Hijri offset
* Next day starts after isha iqamah

## How can you help
The timetable app currently specifically targets my own mosque. If you like your city/language to be included, please contact me and send your own timetable. Use examples from other city to figure out the JSON format. You are responsible for accuracy of the data.

## Tools and libraries used
* NodeJS
* Moment JS, Moment Timezone, Moment Hijri
* OpenSans fonts
* Changa fonts
* Freepik images for backgrounds (soon)

## Screenshots

Frontend             |  Admin area
:-------------------------:
![Frontend](public/screenshots/screenshot1.png)