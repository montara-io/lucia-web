import ReactECharts from 'echarts-for-react';
import React, { useEffect, useLayoutEffect, useRef } from 'react';
import * as echarts from 'echarts';

import { gray230, noSeverity, primary } from '../../../styles/colors';
import { getMinMaxView } from '../../utils/common';

export type BasicLineChartProps = {
  data: {
    id?: string;
    score: number;
    label: string;
    date: string;
    marker?: boolean;
    focused?: boolean;
  }[];
  range: number[];
  focusedId?: string;
  // eslint-disable-next-line no-unused-vars
  onClick?: (...args) => void;
  gridData?: {
    top: string;
    right: string;
    left: string;
    bottom: string;
  };
  dynamicZoom?: boolean;
  zoomPadding?: number;
  hideTooltips?: boolean;
  howManyLabelsToDisplay?: number;
};

const BasicLineChart: React.FunctionComponent<BasicLineChartProps> = (
  props,
) => {
  const howManyLabelsToDisplay = props.howManyLabelsToDisplay || 3;
  const [chartOptions, setChartOptions] = React.useState<any>({});
  const chart = useRef(null);
  const gridData = {
    top: props?.gridData?.top ?? '20%',
    right: props?.gridData?.right ?? '30px',
    left: props?.gridData?.left ?? '30px',
    bottom: props?.gridData?.bottom ?? '18%',
  };

  let chartInstance: any = null; // TODO: Fix any
  let options: any = {};

  const TOOLTIP_CIRCLE_SIZE = 5;
  const CIRCLE_SIZE = 5;
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
      handleMarkers();
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
    if (!item || !item.marker) return;
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

  const handleMarkers = () => {
    const { data } = props;

    if (data) {
      data?.map((item, i) => {
        if (item.marker === true) {
          options.series[MARKERS_SERIES_POSITION].markPoint.data.push(
            {
              symbol: 'image://./assets/icons/lightning.svg',
              symbolSize: 18,
              // @ts-ignore
              name: { index: i, id: item.id },
              // @ts-ignore
              symbolOffset: [0, item.focused ? -22 : -18],
              xAxis: i,
              yAxis: item.score,
            },
            {
              symbol: 'circle',
              symbolSize: CIRCLE_SIZE,
              name: `${item.id}`,
              xAxis: i,
              yAxis: item.score,
              itemStyle: { color: noSeverity },
            },
          );
          item.focused &&
            options.series[MARKERS_SERIES_POSITION].markPoint.data.push({
              symbol: 'circle',
              symbolSize: RING_SIZE,
              xAxis: i,
              yAxis: item.score,
              name: `${item.id}`,
              itemStyle: {
                color: 'transparent',
                // @ts-ignore
                borderColor: noSeverity,
              },
            });
        }
        setChartOptions(options);
        return true;
      });
    }
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
    textStyle: {
      fontFamily: 'Montserrat',
      color: primary,
    },
    grid: gridData,
    tooltip: {
      show: !props?.hideTooltips,
      trigger: 'item',
      borderColor: '#2F4D6F',
      position: function (pt) {
        return [pt[0] - 55, pt[1] - 65];
      },
      formatter: function (params) {
        const data = props.data[params.dataIndex];
        return (
          "<div style='position:relative;text-align:center;width:80px;'>" +
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
          interval: (index: number, value: string) => {
            const internal = Math.round(
              props.data.length / (howManyLabelsToDisplay - 1),
            );
            return (
              index === 0 ||
              index === props.data.length - 1 ||
              index % internal === 0
            );
          },
          color: '#646464',
          fontSize: 10,
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          onZero: false,
          lineStyle: {
            color: gray230,
          },
        },
      },
    ],
    yAxis: {
      axisLabel: { show: false },
      axisTick: {
        show: false,
      },
      splitLine: { show: false },
      axisLine: {
        lineStyle: {
          color: gray230,
        },
      },
      ...getMinMaxView(props?.data, props?.dynamicZoom, props?.zoomPadding),
    },
    visualMap: {
      show: false,
      dimension: 1,
      min: 0,
      max: 100,
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
      {
        name: 'markers',
        type: 'line',
        symbolSize: 6,
        lineStyle: {
          opacity: 0,
        },
        markPoint: {
          data: [
            {
              xAxis: props?.data?.findIndex((i) => i.score === undefined) - 1,
              yAxis: props?.data
                ? props?.data[
                    props?.data?.findIndex(({ score }) => score === undefined) -
                      1 || props?.data?.length - 1
                  ]?.score || 0
                : 0,
              itemStyle: noSeverity,
              symbol: 'circle',
              symbolSize: CIRCLE_SIZE,
              cursor: 'auto',
            },
          ],
        },
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
