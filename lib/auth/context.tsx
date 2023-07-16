import { Identity, Session } from "@ory/client";
import { edgeConfig } from "@ory/integrations/next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ORY_SDK_URL, getUsername, ory } from ".";

interface AuthSession {
  username: string;
  session: Session;
  logout_url?: string;
}

export const AuthContext = React.createContext<AuthSession | null>(null);

const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const router = useRouter();

  const [session, setSession] = useState<Session | undefined>();
  const [logoutUrl, setLogoutUrl] = useState<string | undefined>();

  useEffect(() => {
    ory
      .toSession()
      .then(({ data }) => {
        // User has a session!
        setSession(data);
        // Create a logout url
        ory.createBrowserLogoutFlow().then(({ data }) => {
          setLogoutUrl(data.logout_url);
        });
      })
      .catch((e) => {
        // Redirect to login page
        console.error(e);
        return router.push(edgeConfig.basePath + "/self-service/login/browser");
      });
  }, [router]);

  if (!session) {
    // Still loading
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        username: getUsername(session.identity),
        session: session,
        logout_url: logoutUrl,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useSession = () => React.useContext(AuthContext);
