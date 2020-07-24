import * as graphql from "graphql";

const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;

const UserSchema = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
  }),
});
export default UserSchema;
