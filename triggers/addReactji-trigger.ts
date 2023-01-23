import { Trigger } from "deno-slack-api/types.ts";
import AddReactjiWorkflow from "../workflows/addReactji_workflow.ts";

/**
 * Triggers determine when Workflows are executed. A trigger
 * file describes a scenario in which a workflow should be run,
 * such as a user pressing a button or when a specific event occurs.
 * https://api.slack.com/future/triggers
 */

const addReactjiTrigger: Trigger<typeof AddReactjiWorkflow.definition> = {
    type: "event",
    name: "Add Reactji Trigger",
    description: "Event Trigger triggered on a message addition",
    workflow: "#/workflows/add_reactji_workflow",
    inputs: {
        channelId: {
            value: "{{data.channel_id}}"
        },
        message: {
            value: "{{data.text}}"
        },
        messageTs: {
            value: "{{data.message_ts}}"
        },
        data: {
            value: "{{data}}"
        }
    },
    event: {
        event_type: "slack#/events/message_posted",
        channel_ids: ["C02GHGF9NRG"],
        filter: {
            version: 1,
            root: {
                statement: "{{data.user_id}} == null",
            }
        }
    }
};

export default addReactjiTrigger;
