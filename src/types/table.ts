export type TDataSource = {
  id?: string;
  [key: string]: string | string[] | number | boolean | undefined;
};

export type THeaderTable = {
  title?: string;
  key?: string;
  renderBody?: (_: TDataSource, index?: number) => JSX.Element;
  renderHead?: (title: string, key: string) => JSX.Element;
};

export type TCellTable = {
  key?: string;
  content?: string | number | boolean | JSX.Element | string[] | undefined;
  tooltipLabel?: string | number | boolean | string[] | undefined;
};
