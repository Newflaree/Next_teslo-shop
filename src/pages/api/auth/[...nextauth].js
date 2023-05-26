// Next Auth
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';
// DataBase
import { dbUsers } from '@/database';


export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    Credentials({
      name: 'Custom Login',
      credentials: {
        email: {
          label: 'Correo:',
          type: 'email',
          placeholder: 'email@example.com'
        },
        password: {
          label: 'Contraseña:',
          type: 'password',
          placeholder: 'Contraseña'
        },
      },
      async authorize( credentials ) {
        //return { name: 'Hector', email: 'test3@email.com', role: 'CLIENT_ROLE'  };
        //TODO: Validar contra base de datos
        return await dbUsers.checkUserEmailPassword(
          credentials.email,
          credentials.password
        );
      }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  /*
  // JWT: Deprecated
  jwt: {
    secret: process.env.JWT_SECRET_SEED || ''
  },
  */
  // Custom Pages
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register'
  },
  // Callbacks
  callbacks: {
    async jwt({ token, account, user }) {
      if ( account ) {
        token.accessToken = account.access_token;

        switch ( account.type ) {
          case 'credentials':
            token.user = user;
            break;
        
          case 'oauth':
            token.user = await dbUsers.oAuthToDbUser( user.email, user.name );
            break;
        
          default:
            return;
        }
      }

      return token;
    },

    async session({ session, token, user }) {
      session.accessToken = token.accessToken;
      session.user = token.user;

      return session;
    }
  }
}

export default NextAuth( authOptions );
