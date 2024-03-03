# Feed-Reader

RSS list sharing + feed reader built with SvelteKit and SolidPods. (very much just a prototype atm not for public use)

## Solid Pods

This app uses Solid Protocol (the real Web3.0) https://solidproject.org and all user data is stored on your pod or minor state in your localStorage.

Solid: Your data, your choice. Advancing Web standards to empower individuals and groups. Web 3.0 Solid Protocol, by Sir Tim Burners Lee

### Whats the point?

Started as a project that I really wanted but also thought it was a good way to showcase the power of users owning their data while also supporting a trend back up in RSS feeds amongst developers/websites. The most important people to make aware of Solid.

### Your Data

All your follows/lists/feeds are stored where potentially any other app could use them. Friends use a FOAF:schema format and profiles are VCARD that can be used across any other Solid Application or website.

Auth and Sessions are stored on server and in cookies using OAuth/OpenId. You grant permissions to what applications can access and can revoke it at anytime taking your data with you.

### Where to get a Pod?

⚠️ You can log in with a Community Server (CSS) but permissions are not working right to save data! Working on it! So we recommend getting a Node Solid Server (NSS) pod for now ⚠️

More pod hosting is becoming available, but for now we recommend https://solidcommunity.net it is currently using NSS [Node Solid Server 5.7.8](https://github.com/solid/node-solid-server/releases/tag/v5.7.8)

## Version

Still just prototyping but getting ready to version and have people start testing and using it. (use this at your own risk.. its very much testing in prod right now)

## WishList || Todos

[Found Here](https://github.com/b1mind/feed-reader/blob/dev/z.todo)

## Contrib

not looking for any PR's atm but will start opening issues
