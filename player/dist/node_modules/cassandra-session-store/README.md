Fork of [webcc/cassandra-store](https://github.com/webcc/cassandra-store). It differs slightly in implementation, making use Cassandra TTL functionality for session expiry.

cassandra-store
===============

Implementation of the session storage in Apache Cassandra as express middleware.

Installation
------------

```
$ npm install --save cassandra-store
```

Usage
-----

Usage within express:

```
const session = require("express-session");
const CassandraStore = require("cassandra-store");

app.use(session({
    store: new CassandraStore(options),
    ...
}));
```

Options
-------

```
{
    table: "sessions",
    client: null, // an existing cassandra client
    clientOptions: { // more https://github.com/datastax/nodejs-driver
        contactPoints: [ "localhost" ],
        keyspace: "sessions_store"
    }
};
```

Notes:

-	If no `options.client` is supplied a new one is created using `options.clientOptions`
-	If the client does not have a keyspace configured you must include it in the table name: `table: "sessions_store.sessions"`

Configuring the database
------------------------

To create the table in the Cassandra database, you need the execute the following CQL commands:

```
DROP KEYSPACE IF EXISTS sessions_store;

CREATE KEYSPACE sessions_store WITH replication = {
  'class': 'SimpleStrategy',
  'replication_factor': '1'
};

CREATE TABLE sessions_store.sessions (
   sid text,
   session text,
   PRIMARY KEY (sid)
) WITH default_time_to_live = 3600; // 1 hour
```

Test
====

```
# Export Cassandra host address
export DBHOST=cassandra.example.org

# Initialize schema
cqlsh -f ./cql/create.cql

# Run tests with
npm test
```

Changelog
=========

-	v1.0.6 - Update dependencies: `mocha@3.4.1`, `cassandra-driver@3.2.1`, `express-session@1.15.2`
-	v1.0.5 - Update dependencies: `uuid@3.0.1`, `mocha@3.2.0`, `cassandra-driver@3.2.0`, `express-session@1.15.1`
-	v1.0.4 - Update dependencies: `uuid@2.0.3`, `mocha@3.1.0`
-	v1.0.3 - Update dependencies: `cassandra-driver@3.1.3`, `express-session@1.14.1`
-	v1.0.2 - Update dependencies
-	v1.0.1 - Fix float TTL bug
-	v1.0.0 - Initial release
