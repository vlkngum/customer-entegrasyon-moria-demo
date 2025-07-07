import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email_or_phone: { label: "Email or Phone", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email_or_phone || !credentials?.password) {
            return null;
          }

          // Direct API call for server-side authentication
          const response = await fetch('https://apiprodv2.entekas.com/api/v1/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Bearer': 'x' // As per your authService configuration
            },
            body: JSON.stringify({
              email_or_phone: credentials.email_or_phone,
              password: credentials.password,
            }),
          });

          if (!response.ok) {
            return null;
          }

          const data = await response.json();

          if (data.data && data.data.user) {
            return {
              id: data.data.user.id,
              email: data.data.user.email,
              name: data.data.user.name,
              phone: data.data.user.phone,
              avatar: data.data.user.avatar,
              authority: data.data.user.authority,
              two_factor_enabled: data.data.user.two_factor_enabled,
              accessToken: data.data.access_token,
              refreshToken: data.data.refresh_token,
              tokenType: data.data.token_type,
              expiresIn: data.data.expires_in,
            };
          }
          
          return null;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      }
    })
  ],
  secret: "your-long-random-secret-here",
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async jwt({ token, user }: { token: JWT; user: any }) {
      
      if (user) {
        token.authority = user.authority;
        token.phone = user.phone;
        token.avatar = user.avatar;
        token.two_factor_enabled = user.two_factor_enabled;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.tokenType = user.tokenType;
        token.expiresIn = user.expiresIn;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token && session.user) {
        session.user.id = token.sub!;
        session.user.email = token.email!;
        session.user.name = token.name!;
        session.user.phone = token.phone as string;
        session.user.authority = token.authority as string;
        session.user.avatar = token.avatar as string;
        session.user.two_factor_enabled = token.two_factor_enabled as boolean;
        session.accessToken = token.accessToken as string;
        session.refreshToken = token.refreshToken as string;
        session.tokenType = token.tokenType as string;
        session.expiresIn = token.expiresIn as number;
      }
      return session;
    },
    
  },
  pages: {
    signIn: '/login',
    signOut: '/login',
    
  },
  session: {
    strategy: "jwt" as const,
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
}; 