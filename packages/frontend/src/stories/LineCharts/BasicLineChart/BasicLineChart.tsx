import ReactECharts from 'echarts-for-react';
import React, { useEffect, useLayoutEffect, useRef } from 'react';
import * as echarts from 'echarts';

import { blue, gray230, noSeverity, primary } from '../../../styles/colors';

export type BasicLineChartProps = {
  data: {
    id?: string;
    score: number;
    label: string;
    date: string;
    focused?: boolean;
  }[];
  focusedId?: string;
  // eslint-disable-next-line no-unused-vars
  onClick?: (...args) => void;
  dynamicZoom?: boolean;
  zoomPadding?: number;
};

const BasicLineChart: React.FunctionComponent<BasicLineChartProps> = (
  props,
) => {
  const [chartOptions, setChartOptions] = React.useState<any>({});
  const chart = useRef(null);

  let chartInstance: any = null; // TODO: Fix any
  let options: any = {};

  const TOOLTIP_CIRCLE_SIZE = 15;
  const MARKERS_SERIES_POSITION = 1;
  const RING_SIZE = 10;
  let chartRef: any = null;

  useEffect(() => {
    function handleResize() {
      if (chartInstance) {
        chartInstance.resize();
      }
    }

    window.addEventListener('resize', handleResize);
  });

  useLayoutEffect(() => {
    try {
      renderChart();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      options = getOption;
      setChartOptions(options);

      chartInstance.setOption(options);
    } catch (e) {
      console.error(e);
      return;
    }
  }, [props.data]);

  useEffect(() => {
    return () => {
      chartInstance && chartInstance.dispose();
    };
  }, [chartInstance]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleFocus = (e, id?: string) => {
    const xAxis = e?.data?.xAxis;
    const copyData = props.data;
    const item = copyData[xAxis] || copyData.find((item) => item?.id === id);
    const itemIndex = id && copyData.findIndex((item) => item?.id === id);
    const copyOptions =
      Object.keys(options).length > 0 ? options : chartOptions;
    if (e?.data) {
      const {
        data: { name },
      } = e;
      props.onClick?.(typeof name === 'string' ? name : name.id);
    } else {
      props.onClick?.(id);
    }
    copyOptions.animationDelay = 0;

    const indexOfRing = copyOptions.series[
      MARKERS_SERIES_POSITION
    ].markPoint.data.findIndex((x) => x.symbolSize === RING_SIZE);
    if (indexOfRing > -1) {
      copyOptions.series[MARKERS_SERIES_POSITION].markPoint.data.splice(
        indexOfRing,
        1,
      );
    }
    const indexOfHighIcon = copyOptions.series[
      MARKERS_SERIES_POSITION
    ].markPoint.data.findIndex(
      (x) => x.symbolOffset && x.symbolOffset[1] === -22,
    );
    if (indexOfHighIcon > -1) {
      copyOptions.series[MARKERS_SERIES_POSITION].markPoint.data[
        indexOfHighIcon
      ].symbolOffset = [0, -18];
    }
    const indexOfNewSelectedIcon = copyOptions.series[
      MARKERS_SERIES_POSITION
    ].markPoint.data.findIndex((x) => {
      const { name } = x;
      return name && name.index && (name.index === xAxis || name.id === id);
    });
    if (indexOfNewSelectedIcon > -1) {
      copyOptions.series[MARKERS_SERIES_POSITION].markPoint.data[
        indexOfNewSelectedIcon
      ].symbolOffset = [0, -22];
    }

    if (item) {
      copyOptions.series[MARKERS_SERIES_POSITION].markPoint.data.push({
        symbol: 'circle',
        symbolSize: RING_SIZE,
        name: `${item.id}`,
        xAxis: xAxis > -1 ? xAxis : itemIndex,
        yAxis: item.score,
        itemStyle: {
          color: 'transparent',
          // @ts-ignore
          borderColor: noSeverity,
        },
      });
    }
    try {
      chartRef?.getEchartsInstance()?.setOption(copyOptions);
    } catch (e) {
      console.warn('En error occurred', e);
    }
  };

  useLayoutEffect(() => {
    props.focusedId && handleFocus(null, props.focusedId);
  }, [handleFocus, props.focusedId]);

  const triggerSymbols = (off: boolean) => {
    const copyOptions = getOption;
    let repeat = 1;
    let id = setInterval(frame, 30);
    function frame() {
      copyOptions.series[0].symbolSize = off
        ? TOOLTIP_CIRCLE_SIZE - repeat
        : repeat;
      chartRef?.getEchartsInstance()?.setOption(copyOptions);
      if (repeat === TOOLTIP_CIRCLE_SIZE) {
        clearInterval(id);
      } else {
        repeat++;
      }
    }
  };

  const isPropsValid = () => {
    return props?.data && props.data.length > 1;
  };

  const buildXLabels = () => {
    if (!isPropsValid()) return [];

    let arr = new Array(props?.data?.length).fill('');

    for (let i = 0; i < props?.data?.length; i++) {
      arr[i] = props?.data[i].label || '';
    }

    return arr;
  };

  const renderChart = () => {
    const renderInstance = chartRef?.getEchartsInstance();
    if (renderInstance) {
      chartInstance = renderInstance;
    } else {
      chartInstance = echarts.init(chart.current as any, undefined, {
        renderer: 'svg',
      });
    }

    chartInstance.on('click', handleFocus);
    chartInstance.setOption(options);
  };

  const getOption = {
    colorBy: 'series',
    color: [blue],
    textStyle: {
      fontFamily: 'Montserrat',
      color: primary,
    },
    grid: {
      top: '15%',
      right: '1rem',
      left: '1rem',
      bottom: '15%',
      containLabel: false,
    },
    tooltip: {
      show: true,
      trigger: 'item',
      borderColor: '#2F4D6F',
      position: function (pt) {
        return [pt[0] - 55, pt[1] - 65];
      },
      formatter: function (params) {
        const data = props.data[params.dataIndex];
        return (
          "<div style='position:relative;text-align:center;width:90px;'>" +
          "<div style='transform:rotate(45deg);background-color:#2F4D6F;width:40%;height:40%;position:absolute;top:90%;left:25%;z-index:-1;'></div><span>" +
          '<b>Score: ' +
          data.score +
          '</b><br/>' +
          data.date +
          '</span></div>'
        );
      },
      backgroundColor: '#2F4D6F',
      textStyle: { color: 'white', fontFamily: 'Montserrat', fontSize: 10 },
    },
    xAxis: [
      {
        type: 'category',
        data: buildXLabels(),
        boundaryGap: false,
        show: true,
        axisLabel: {
          color: '#646464',
          fontSize: 10,
        },
        axisLine: {
          onZero: true,
          lineStyle: {
            color: gray230,
          },
        },
      },
    ],
    yAxis: {
      type: 'value',
      axisLabel: { show: false },
      axisTick: {
        show: false,
      },
      splitLine: { show: false },
      axisLine: {
        show: 'auto',
        lineStyle: {
          color: gray230,
          width: 1,
        },
      },
    },
    visualMap: {
      show: false,
      dimension: 1,
    },
    title: {
      show: !isPropsValid(),
      textStyle: {
        color: primary,
        fontSize: 12,
        fontWeight: 'normal',
      },
      text: 'No data to show',
      left: 'center',
      top: 'center',
    },
    series: [
      {
        name: 'score',
        type: 'line',
        animation: true,
        animationDelay: function (idx) {
          return idx * 10;
        },
        animationEasingUpdate: 'linear',
        symbol: 'circle',
        symbolSize: 0,
        smooth: true,
        showSymbol: true,
        data: props?.data?.map(({ score }) => score) || [],

        lineStyle: { width: 3 },
      },
    ],
    animationEasing: 'elasticOut',
    animationDelayUpdate: function (idx) {
      return idx * 5;
    },
  };

  return (
    <div
      className="m-trend-line"
      style={{ height: '100%', top: 0, width: '100%' }}
      onMouseEnter={() => triggerSymbols(false)}
      onMouseOut={() => triggerSymbols(true)}
    >
      <ReactECharts
        style={{ height: '100%', top: 0, width: '100%' }}
        ref={(e) => {
          chartRef = e;
        }}
        option={options}
      />
    </div>
  );
};

export default BasicLineChart;
