import { Route, RouteComponentProps, Switch } from "react-router-dom";
import routes from "./config/routes";
import "./App.css";

function App() {
    return (
      <div style={{ minHeight: "80vh" }}>
      <Switch>
          {routes.map((route, index) => {
              return (
                  <Route
                      key={index}
                      path={route.path}
                      exact={route.exact}
                      render={(
                          props: RouteComponentProps<any>
                      ) => (
                          <route.component
                              name={route.name}
                              {...props}
                              {...route.props}
                          />
                      )}
                  />
              );
          })}
      </Switch>
  </div>
    )
}

export default App