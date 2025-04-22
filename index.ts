#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { Flamapy } from "@lbdudc/flamapy.js";

console.log = function () { }; // Disable console.log for cleaner output


const UVLContentSchema = z.object({
    content: z.string().describe("UVL (universal variability language) feature model content"),
});

const UVLContentSchemaWithConfig = z.object({
    content: z.string().describe("UVL (universal variability language) feature model content"),
    configFile: z.string().describe("Path to the configuration file")
});

// Create an MCP server
const server = new Server(
    {
        name: "UVL Analizer",
        version: "1.0.0"
    },
    {
        capabilities: {
            tools: {}
        }
    }
);

// Tool handlers
server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: "atomic_sets",
                description: "This operation identifies atomic sets in a feature model." +
                    "An atomic set is a group of features that always appear together across " +
                    "all configurations of the model. These sets help in simplifying and reducing " +
                    "the complexity of the model by grouping features that behave as a single unit.",
                inputSchema: zodToJsonSchema(UVLContentSchema)
            },
            {
                name: "average_branching_factor",
                description: "This calculates the average number of child features per parent " +
                    "feature in the feature model. It provides insight into the complexity of the model.",
                inputSchema: zodToJsonSchema(UVLContentSchema)
            },
            {
                name: "commonality",
                description: "Measures how often a feature appears in the configurations of a product line, " +
                    "usually expressed as a percentage. Features with high commonality are core features.",
                inputSchema: zodToJsonSchema(UVLContentSchemaWithConfig)
            },
            {
                name: "configurations",
                description: "Generates all possible valid configurations of a feature model. " +
                    "Each configuration represents a valid product that can be derived from the " +
                    "feature model.",
                inputSchema: zodToJsonSchema(UVLContentSchema)
            },
            {
                name: "configurations_number",
                description: "Returns the total number of valid configurations represented by " +
                    "the feature model.",
                inputSchema: zodToJsonSchema(UVLContentSchema)
            },
            {
                name: "core_features",
                description: "Identifies features that are present in all valid configurations " +
                    "of the feature model. These are mandatory features that cannot be excluded.",
                inputSchema: zodToJsonSchema(UVLContentSchema)
            },
            {
                name: "count_leafs",
                description: "This operation counts the number of leaf features in a feature model. " +
                    "Leaf features are those that do not have any children.",
                inputSchema: zodToJsonSchema(UVLContentSchema)
            },
            {
                name: "dead_features",
                description: "Identifies features that cannot be included in any valid product " +
                    "configuration due to constraints and dependencies in the model. " +
                    "These are typically indicative of errors in the feature model.",
                inputSchema: zodToJsonSchema(UVLContentSchema)
            },
            {
                name: "estimated_number_of_configurations",
                description: "Provides an estimate of the total number of different configurations " +
                    "that can be produced from a feature model by considering all possible combinations " +
                    "of features.",
                inputSchema: zodToJsonSchema(UVLContentSchema)
            },
            {
                name: "false_optional_features",
                description: "Identifies features that appear to be optional but, due to constraints " +
                    "and dependencies in the feature model, must be included in every valid product " +
                    "configuration. These features are typically indicative of modeling errors.",
                inputSchema: zodToJsonSchema(UVLContentSchema)
            },
            {
                name: "feature_ancestors",
                description: " Identifies all ancestor features of a given feature in the feature model. " +
                    "Ancestors are features that are hierarchically above the given feature.",
                inputSchema: zodToJsonSchema(UVLContentSchemaWithConfig)
            },
            {
                name: "filter",
                description: "This operation filters and selects a subset of configurations based on " +
                    "specified criteria. It helps in narrowing down the possible configurations to " +
                    "those that meet certain requirements.",
                inputSchema: zodToJsonSchema(UVLContentSchemaWithConfig)
            },
            {
                name: "leaf_features",
                description: "Identifies all leaf features in the feature model. " +
                    "Leaf features are those that do not have any child features and represent " +
                    "the most specific options in a product line.",
                inputSchema: zodToJsonSchema(UVLContentSchema)
            },
            {
                name: "max_depth",
                description: "This operation finds the maximum depth of the feature tree in the model, " +
                    "indicating the longest path from the root to a leaf.",
                inputSchema: zodToJsonSchema(UVLContentSchema)
            },
            {
                name: "satisfiability",
                description: "Checks whether a given model is valid according to the constraints " +
                    "defined in the feature model.",
                inputSchema: zodToJsonSchema(UVLContentSchema)
            }
        ]
    };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    const processUVLContent = async (uvlContent: string, operation: { (flamapy: any): any; (flamapy: any): any; (flamapy: any): any; (flamapy: any): any; (flamapy: any): any; (flamapy: any): any; (flamapy: any): any; (flamapy: any): any; (flamapy: any): any; (flamapy: any): any; (flamapy: any): any; (flamapy: any): any; (flamapy: any): any; (flamapy: any): any; (flamapy: any): any; (arg0: any): any; }) => {
        try {
            const flamapy = new Flamapy(uvlContent);
            await flamapy.initialize();
            return await operation(flamapy);
        } catch (error) {
            throw new Error(`Error processing UVL content: ${error instanceof Error ? error.message : String(error)}`);
        }
    };

    switch (name) {
        case "atomic_sets":
            const parsed = UVLContentSchema.safeParse(args);
            if (!parsed.success) {
                throw new Error(`Invalid input: ${parsed.error}`);
            }
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(
                        await processUVLContent(parsed.data.content, (flamapy) => flamapy.atomicSets()),
                        null,
                        2
                    )
                }]
            };

        case "average_branching_factor":
            const parsedAvg = UVLContentSchema.safeParse(args);
            if (!parsedAvg.success) {
                throw new Error(`Invalid input: ${parsedAvg.error}`);
            }
            return {
                content: [{
                    type: "text",
                    text: (await processUVLContent(parsedAvg.data.content, (flamapy) => flamapy.averageBranchingFactor())).toFixed(2)
                }]
            };

        case "commonality":
            const parsedCommonality = UVLContentSchemaWithConfig.safeParse(args);
            if (!parsedCommonality.success) {
                throw new Error(`Invalid input: ${parsedCommonality.error}`);
            }
            return {
                content: [{
                    type: "text",
                    text: (await processUVLContent(parsedCommonality.data.content, (flamapy) => flamapy.commonality(parsedCommonality.data.configFile))).toFixed(2)
                }]
            };

        case "configurations":
            const parsedConfigs = UVLContentSchema.safeParse(args);
            if (!parsedConfigs.success) {
                throw new Error(`Invalid input: ${parsedConfigs.error}`);
            }
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(
                        await processUVLContent(parsedConfigs.data.content, (flamapy) => flamapy.configurations()),
                        null,
                        2
                    )
                }]
            };

        case "configurations_number":
            const parsedConfigNum = UVLContentSchema.safeParse(args);
            if (!parsedConfigNum.success) {
                throw new Error(`Invalid input: ${parsedConfigNum.error}`);
            }
            return {
                content: [{
                    type: "text",
                    text: (await processUVLContent(parsedConfigNum.data.content, (flamapy) => flamapy.configurationsNumber())).toFixed(2)
                }]
            };

        case "core_features":
            const parsedCore = UVLContentSchema.safeParse(args);
            if (!parsedCore.success) {
                throw new Error(`Invalid input: ${parsedCore.error}`);
            }
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(
                        await processUVLContent(parsedCore.data.content, (flamapy) => flamapy.coreFeatures()),
                        null,
                        2
                    )
                }]
            };

        case "count_leafs":
            const parsedLeafCount = UVLContentSchema.safeParse(args);
            if (!parsedLeafCount.success) {
                throw new Error(`Invalid input: ${parsedLeafCount.error}`);
            }
            return {
                content: [{
                    type: "text",
                    text: (await processUVLContent(parsedLeafCount.data.content, (flamapy) => flamapy.countLeafs())).toFixed(2)
                }]
            };

        case "dead_features":
            const parsedDead = UVLContentSchema.safeParse(args);
            if (!parsedDead.success) {
                throw new Error(`Invalid input: ${parsedDead.error}`);
            }
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(
                        await processUVLContent(parsedDead.data.content, (flamapy) => flamapy.deadFeatures()),
                        null,
                        2
                    )
                }]
            };

        case "estimated_number_of_configurations":
            const parsedEstimate = UVLContentSchema.safeParse(args);
            if (!parsedEstimate.success) {
                throw new Error(`Invalid input: ${parsedEstimate.error}`);
            }
            return {
                content: [{
                    type: "text",
                    text: (await processUVLContent(parsedEstimate.data.content, (flamapy) => flamapy.estimatedNumberOfConfigurations())).toFixed(2)
                }]
            };

        case "false_optional_features":
            const parsedFalseOpt = UVLContentSchema.safeParse(args);
            if (!parsedFalseOpt.success) {
                throw new Error(`Invalid input: ${parsedFalseOpt.error}`);
            }
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(
                        await processUVLContent(parsedFalseOpt.data.content, (flamapy) => flamapy.falseOptionalFeatures()),
                        null,
                        2
                    )
                }]
            };

        case "feature_ancestors":
            const parsedAncestors = UVLContentSchemaWithConfig.safeParse(args);
            if (!parsedAncestors.success) {
                throw new Error(`Invalid input: ${parsedAncestors.error}`);
            }
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(
                        await processUVLContent(parsedAncestors.data.content, (flamapy) => flamapy.featureAncestors(parsedAncestors.data.configFile)),
                        null,
                        2
                    )
                }]
            };

        case "filter":
            const parsedFilter = UVLContentSchemaWithConfig.safeParse(args);
            if (!parsedFilter.success) {
                throw new Error(`Invalid input: ${parsedFilter.error}`);
            }
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(
                        await processUVLContent(parsedFilter.data.content, (flamapy) => flamapy.filterFeatures(parsedFilter.data.configFile)),
                        null,
                        2
                    )
                }]
            };

        case "leaf_features":
            const parsedLeaf = UVLContentSchema.safeParse(args);
            if (!parsedLeaf.success) {
                throw new Error(`Invalid input: ${parsedLeaf.error}`);
            }
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(
                        await processUVLContent(parsedLeaf.data.content, (flamapy) => flamapy.leafFeatures()),
                        null,
                        2
                    )
                }]
            };

        case "max_depth":
            const parsedMaxDepth = UVLContentSchema.safeParse(args);
            if (!parsedMaxDepth.success) {
                throw new Error(`Invalid input: ${parsedMaxDepth.error}`);
            }
            return {
                content: [{
                    type: "text",
                    text: (await processUVLContent(parsedMaxDepth.data.content, (flamapy) => flamapy.maxDepth())).toFixed(2)
                }]
            };

        case "satisfiability":
            const parsedSatisfiability = UVLContentSchema.safeParse(args);
            if (!parsedSatisfiability.success) {
                throw new Error(`Invalid input: ${parsedSatisfiability.error}`);
            }
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(
                        await processUVLContent(parsedSatisfiability.data.content, (flamapy) => flamapy.satisfiable()),
                        null,
                        2
                    )
                }]
            };


        default:
            throw new Error(`Unknown method: ${name}`);
    }
});


// Start the server with Stdio transport
async function runServer() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Secure MCP UVL Analyzer server running on stdio");
}

runServer().catch((error) => {
    console.error("Error starting server:", error);
    process.exit(1);
});