
----------- Smart Contracts -----------

jupiter resolver contract - 0x234243 
  "gunjan.eth" -> 10.49204.23923

jupiter registrar contract - 0x234243 
  ".eth"

jupiter spaces contract
  public space
  private 


----------- Intentional Sub Domains -------------
home.[ ].eth
files.[ ].eth
photos.[ ].eth
music.[ ].eth
videos.[ ].eth

posts.[ ].eth


jptr.sh/files.gunjan.eth
jptr.sh/home.gunjan.eth


----------- API -------------
_("homenode.jptr.sh").m().modules.web3(ethers object)

// core
_("homenode.jptr.sh").m().modules.users.add()
_("homenode.jptr.sh").m().modules.users.remove()
_("homenode.jptr.sh").m().modules.users.validate()

_("homenode.jptr.sh").m().modules.notification.fetch()
_("homenode.jptr.sh").m().modules.notification.ack()

_("homenode.jptr.sh").m().modules.data.getTree()
_("homenode.jptr.sh").m().modules.data.open("/pictures/mountain.jpg")
_("homenode.jptr.sh").m().modules.data.add("/pictures", {})
_("homenode.jptr.sh").m().modules.data.add("/pictures", {})

// spaces - history 
_("homenode.jptr.sh").m().app.spaces.history.add({})

// spaces - activity
_("homenode.jptr.sh").m().app.spaces.activity.post.share({})
_("homenode.jptr.sh").m().app.spaces.activity.post.activity({})
_("homenode.jptr.sh").m().app.spaces.activity.post("0x78103042d0350b").comment()
_("homenode.jptr.sh").m().app.spaces.activity.fetch({})
_("homenode.jptr.sh").m().app.spaces.activity.browse({})
_("homenode.jptr.sh").m().app.spaces.activity.join({})

// blocktales 
_("homenode.jptr.sh").m().app.blocktales.post.share({})
_("homenode.jptr.sh").m().app.blocktales.post.activity({})
_("homenode.jptr.sh").m().app.blocktales.post("0x78103042d0350b").comment()
_("homenode.jptr.sh").m().app.blocktales.fetch({})
_("homenode.jptr.sh").m().app.blocktales.browse({})
_("homenode.jptr.sh").m().app.blocktales.join({})

// farcaster 
_("homenode.jptr.sh").m().app.farcaster.post.share({})
_("homenode.jptr.sh").m().app.farcaster.post.activity({})
_("homenode.jptr.sh").m().app.farcaster.post("0x78103042d0350b").comment()
_("homenode.jptr.sh").m().app.farcaster.fetch({})
_("homenode.jptr.sh").m().app.farcaster.browse({})
_("homenode.jptr.sh").m().app.farcaster.join({})
