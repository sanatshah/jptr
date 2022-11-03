import SpringBoot from './server/integrations/SpringBoot';
import { SocketOptions } from './server/libs/Socket';

import Cognito, { AmazonCognitoInjection } from './auth/integrations/Cognito';

import Core from '../../Core';
import Module, { ModuleConfig } from '../Module';
import { AuthenticationState } from '../../constants/Authentication';
import Auth from './auth/Auth';
import Server from './server/Server';
import Matrix from './auth/integrations/Matrix';

export enum AuthType { 
  Chain = "Chain", 
  Cognito = "Cognito",
  Matrix = "Matrix",
  OAuth = "OAuth",
  None = "None"
}

export enum ServerType { 
  Feathers  = "Feathers",
  SpringBoot = "SpringBoot",
  Matrix = "Matrix"
}

export enum CommunicationTypes { 
  http = "http",
  sse = "sse",
  socket = "socket"
}

export interface ServerConfig { 
  type : ServerType, 
  home? : boolean,
  name : string,
  communicationTypes? : CommunicationTypes[],
  socket? : SocketOptions,
  path : string,
  apiVersion? : string 
}

interface AuthConfig { 
  type : AuthType,
  config : any
}

interface Config extends ModuleConfig { 
  server : ServerConfig[],
  auth : AuthConfig
}


interface DependencyInjection {
  AmazonCognito: AmazonCognitoInjection
}

export default class ClientContext extends Module {
  public auth : Auth<any>;
  public home? : Server;

  constructor(core : Core<{}>, private config : Config, private dependencyInjection: DependencyInjection) {
    super(core);
  }

  protected async start() {
    if (this.config.auth) {
      const isAuthenticated = this.checkAuth();

      if (isAuthenticated) {
        await this.setupHomeConnection();
      }
    }
  }

  private async checkAuth() {

    switch (this.config.auth.type) {
      case AuthType.Chain :
          console.error(
            "# clientContext - checkAuth - Chain authenticated is broken"
          );
        break;
      case AuthType.Cognito :
        this.auth = new Cognito(
            this.core.constants.authentication.update
                .bind(
                    this.core.constants.authentication
                ),
                this.config.auth.config,
                this.dependencyInjection.AmazonCognito
            );

        return await this.auth.checkLocalAuth();
      case AuthType.Matrix:
        if (!this.core.modules.matrix) {
          console.error(
            "# clientContext - checkAuth - Matrix authentication has a dependency on the Matrix Module!"
          );
        }
        this.auth = new Matrix(
            this.core.constants.authentication.update
              .bind(
                this.core.constants.authentication
              ),
              this.config.auth.config,
              this.core.modules.matrix
            );
        return await this.auth.checkLocalAuth();
      case AuthType.None : 
        this.core.constants.authentication.update(AuthenticationState.SUCCESS)
        break;
    }

    return false;
  }

  async logout() {
    this.auth?.signOut();
    this.core.constants.authentication.update(
      AuthenticationState.UNKNOWN
    );
    this.start();
  }

  /**
   * Depending on our server type, connect and create the inital connections if needed (socket)
   */
  private async setupHomeConnection() {

    if(!this.config.server) {
        console.log(
          "# clientContext - setupHomeConntection - No server specified"
        )
        return;
    }


    let home : ServerConfig | undefined = this.config.server.find(config => config.home);

    if (!home) {
        console.log(
          "# clientContext - setupHomeConntection - No home specified"
        )
        return;
    }
    
    if (home.type === ServerType.Feathers) {

      console.error(
        "# clientContext - setupHomeConntection - Feathers is not supported anymore"
      );

      //TODO: Feathers support depecrated for now

      /*
      this.home = new FeathersClass({
        url : home.path,
        useSocket : false
      });

      await this.home.setupClient();
      */

    } else if (home.type === ServerType.SpringBoot) {

      this.home = new SpringBoot({
        config : home,
        accessToken : (this.auth as any).accessToken,
        idToken : (this.auth as any).idToken
      })

      await this.home.setup();
    } else {
      console.log(
        `# clientContext - setupHomeConntection - No clientContext integration found for ${home.type}`
      );
    }
  }
}  


