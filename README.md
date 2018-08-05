# Raspberry Pi API

This repo contains a [Node.js webserver](https://blog.risingstack.com/your-first-node-js-http-server/) to be run on a Raspberry Pi. When a request hits the `/off` endpoint, a bash script is run. This script sends a request to a "[delay API](https://grapeot.me/adding-a-delay-to-ifttt-recipes.html)" which then forwards it to an IFTTT webhook after one minute.

Before the delay completes the bash script shuts down the Pi safely. The IFTTT webhook runs a recipe to turn off the TP-Link switch to cut power to the Pi.

To make the API available to the outside world, a few additional things were required. Firstly I needed a static hostname to give my Pi from outside my network. This can easily be acquired from [noip.com](https://my.noip.com) and altering the settings of my router.

Then I added a proxy entry to the `lighttpd` server already running on the Pi to forward requests from `port 80` to my Node.js server on `port 3000`. This is achieved by adding the following to `/etc/lighttpd/lighttpd.conf`.

```
server.modules = (
        ...
        "mod_proxy",
)

...

$HTTP["host"] == "DYNAMIC DNS HOST" {
  proxy.server  = ( "" => (
    ( "host" => "127.0.0.1", "port" => 3000 )
  ) )
}
```

Once you have this externally available API, then you can create IFTTT recipes that point to that API for a button widget, voice assistant command, timer, or anything else.
