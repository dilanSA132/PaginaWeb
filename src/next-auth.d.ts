// next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      email: string;
      roleId: number;
    } & DefaultSession["user"];
  }

  interface User {
    id: number;
    name: string;
    email: string;
    roleId: number;
  }
}
