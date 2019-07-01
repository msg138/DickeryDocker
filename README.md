# Dickery Docker

This is a control panel for Docker, written in React / Redux and NodeJS. This supports single user (and group) container creation with permissions system. 

## Getting Started

To get started, make sure the pre requisites are met below.

### Prerequisites

Software needed
* Docker
* NodeJS (with NPM for packages)

### Installing

1) Clone the Repo,
```
git clone https://github.com/msg138/DickeryDocker.git
```

2) Enter the new directory,
```
cd DickeryDocker
```

3) Run basic npm init (To install needed modules)
```
npm install
```

4) Create Database and Table (this should be a MySQL database),
```
--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` text NOT NULL,
  `password` text NOT NULL,
  `permission` int(11) NOT NULL DEFAULT '0',
  `group_name` varchar(256) NOT NULL DEFAULT 'default',
  `permanent` tinyint(1) NOT NULL DEFAULT '0',
  `last_session` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
```

5) Modify the file located in DickeryDocker/server/access.js to have the proper database values (such as DB name, User, Pass and Host)
```
'Database': {
        host: '',
        user: '',
        password: '',
        database: ''
    },
```

6) Modify the Hostname (and Protocol if using HTTPS) in same DickeryDocker/server/access.js File.
```
    'Hostname': '',
    'Protocol': 'http://',
```

7) Modify the Hostname (and Protocol if using HTTPS) in DickeryDocker/src/config.js File.
```
// Hostname that the App is being hosted on.
export const Hostname = '';
// Protocol for the app.
export const Protocol = 'http://';
```

8) Run the Dickery Docker server,
```
cd DickeryDocker/server
node index.js
```

9) Modify the server name / port in DickeryDocker/public/index.html , this is where the server is located including port,
```
<script> 
  Lemonade.Mirror.connect('example.com:81'); 
</script>
```

10) Either build the React app, (using npm run build), or just run with npm start.
```
cd DickerDocker
npm start
```

## Deployment

For deploying in production environment, may want to make the authentication for Passwords stronger (uses MD5 as of current), and Build.

Eventually will create a Docker image to deploy this, as well as a Compose file for database as well.

## Built With

* [React](https://github.com/facebook/react) - React used in this project
* [ReduxJS](https://github.com/reduxjs/redux) - Redux library used in this project
* [FontAwesome](https://github.com/FortAwesome/Font-Awesome) - Used for icons in this project
* [Dockerode](https://github.com/apocas/dockerode) - Used for the NodeJS Docker binding (to communicate with docker host)

## Authors

* **Michael George** - *Initial work* - [msg138](https://github.com/msg138)
