## LetMeIn Password Manager

## Features

- Store Login/Password credentials
- One-click Strong Password Generation
- PWA enabled so you can easily add it on your desktop or mobile platform
- No data is leaving your computer:
  - Everything is encrypted, stored and decrypted on your local database
  - Easy to backup and restore
- There's more to come...

## Screenshots

![img](https://i.imgur.com/hvY4EqP.png)

![img](https://i.imgur.com/GODcPxk.png)

![img](https://i.imgur.com/P4x6PrX.png)

## Languages

LetMeIn is currently available in the following languages:
* ENGLISH

## Requirements

- MySQL 8+
- Java 11+
- Java Extensions:
  - Maven
  - Spring Framework
- React
- Typescript

## Backend Repository

https://github.com/ssscs/letmein-spring


## How to use

1. Update node_modules
```
$ npm update
```

2. Run start.sh
```
$ ./start.sh
```

3. Create a database called "letMeIn" in your localhost
4. Create table under the database "letMeIn"
```
CREATE TABLE `login` (
  `id` int NOT NULL AUTO_INCREMENT,
  `url` tinyblob,
  `mail` tinyblob,
  `pass` tinyblob,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```
5. Get the executable jar file from
  - https://drive.google.com/file/d/1e9-2xHX-flWuw8Rx9CEmOaABpqNjPkxo/view?usp=sharing
6. Run the jar file
```
$ java -jar letMeIn-mysql.jar
```

## Disclaimer

This application is for education purposes only. **It may contain vulnerabilities!!**
I don't recommend using this application publicly because there is no encryption for the communication between the frontend and the backend.
**Use it at your own risk.**

## Note

If you want to enable all the PWA options you need to generate certificates before enabling https.
