interface VirtualScrollParams {
  current: number;
  pageSize: number;
}

interface VirtualScrollData {
  key: number;
  value: string;
}

interface VirtualScroll {
  code: number;
  data: VirtualScrollData[];
}
