"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString } = graphql;
const TaskSchema = new GraphQLObjectType({
    name: "Task",
    fields: () => ({
        id: {
            type: GraphQLString,
        },
        name: {
            type: GraphQLString,
        },
        genre: {
            type: GraphQLString,
        },
    }),
});
exports.default = TaskSchema;
