import { Configuration, FrontendApi, Identity } from "@ory/client";
import { edgeConfig } from "@ory/integrations/next";

// Returns either the email or the username depending on the user's Identity Schema
export const ORY_SDK_URL =
  process.env.NEXT_PUBLIC_ORY_SDK_URL || "http://127.0.0.1:4433";

export const ory = new FrontendApi(
  // new Configuration({
  //   basePath: ORY_SDK_URL,
  //   baseOptions: {
  //     withCredentials: true,
  //   },
  // })
  new Configuration(edgeConfig)
);

export const getUsername = (identity: Identity) =>
  identity.traits.email || identity.traits.username;
