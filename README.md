# a-design-system

*For readers: This is a mock repository for something non-component related so I don't suggest you use this.*

A bucket of Pre-styled Headless React components. Uses tons of popular packages, copies tons of popular packages, and has totally seperate stuff too.

## Overcoming the Anatomy of an Atomic Design System

For those unfamiliar, the anatomy of the Atomic Design System was originally coined by Web Designer Brad Frost. It is commonly used to intuitively refer to the size and organization of a given component based on, but not limited to, things like node count, complexity, and dependencies. 

Although these rules provide better code clarity and organization when dealing with complex design systems they should be used judiciously to avoid over optimization on components where a localized, logical hierarchy makes more sense. As the former suggests, this rule although not a 'hard and fast' one, can help further reduce the cognitive load required when reasoning with a system.

## Interpreting Folder Hierarchy

To properly interpret this repo's structure, refer to the table below:

| Directory            | Description                                                                        |
|----------------------|------------------------------------------------------------------------------------|
| `/root`              |                                                                                    |
| `../atoms`           | The smallest functional unit of a given component                                  |
| `../molecules`       | Two or more atoms used to iterate a component with greater meaning                 |
| `../organisms`       | An assembly of molecules functioning as a unit                                     |
| `../populations`     | Top level reusable structures tailored to fit a purpose                            |
| `../react-hooks`     | A set of React hooks for creating and extending components and their functionality |
| `../react-providers` | Top level access to React contexts for when hooks just don't cut it                |
| `../state-machines`  | Finite state machines to simplify complex component state logic                    |
| `../utils`           | A common set of tools for composing components                                     |

It's important to know that we are implicitly aware of atoms, molecules, and organisms statuses as components. This system is flat for simplicity and nesting them in a parent folder named something like 'components' would detract from developer experience over time. 

*why the `react-` prefix on hooks and providers? Consistency, it keeps atoms, molecules, and organisms grouped alphabetically.*
