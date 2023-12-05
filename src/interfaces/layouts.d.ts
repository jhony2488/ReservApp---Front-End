export interface PropsBlankLayout {
    children: React.ReactNode;
    // eslint-disable-next-line react/require-default-props
    window?: () => Window;
  }

export interface PropsWithHeader {
    children: JSX.Element;
    window?: () => Window;
  }