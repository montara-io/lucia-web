import "@testing-library/jest-dom/extend-expect";
import { getMinMaxView } from "./common";

describe("Test getMinMaxView values", () => {
  it("Check min max values - no dynamic zoom, no padding", () => {
    const res = getMinMaxView();
    expect(res).toStrictEqual({ min: 0,max: 100 })
  });

  it("Check min max values - dynamic zoom, with default padding - shows 2 labels, 50 & 75", () => {
    const data = [{ score: 51 }, { score: 52 }, { score: 85 }, { score: 56 }, { score: 59 }];

    const res = getMinMaxView(data, true);
    expect(res).toStrictEqual({ min: 41,max: 95})
  });

  it("Check min max values - dynamic zoom, with default padding - shows 2 labels, 75 & 100", () => {
    const data = [{ score: 80 }, { score: 85 }, { score: 88 }];

    const res = getMinMaxView(data, true);
    expect(res).toStrictEqual({ min: 70,max: 100})
  });

  it("Check min max values - dynamic zoom, with default padding - shows 2 labels, 75 & 100", () => {
    const data = [{ score: 86 }, { score: 89 }, { score: 90 }];

    const res = getMinMaxView(data, true);
    expect(res).toStrictEqual({ min: 70,max: 100})
  });

  it("Check min max values - dynamic zoom, with default padding - shows 2 labels, 50 & 75", () => {
    const data = [{ score: 50 }, { score: 40 }, { score: 30 }];

    const res = getMinMaxView(data, true);
    expect(res).toStrictEqual({ min: 20,max: 80})
  });

  it("Check min max values - dynamic zoom, with default padding - shows 2 labels, 0 & 50", () => {
    const data = [{ score: 30 }, { score: 30 }, { score: 30 }];

    const res = getMinMaxView(data, true);
    expect(res).toStrictEqual({ min: 0,max: 55})
  });

  it("Check min max values - dynamic zoom, with default padding - shows 2 labels, 0 & 50", () => {
    const data = [{ score: 10 }, { score: 7 }, { score: 51 }];

    const res = getMinMaxView(data, true);
    expect(res).toStrictEqual({ min: 0,max: 61})
  });

  it("Check min max values - dynamic zoom, with default padding - shows 3 labels, 50 & 75 & 100 ", () => {
    const data = [{ score: 90 }, { score: 50 }, { score: 75 }];

    const res = getMinMaxView(data, true);
    expect(res).toStrictEqual({ min: 40,max: 100})
  });

  it("Check min max values - dynamic zoom, with default padding - shows all 4 labels", () => {
    const data = [{ score: 90 }, { score: 60 }, { score: 10 }];

    const res = getMinMaxView(data, true);
    expect(res).toStrictEqual({ min: 0,max: 100})
  });

  it("Check min max values - dynamic zoom,  zoomPadding = 15", () => {
    const data = [{ score: 51 }, { score: 52 }, { score: 85 }, { score: 56 }, { score: 59 }];

    const res = getMinMaxView(data, true, 15);
    expect(res).toStrictEqual({ min: 36,max: 100 })
  });
});
