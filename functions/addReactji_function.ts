import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";
import { SlackAPI } from "deno-slack-api/mod.ts";
/**
 * Functions are reusable building blocks of automation that accept
 * inputs, perform calculations, and provide outputs. Functions can
 * be used independently or as steps in Workflows.
 * https://api.slack.com/future/functions/custom
 */
export const AddReactjiFunctionDefinition = DefineFunction({
  callback_id: "addReactji_function",
  title: "Add Reactji function",
  description: "Add Reactji function",
  source_file: "functions/addReactji_function.ts",
  input_parameters: {
    properties: {
      messageTs: {
        type: Schema.types.string,
        description: "Message TS",
      },
      channelId: {
        type: Schema.types.string,
        description: "The user invoking the workflow",
      },
      user: {
        type: Schema.types.object,
        description: "The user invoking the workflow",
      }
    },
    required: ["messageTs", "channelId"]
  },
  output_parameters: {
    properties: {
      completed: {
        type: Schema.types.string,
        description: "Reaction emoji string",
      }
    },
    required: []
  }
});

// This function takes the input from the open form step, adds formatting, saves our
// updated object into the Slack hosted Datastore, and returns the updated message.

export default SlackFunction(AddReactjiFunctionDefinition, async ({ inputs, token, env }) => {
    const { channelId, messageTs, user } = inputs;
    const slack = SlackAPI(token);
    console.log(JSON.stringify(user))
    const response = await slack.apiCall("reactions.add", {
      channel: channelId,
      name: env["emoji.ticket"],
      timestamp: messageTs,
    });
    return { completed: true, error: ""} ;
  });
