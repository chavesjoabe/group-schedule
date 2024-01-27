# group-schedule

## Simple test to automate church music group schedule for current month

the actual script get all days that a group participant is available and set the group by participant role
#### Activities
- [x] Get all participants available dates;
- [x] Make an script that create group with availability of every participant;
- [x] Make the script read the participant bonds (wife, child, etc);
- [x] Make the script read if the participant is in the last group and, if yes, select another participant;
- [x] Use github actions to run all unit tests in every push;
- [x] Insert sunday night in /all-service-days endpoint;
- [x] Make the script get sunday night in the moment that gets availability;
- [x] Create a method to sort the service day ministry to don't have every time the same ministry;
- [x] Get availability based on week days;
- [ ] Create a database that get the participant availability based on week days and not month day;
    - this item can be a json file in the first moment, and after can be a document in MongoDB
- [ ] Based on participant availability, expose an endpoint that create the group for current month;
- [ ] Create method to generate XLSX file;
- [ ] Create an endpoint that create a xlsx file with month availability;
