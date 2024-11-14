import { handlers } from "@/lib/auth"

/**
 * Export the handlers for API Authentication and Authorization
 * using the NextAuth.js library, which is a wrapper around the OAuth2
 * protocol and credentials-based authentication. The requests created
 * by the NextAuth.js library are handled by these routes.
 *
 * @see https://authjs.dev/getting-started/installation
 */
export const { GET, POST } = handlers
