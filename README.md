# <ins>homenode</ins>

## Design


## Technical Specification


----------- Smart Contracts -----------

Resolver contract
Registrar contract

Spaces contract
  public space
  private 


----------- Spaces -------------

home.[ ].jptr
files.[ ].jptr
photos.[ ].jptr
music.[ ].jptr
videos.[ ].jptr
posts.[ ].jptr
savingaccount.[].jptr
[].[].jptr

Web3 Public Gateway
jptr.sh/files.gunjan
jptr.sh/home.gunjan


----------- CORE API -------------


----------- MODULES --------------


----------------------------- Web3

_.m().modules.users.add()\n
_.m().modules.users.remove()\n
_.m().modules.users.validate()\n

--------------------------- Social

_.m().modules.data.getTree()
_.m().modules.data.open("/pictures/mountain.jpg")
_.m().modules.data.add("/pictures", {})
_.m().modules.data.add("/pictures", {})

----------- APPS -------------

// spaces 
_.m().app.spaces.history.add({})\n
_.m().app.spaces.activity.post.share({})
_.m().app.spaces.activity.post.activity({})
_.m().app.spaces.activity.post("0x78103042d0350b").comment()
_.m().app.spaces.activity.fetch({})
_.m().app.spaces.activity.browse({})
_.m().app.spaces.activity.join({})

// blocbook 
_.m().app.blocbook.post.share({})
_.m().app.blocbook.post.activity({})
_.m().app.blocbook.post("0x78103042d0350b").comment()
_.m().app.blocbook.fetch({})
_.m().app.blocbook.browse({})
_.m().app.blocbook.join({})
