"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql = require("graphql");
const TaskSchema_1 = require("./TaskSchema");
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        task: {
            type: TaskSchema_1.default,
            args: {
                id: {
                    type: GraphQLString,
                },
            },
            resolve(parent, args) {
                console.log("resolve");
                console.log(args.id);
                // code to get from db
            },
        },
    },
});
exports.default = new GraphQLSchema({
    query: RootQuery,
});
