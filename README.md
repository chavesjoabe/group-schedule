# group-schedule

## Simple test to automate church music group schedule for current month

the actual script get all days that a group participant is available and set the group by participant role
#### Activities
- [x] Get all participants available dates;
- [x] Make an script that create group with availability of every participant;
- [x] Make the script read the participant bonds (wife, child, etc);
- [x] Make the script read if the participant is in the last group and, if yes, select another participant;
- [x] Use github actions to run all unit tests in every push;
- [ ] Create a database that get the participant availability based on week days and not month day;
    - this item can be a json file in the first moment, and after can be a document in MongoDB
- [ ] Based on participant availability, expose an endpoint that create the group for current month;
- [ ] Create an endpoint that create a xlsx table with month availability;
