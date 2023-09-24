import SimpleSchema from "simpl-schema";

export const CommonSchema = new SimpleSchema({
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
    optional: true,
  },
});
