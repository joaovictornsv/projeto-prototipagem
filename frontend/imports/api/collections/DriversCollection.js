import SimpleSchema from "simpl-schema";
import {createCollection} from "meteor/quave:collections";
import {usefulDates} from "../composers/usefulDates";
import {CommonSchema} from "../schemas/Commom";

const DriverSchema = new SimpleSchema({
  name: {
    type: String
  },
  documentNumber: {
    type: String
  }
})
  .extend(CommonSchema)

export const DriversCollection = createCollection({
  name: 'drivers',
  schema: DriverSchema,
  composers: [usefulDates]
})
