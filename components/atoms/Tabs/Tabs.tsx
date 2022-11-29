import React, { useState, useCallback } from 'react';
import { Root, List, Trigger, Content } from '@radix-ui/react-tabs';

interface TabsProps {
  tabs: {
    value: string;
    label: string;
    content: React.ReactNode;
  }[];
  value?: string;
  onChange?: (value: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, value, onChange }) => {
  const [selectedTab, setSelectedTab] = useState(tabs[0]?.value);

  const handleTabChange = useCallback(
    (tab: string) => {
      onChange?.(tab);
      setSelectedTab(tab);
    },
    [onChange],
  );

  return (
    <Root
      defaultValue={value ?? selectedTab}
      value={value ?? selectedTab}
      onValueChange={handleTabChange}>
      <List
        className="grid gap-2 lg:gap-4"
        style={{
          gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))`,
        }}>
        {tabs.map((tab) => (
          <Trigger
            key={tab.value}
            value={tab.value}
            className={`rounded-lg border py-4 text-sm uppercase text-primary transition-[border] duration-[300ms] focus:outline-none focus-visible:border focus-visible:border-primary ${
              selectedTab === tab.value ? 'border-primary' : 'border-grey-300'
            }`}>
            {tab.label}
          </Trigger>
        ))}
      </List>
      {tabs.map((tab) => (
        // Todo: Add SwitchTransition or similar
        <Content key={tab.value} value={tab.value} className="mt-2">
          {tab.content}
        </Content>
      ))}
    </Root>
  );
};

export default Tabs;
