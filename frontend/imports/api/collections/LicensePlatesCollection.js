import SimpleSchema from "simpl-schema";
import {createCollection} from "meteor/quave:collections";
import {usefulDates} from "../composers/usefulDates";
import {CommonSchema} from "../schemas/Commom";

const LicencePlateSchema = new SimpleSchema({
  number: {
    type: String
  },
  driver: {
    type: SimpleSchema.RegEx.Id,
  },
  owner: {
    type: SimpleSchema.RegEx.Id,
  }
})
  .extend(CommonSchema)

export const LicencePlatesCollection = createCollection({
  name: 'licencePlates',
  schema: LicencePlateSchema,
  composers: [usefulDates]
})
