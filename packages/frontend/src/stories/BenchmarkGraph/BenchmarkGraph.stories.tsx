import React from 'react';
import BenchmarkGraph from './BenchmarkGraph';
import Card from '../Card/Card';

export default {
  title: 'Components/Benchmark',
  component: BenchmarkGraph,
};

export const Primary = (args) => (
  <div style={{ width: 300 }}>
    <Card>
      <BenchmarkGraph {...args} />
    </Card>
  </div>
);

Primary.args = {
  upperRange: { title: 'Similar Employees', score: 77 },
  lowerRange: { title: 'My Score', score: 64 },
};

export const MaxGap = (args) => <BenchmarkGraph {...args} />;

MaxGap.args = {
  upperRange: { title: 'Similar Employees', score: 100 },
  lowerRange: { title: 'My Score', score: 0 },
};

export const SameValues = (args) => <BenchmarkGraph {...args} />;

SameValues.args = {
  upperRange: { title: 'Similar Employees', score: 40 },
  lowerRange: { title: 'My Score', score: 40 },
};

export const OneScore = (args) => <BenchmarkGraph {...args} />;

OneScore.args = {
  upperRange: { title: 'Similar Employees', score: 70 },
  lowerRange: { title: 'My Score', score: 7, hide: true },
};

export const LongLabel = (args) => <BenchmarkGraph {...args} />;

LongLabel.args = {
  upperRange: { title: 'Similar Employees very long text long long', score: 70 },
  lowerRange: { title: 'My Score very long text long long', score: 7 },
};

export const MissingScore = (args) => <BenchmarkGraph {...args} />;

MissingScore.args = {
  upperRange: { title: 'Similar Employees kjenfjernfherhferjfn', score: 70 },
};

export const InVaildData = (args) => <BenchmarkGraph {...args} />;

InVaildData.args = {
  upperRange: { title: 'Similar Employees', score: -70 },
  lowerRange: { title: 'My Score', score: 7 },
};

Primary.parameters = {
  jest: ['BenchmarkGraph.test.tsx'],
};
