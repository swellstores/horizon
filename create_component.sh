#!/bin/bash
# Usage: ./create_component.sh <component_type> <component_name>

# Exit if component type is not provided
if [ -z "$1" ]; then
    echo "No component type provided.
    Usage: ./create_component.sh <component_type> <component_name>"
    exit 1
fi

# Exit if component type is not valid (atom, molecule, organism, template, layout)
if [ "$1" != "atom" ] && [ "$1" != "molecule" ] && [ "$1" != "organism" ] && [ "$1" != "template" ] && [ "$1" != "layout" ]; then
    echo "Invalid component type.
   Expected: atom, molecule, organism, template, layout. Received: $1
    Usage: ./create_component.sh <component_type> <component_name>"
    exit 1
fi

# Exit if no component name is provided
if [ -z "$2" ]; then
    echo "No component name provided.
    Usage: ./create_component.sh <component_type> <component_name>"
    exit 1
fi

# Create directory variable for the component type
if [ "$1" = "atom" ]; then
    directory="atoms"
    elif [ "$1" = "molecule" ]; then
    directory="molecules"
    elif [ "$1" = "organism" ]; then
    directory="organisms"
    elif [ "$1" = "template" ]; then
    directory="templates"
    elif [ "$1" = "layout" ]; then
    directory="layouts"
fi

# Exit if component already exists
if [ -d "components/$directory/$2" ]; then
    echo "Component already exists."
    exit 1
fi

# Create component directory
mkdir -p components/$directory/$2

# Create component files
touch components/$directory/$2/$2.tsx
touch components/$directory/$2/$2.stories.tsx
touch components/$directory/$2/index.ts

# Create component
echo "import React from 'react';

export interface $2Props {
  label: string;
}

const $2: React.FC<$2Props> = ({ label }) => <div>{label}</div>;

export default $2;" > components/$directory/$2/$2.tsx

# Create storybook story
echo "import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import $2 from './$2';

export default {
  title: '$directory/$2',
  component: $2,
  argTypes: {
    label: { control: { type: 'text' } },
  },
} as ComponentMeta<typeof $2>;

const Template: ComponentStory<typeof $2> = (args) => <$2 {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: '$2',
};" > components/$directory/$2/$2.stories.tsx

# Create component index file
echo "export { default } from './$2';
export * from './$2';" > components/$directory/$2/index.ts

echo "Component created successfully."