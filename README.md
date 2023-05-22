
# Email

A email wep app that users can create account and send emails



## Installation

Need to install mysql workbench first

then create a new schema for this project with ```any name```
    
## Deployment

First, slipt 2 terminals. 

one navigate into client:

```bash
  cd client
```

Another one navigate into server:

```bash
  cd server
```

Then run 
```bash
  pnpm install
```
For both terminals

Then find the file ```config.son``` at directory
```bash
server/config/config.json
```
Need to edit the file
```json
"development": {
    "username": "{user name}",
    "password": "{mysql password}",
    "database": "{schema name}",
    "host": "localhost",
    "dialect": "mysql"
  },
```
if does not have a password, then make it ```""``` or ```null```

if ```localhost``` is not working for host, change it to ```127.0.0.1```



## Start project

Under client directory run:
```bash
pnpm dev
```

Under server directory run:
```bash
pnpm start
```