import { WebStorageStateStore } from "oidc-client-ts";

export const oidcConfig = {
  authority: "https://cognito-idp.ap-southeast-2.amazonaws.com/ap-southeast-2_iUMkIZu60",
  client_id: "5np304idgschthggfbeggd1rkd",
  redirect_uri: window.location.origin,
  response_type: "code",
  scope: "email openid phone",
  userStore: new WebStorageStateStore({ store: window.localStorage }),
};
export const cognitoDomain =
  "https://ap-southeast-2iumkizu60.auth.ap-southeast-2.amazoncognito.com";
