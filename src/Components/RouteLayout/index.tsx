import React from 'react';
import { Route} from 'react-router-dom';

interface Props {
  layout: React.ComponentType<never>;
  component: React.ComponentType<never>;
  // eslint-disable-next-line react/require-default-props
  isAuth?: boolean;
  path?:string;
  exact?: boolean;
  isError404?: boolean;
}

export default function RouteLayout(props: Props) {

  const {
    layout: Layout, component: Component, path, ...rest
  } = props;

  return (
    <>
    <Route
      path={path}
      render={(matchProps): JSX.Element => (
        /* @ts-expect-error Server Component */
        <Layout>
        {/* @ts-expect-error Server Component */}
          <Component {...matchProps} />
        </Layout>
      )}
      {...rest}
    />
    </>
  );
};

const _RouteLayout = RouteLayout as unknown as (props: Props) => JSX.Element;
export { _RouteLayout as RouteLayout };
