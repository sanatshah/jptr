import HTTP from "./libs/HTTP";
import SSE from "./libs/SSE";
import PubSub from "./libs/PubSub";
import Socket from "./libs/Socket";

export default abstract class Server { 

    abstract setup(): void
    protected abstract sanityCheck(): void

    http : HTTP
    protected sse? : SSE
    protected socket? : Socket
    pubsub : PubSub

}