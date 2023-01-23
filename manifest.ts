import { Manifest } from "deno-slack-sdk/mod.ts";
import AddReactjiWorkflow from "./workflows/addReactji_workflow.ts";

/**
 * The app manifest contains the app's configuration. This
 * file defines attributes like app name and description.
 * https://api.slack.com/future/manifest
 */
export default Manifest({
  name: "DJ App",
  description: "Adds a reactji when a message is posted",
  icon: "assets/default_new_app_icon.png",
  workflows: [AddReactjiWorkflow],
  outgoingDomains: [],
  botScopes: [
    "commands",
    "chat:write",
    "chat:write.public",
    "channels:history",
    "channels:manage",
    "channels:read",
    "groups:history",
    "datastore:read",
    "datastore:write",
    "im:read",
    "groups:read",
    "groups:write",
    "mpim:read",
    "reactions:write",
    "im:write",
      "im:history",
      "mpim:history",
      "metadata.message:read"
  ],
});
