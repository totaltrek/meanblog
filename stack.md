# stack
pretty much the only thing i'm 100% on with this project is Node.js - i don't really have any interest in coffee, but i'd like to use whatever es6 there is that node supports.

everything else is up for discussion. here are what i can imagine we will need:


- host		no clue. aws maybe? i've got an account but no server. it costs me fifty cents a month for nothing, and idk what a server would cost
- repo		github -- i can't think of a reason to use anything else
- tasks		github issues

- build		grunt? circleci? i'm unfamiliar with this part of the process, honestly
- tests		i have one i've been learning but am willing to change. i might need some help with it.

- persistence	i use a lightweight data layer module i've hacked up and would like something standard but fast
- data		apparently not mongo
- file		lots of file system access means abstracting in, should be easy enough to build or find a decent one
- config	i've already put config/user.* into gitignore, i like having a separately managed config. open to options other than nconf
- http engine	node http? good enough to start with
- framework		by now i'm getting used to express 4.
- modules	anything that comes in handy. if velvetrope and charmed don't come in handy they don't work. anything you like?
- logging	winston, i guess, but whatever it is needs to just map to log( msg );
- admin		admin site discussion, location, api, etc
	users	user/role system, access mgmt, public & private profiles
- api		admin manages data, api serves it to the client
- client	links views to api
	- views
		- html
		- json
		- mobile
			- android	?
			- iphone	?
			- web		?
		- text

- www		static site for github
