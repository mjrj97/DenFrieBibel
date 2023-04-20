export { default } from "next-auth/middleware"

//:path* restricts all sub paths
export const config = { matcher: ["/user/:path*"] }