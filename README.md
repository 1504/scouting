# scouting

## History

I've been working on this project for over four years now. I might update this with more history if anyone cares.

## Project Setup

This project requires [node.js](https://nodejs.org), tested with Node 10, although most versions should work.

To setup the development environment, `cd` to where this repository was cloned, and run

```node
npm install
```

That's it. No really, the one command will fetch all 25,000 dependencies and install em.

### Compiles and hot-reloads for development

```node
npm run serve
```

If you want to change the code for the scouting app, this will start a live-reloading server. Modifying the files
within `/src` will cause the webpage to hot-reload. 

### Compiles and minifies for production

```node
npm run build
```

This should be done before deploying the code. What this does is go through all of the files in `/src`, and build
them for production. This includes polyfills for older browsers that may not support all of the fancy Javascript we use.
Building will dump the code into `/dist`, which is what `server.js` looks at to serve files.

### Adding custom fields to the app

There are two files to care about: `/src/fields.json`, and `/src/components/Fields.vue`. `fields.json` has all of the fields that
we want to collect defined, along with their *default values*. This is why this file exists, so that we can change the default for
a field.

`Fields.vue` contains the actual code which handles the form input, and submitting. Understanding this requires
a decent understanding of HTML, and a bit of JS. Honestly, most people can figure it out since this scouting framework
aims to abstract away how everything is handled. Just modify the HTML until you have the fields and inputs you want.

## Competition

If you are at a competition and want to run this, you gotta do a few things. First, find the machine you want to run this on. 
Make sure it has node installed. Run `npm run build` on a developer machine, and push to Github. Now that the latest built 
version of the scouting app is in the cloud, go ahead and clone/download it onto the server machine. Now, run

```node
node server.js
```

and the server will start up. It will print out an IP address: this is the address the server is running on visible to other devices
on the network. (Side Note: I handled the networking for the app my freshman and sophomore years, and it sucked. Make sure that 
there is someone who actually understands routers better than I did then.)

If you just want to run it off a laptop, start the server, and give everyone who wants to scout the IP address. If they go to it, the
app should load.

## Data Analytics

As of right now, this has to be rewritten every year. I never came up with a permanent solution, although I wrote
some interesting code for it my junior and senior year. At this moment, the only code that handles data analytics is
accessing `/api` on the server. This will dump all of the data collected so far in JSON format.

So, the way to implement this is to write any basic HTML file, with whatever dependencies you need referenced locally. There is no need for any complex NPM dependency resolution. Once you have verified it works locally (for example, opening your analysis HTML file on your laptop and having it send a GET request to the server IP address running somewhere else), you want to save this in the root of this Github repository. 

In order to have this actually be accessible during competition, first make sure that someone has built the dist directory. The server is configured to serve all of the files in /dist. Then, drag your analytics code into /dist (note that this will have to be done each time dist is rebuilt through npm). Say you have an "analytics" folder, with an index.html inside. Drag this entire folder into the dist directory, and then when running the server, analytics will be found at SERVER_IP/analytics.

(If the above steps don't work for some reasons or if you have more questions, make a Github issue with the error message, and how to reproduce the error, and I can take a look.)

(Hint: This would be a good project for an extra programmer or two to implement, as they can do it how they want, and
the data is easily accesible.)

## QR Code

I started working on this my senior year after competition season. We didn't need it, but I was interested to see how
we could transfer data without any sort of networking. Turns out, QR codes work really well, and we came up with a phenomenal 
compression algorithm. I stripped out all of that code from this version of the repository, as it was half baked and could 
cause crashes in trying to open the camera. I reccomend you visit `Scouting 2018` under the 1504 Github to take a look at it.
At some point, this should be added in the case of a power outage.

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
