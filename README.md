## Part 1
To run the api endpoint, enter the following commands into the terminal in order:
* npm install
* npm start

After entering the previous commands: 
* Start postgresql server on port 5432 (default)
* Make a database on the postgresql server
* Uncomment code in index.js file to seed database.
* Navigate to localhost:8000

## Part 2 
Systems architecture designs were created using Adobe XD.  First image (systems.png) is a high-level overview of an end to end diagram.
Second image (systems-2.png) takes a closer look into load balancers and how scaling is managed for server load.

I chose to use a Node/Express backend and Postgresql database because the three are very fast to have up and running.  In start-up culture, it is beneficial to produce a viable product 
as fast as possible and scale everything once the companies grows a large userbase.  In a real-production setting, AWS would be utilized to host the server and database because it can easily be scaled up to a certain threshold by purchasing more RAM/EC2 machines.  AWS is able to automatically scale both the server load and database by built in functionalities such as auto scaling groups, elastic load balancing service, and Amazon relational database service.


