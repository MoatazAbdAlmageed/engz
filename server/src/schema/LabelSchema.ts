import * as graphql from "graphql";

const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;

const LabelSchema = new GraphQLObjectType({
  name: "Label",
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    title: {
      type: GraphQLString,
    },
  }),
});
export default LabelSchema;
