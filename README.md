# UVL Analyzer MCP

The **UVL Analyzer MCP** is a Model Context Protocol (MCP) server designed to analyze feature models written in the Universal Variability Language (UVL). It provides a variety of tools to process and extract insights from feature models, such as identifying atomic sets, calculating average branching factors, and more.

## Features

This MCP supports the following operations:

1. **Atomic Sets**  
   Identifies atomic sets in a feature model. An atomic set is a group of features that always appear together across all configurations of the model.

2. **Average Branching Factor**  
   Calculates the average number of child features per parent feature in the feature model, providing insight into the model's complexity.

3. **Commonality**  
   Measures how often a feature appears in the configurations of a product line, usually expressed as a percentage.

4. **Configurations**  
   Generates all possible valid configurations of a feature model. Each configuration represents a valid product derivable from the model.

5. **Configurations Number**  
   Returns the total number of valid configurations represented by the feature model.

6. **Core Features**  
   Identifies features that are present in all valid configurations of the feature model (mandatory features).

7. **Count Leafs**  
   Counts the number of leaf features in a feature model. Leaf features are those without any children.

8. **Dead Features**  
   Identifies features that cannot be included in any valid product configuration due to constraints and dependencies in the model.

9. **Estimated Number of Configurations**  
   Provides an estimate of the total number of different configurations that can be produced from a feature model.

10. **False Optional Features**  
    Identifies features that appear optional but must be included in every valid product configuration due to constraints.

11. **Feature Ancestors**  
    Identifies all ancestor features of a given feature in the feature model.

12. **Filter**  
    Filters and selects a subset of configurations based on specified criteria.

13. **Leaf Features**  
    Identifies all leaf features in the feature model.

14. **Max Depth**  
    Finds the maximum depth of the feature tree in the model, indicating the longest path from the root to a leaf.

15. **Satisfiability**  
    Checks whether a given model is valid according to the constraints defined in the feature model.

### Usage with Claude Desktop

To use this with Claude Desktop, add the following to your `claude_desktop_config.json`:

#### Docker

```json
{
  "mcpServers": {
    "uvl_analyzer": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "mcp/uvlanalyzer"
      ]
    }
  }
}
```

### NPX

```json
{
  "mcpServers": {
    "uvl_analyzer": {
      "command": "npx",
      "args": [
        "-y",
        "@lbdudc/mcp-uvl-analyzer",
      ],
    }
  }
}
```

## Build

Docker build:

```bash
docker build -t mcp/uvlanalyzer .
```

## License

This MCP server is licensed under the MIT License. This means you are free to use, modify, and distribute the software, subject to the terms and conditions of the MIT License. For more details, please see the LICENSE file in the project repository.
