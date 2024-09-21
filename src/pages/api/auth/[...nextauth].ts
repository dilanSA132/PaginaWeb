// pages/api/auth/[...nextauth].ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email y contraseña son requeridos');
        }

        // Buscar el usuario por email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        // Si el usuario no existe o la contraseña es incorrecta
        if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
          return null; // La autenticación fallará si retornas null
        }

        // Retorna el usuario autenticado
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          roleId: user.roleId
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.roleId = user.roleId;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.roleId = token.roleId;
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/login'
  }
});
