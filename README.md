
# GravelBot
The main idea of the application is to manage and monitor GravelBots by constantly interecting with them, and to set areas to spread gravel.

Because the purpose of our project is to find a use case of autonomous robots, and the robot is currently under research and development phase, there is not available API and way for the application to connect to the robot.
For these reasons, the application has only UI at this stage.
## Tech Stack

React Native, Redux toolkit, NativeBase(UI library), Typescript




## Features

### Home screen 
<img src="https://user-images.githubusercontent.com/61379336/206435246-fd447511-304e-407a-ab4c-7d6cb4e430c1.PNG" width="240" height="520" /><br/>
You can check areas to be graveled that you set before and the locations of working robots on the clickable map. There are two buttons with the number of working or available robots, as well as two buttons with the number of graveled or ungraveled areas. <br/><br/>

### Graveled area monitoring & management
- #### Lists of areas with statuses
<img src="https://user-images.githubusercontent.com/61379336/206439729-d9893fae-9bcd-487b-b83d-1250173c1a9d.png"  width="240" height="520" />&nbsp;&nbsp;&nbsp;<img src="https://user-images.githubusercontent.com/61379336/206438864-1f9b0066-bb5f-4dfc-931b-da1300ee2c6a.png" width="240" height="520" /><br/>
There are three statuses for areas that are graveled, ungraveled, and blocked for a certain reason.<br/>
Click through the lists to see detailed information about each location, including its address, description, and when it was last graveled. 

- #### Setting new areas
<img src="https://user-images.githubusercontent.com/61379336/206438855-33beb7f8-216f-40cd-9073-f75f629632a3.png"  width="240" height="520" /><br/>
New areas can be added by clicking at least three points on the displayed map.

### Robot monitoring & management
- #### Lists of areas with statuses
<img src="https://user-images.githubusercontent.com/61379336/206442823-75078291-d62c-407a-bfba-5fba4d45cfb6.png"  width="240" height="520" /><br/>
Like lists of areas, there are three statuses for robots that are working, available, and out of use.<br/>
Click through the lists to see detailed information about each robot, including its current location, description, speed, battery and gravel filled, etc.<br/><br/>

- #### Scheduling a new task
<img src="https://user-images.githubusercontent.com/61379336/206442928-ac6b40a6-5a19-44e0-9f71-313ecb7d3af6.png"  width="240" height="520" /><br/>
A new task can be assigned to available robots. The task can be started immediately, or at a specified time. You can add a single area to spread gravel, or multiple areas so that the robots can constantly work after finishing graveling an area.

<img src="https://user-images.githubusercontent.com/61379336/206435119-2676a1bb-e83f-4f5a-aea3-99442e2b528e.png"  width="240" height="520" />

## Author

Team Automod (Minji Choi)
