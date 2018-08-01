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

Generally, I chose Node/Express backend, Postgresql database, and AWS because the three are very fast to have up and running.  In start up culture its beneficial to produce a viable product 
as fast as possible and scale once the companies grows in users.  Using AWS, it is easily scalable up to a certain threshold by purchasing more RAM/EC2 machines.  AWS is able to automatically scale your application by built in functionality called auto scaling groups and an elastic load balancing service.  


