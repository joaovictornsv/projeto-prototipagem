import SimpleSchema from "simpl-schema";
import {createCollection} from "meteor/quave:collections";
import {usefulDates} from "../composers/usefulDates";
import {CommonSchema} from "../schemas/Commom";

const OwnerSchema = new SimpleSchema({
  number: {
    type: String
  }
})
  .extend(CommonSchema)

export const OwnersCollection = createCollection({
  name: 'owners',
  schema: OwnerSchema,
  composers: [usefulDates]
})
