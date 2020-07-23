import * as graphql from "graphql";

const { GraphQLObjectType, GraphQLString } = graphql;

const LabelSchema = new GraphQLObjectType({
  name: "Label",
  fields: () => ({
    id: {
      type: GraphQLString,
    },
    title: {
      type: GraphQLString,
    },
  }),
});
export default LabelSchema;
