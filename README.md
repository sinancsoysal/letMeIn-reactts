## LetMeIn Password Manager

## Features

- Store Login/Password credentials
- One-click Strong Password Generation
- Google Drive Sync (optional)
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


## How to use

- Update node_modules
```
npm update
```

- Run start.sh
```
./start.sh
```

- Create a database called "letMeIn" in your localhost
- Create table under the database "letMeIn"
```
CREATE TABLE `login` (
  `id` int NOT NULL AUTO_INCREMENT,
  `url` tinyblob,
  `mail` tinyblob,
  `pass` tinyblob,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```
- Get the executable jar file from
  - https://drive.google.com/file/d/1e9-2xHX-flWuw8Rx9CEmOaABpqNjPkxo/view?usp=sharing
- Run the jar file
```
java -jar letMeIn-mysql.jar
```

## Disclaimer

This application is for education purposes only. It may contain vulnerabilities!!
