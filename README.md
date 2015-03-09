# meanblog

[![Join the chat at https://gitter.im/meanblogfolk/meanblog](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/meanblogfolk/meanblog?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

a blog app built on the mean.io stack


The primary goal here is to build a website management app on the [MEAN stack](http://mean.io) that provides the extensibility of Wordpress without its hackability and other general failures.

Secondary goals include:
- Portability
- Speed of service (of course)
- Pre-publishing as much static content as possible
- Revision management
- Smart internal security
- Ability to integrate into other apps

There's still a great need out there for blog apps and other more fully-fledged content management systems, and there will be until Facebook and Buzzfeed completely take over the internet. I want to make it as easy as it's ever been for people to set up their own website, hosted wherever they like, and provide their own content to the world. That means I have to be very picky when choosing an architecture.

I hope you're intrigued enough to investigate. After you do, I hope you're jazzed enough to join. After you do, I hope you're talented enough to help, in any way you can. Hit me up.



# config
drop your config files into conf/ and they'll be hooked automatically into app.locals.config
config files can be anything parsed by require(): .js, .json, .node
config files may have a prefix of local. to be ignored by git
config files may have a prefix of default. to be loaded before the non-prefixed
example:
 - default.server.js
 ```
 { a: 1, b: 2, c: 3 }
 ```
 - server.js
 ```
 { b: 4 }
 ```
 - local.server.js
 ```
 { b: 5, c: 6 }
 ```
should result in app.locals.config = { a: 1, b: 5, c: 6 };

all default files are loaded first
all local files are loaded last

store your module conf as modulename.js/.json/.node and get it out with app.locals.config.modulename

#lib
drop your lib files into lib/ and they'll be hooked automatically whenever you require( './lib' )
consider rewriting any lib file or group of them as a full node module for npm to manage.