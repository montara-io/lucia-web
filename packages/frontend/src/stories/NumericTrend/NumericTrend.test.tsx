import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NumericTrend, { NumericTrendProps } from './NumericTrend';

describe('NumericTrend Component', () => {
  let props: NumericTrendProps;

  it('should display the down arrow', () => {
    props = {
      primaryNumber: '50',
      percentageNumber: '-2',
      timeText: 'Past 6 months',
      showTrend: true,
    };

    const { getByTestId } = render(<NumericTrend {...props} />);
    expect(getByTestId('arrow-down')).toBeInTheDocument();
  });

  it('should display the up arrow', () => {
    props = {
      primaryNumber: '50',
      percentageNumber: '+2',
      timeText: 'Past 6 months',
      showTrend: true,
    };

    const { getByTestId } = render(<NumericTrend {...props} />);
    expect(getByTestId('arrow-up')).toBeInTheDocument();
  });

  it('should display the default arrow - up', () => {
    props = {
      primaryNumber: '50',
      percentageNumber: '2',
      timeText: 'Past 6 months',
      showTrend: true,
    };

    const { getByTestId } = render(<NumericTrend {...props} />);
    expect(getByTestId('arrow-up')).toBeInTheDocument();
  });

  it("should display text 'Same as' for percentageNumber value 0", () => {
    props = {
      primaryNumber: '50',
      percentageNumber: '0',
      showTrend: true,
    };

    const { queryByTestId, getByText } = render(<NumericTrend {...props} />);
    expect(queryByTestId('arrow-up')).not.toBeInTheDocument();
    expect(queryByTestId('arrow-down')).not.toBeInTheDocument();
    expect(getByText('Same as')).toBeInTheDocument();
  });

  it('should not display trend when showTrend is false', () => {
    props = {
      primaryNumber: '50',
      percentageNumber: '0',
      showTrend: false,
    };

    const { queryByTestId, getByText } = render(<NumericTrend {...props} />);
    expect(queryByTestId('arrow-up')).not.toBeInTheDocument();
    expect(queryByTestId('arrow-down')).not.toBeInTheDocument();
  });

  it("should display text 'Same as' for percentageNumber value 0", () => {
    props = {
      primaryNumber: '0',
      percentageNumber: '50',
      showTrend: true,
    };

    const { queryByTestId, getByText } = render(<NumericTrend {...props} />);
    expect(queryByTestId('arrow-up')).toBeInTheDocument();
    expect(getByText('0')).toBeInTheDocument();
  });

  it('Snapshot renders correctly - with data', () => {
    props = {
      primaryNumber: '50',
      percentageNumber: '1',
      timeText: 'Past 6 months',
    };

    const wrapper = render(<NumericTrend {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Snapshot renders correctly - no data', () => {
    let wrapper = render(<NumericTrend />);
    expect(wrapper).toMatchSnapshot();

    wrapper = render(<NumericTrend primaryNumber={null} percentageNumber={null} timeText={null} />);
    expect(wrapper).toMatchSnapshot();
    wrapper = render(
      <NumericTrend primaryNumber={undefined} percentageNumber={undefined} timeText={undefined} />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('Snapshot renders correctly - no data 2', () => {
    let wrapper = render(
      <NumericTrend
        {...{
          id: 'id',
          primaryNumber: undefined,
          percentageNumber: '',
          timeText: null,
          fontSize: 'small',
        }}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
