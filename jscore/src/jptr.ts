import Core from "./Core";



let mainCore: Core;
const _ = (address?: string) => {
	return {
      m<T=any,L=any>(): Core<T,L> {
        return mainCore
      }, 
      c<T=any, L=any>(): Core<T, L> {
        return mainCore
      }
  };

}

//_("jupiter").m().


/**
 * 1. post in a community 
 * 2. everyone in the community will have access to the content posted in the commnity
 * 3. any content posted can be made into a nft
 */

/*

Smart Contracts 

jupiter resolver contract - 0x234243 
  "gunjan.eth" -> 10.49204.23923

jupiter registrar contract - 0x234243 
  ".et"

jupiter spaces contract
  public space
  private 
  pay for a space
  jptr token

  8 jptr per month 
  1 jptr for one post 


intentional sub domains
home.[ ].eth
files.[ ].eth
photos.[ ].eth
music.[ ].eth
videos.[ ].eth

posts.[ ].eth


jptr.sh/files.gunjan.eth
jptr.sh/home.gunjan.eth


_("homenode.jptr.sh").m().modules.web3.getSigner()

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
_("homenode.jptr.sh").m().app.spaces.post.share({})
_("homenode.jptr.sh").m().app.spaces.post.activity({})
_("homenode.jptr.sh").m().app.spaces.post("0x78103042d0350b").comment()
_("homenode.jptr.sh").m().app.spaces.fetch({})
_("homenode.jptr.sh").m().app.spaces.browse({})
_("homenode.jptr.sh").m().app.spaces.join({})

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


*/
