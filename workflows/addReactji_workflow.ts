import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { AddReactjiFunctionDefinition } from "../functions/addReactji_function.ts";

/**
 * A Workflow is a set of steps that are executed in order.
 * Each step in a Workflow is a function.
 * https://api.slack.com/future/workflows
 *
 * This workflow uses interactivity. Learn more at:
 * https://api.slack.com/future/forms#add-interactivity
 */
const AddReactjiWorkflow = DefineWorkflow({
  callback_id: "add_reactji_workflow",
  title: "Add Reactji workflow",
  description: "Adding Reactji workflow",
  input_parameters: {
    properties: {
      channelId: {
        type: Schema.slack.types.channel_id,
      },
      message: {
        type: Schema.types.string,
      },
      messageTs: {
        type: Schema.types.string,
      },
      data:{
        type: Schema.types.object
      }
    },
    required: ["messageTs", "channelId"]
  },
});

AddReactjiWorkflow.addStep(AddReactjiFunctionDefinition, {
  messageTs: AddReactjiWorkflow.inputs.messageTs,
  channelId: AddReactjiWorkflow.inputs.channelId,
  user: AddReactjiWorkflow.inputs.data
});

export default AddReactjiWorkflow;
