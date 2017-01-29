# ngis

[![Greenkeeper badge](https://badges.greenkeeper.io/stepankuzmin/ngis.svg)](https://greenkeeper.io/)

Modern browser GIS

**Note**: this is just a playground

## Dependencies

* Node 5
* PostgreSQL 9.5 (PostGIS, pgcrypto)

## Installation

```shell
git clone https://github.com/stepankuzmin/ngis.git ngis
cd ngis
npm i
cp db/config.example.js db/config.js
createdb ngis
npm run db:migrate
npm run db:seed
npm start
```

open [`http://localhost:4000`](http://localhost:4000)
