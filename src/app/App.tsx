import React from "react";

import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navigation from "../shared/navigation/Navigation";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Navigation />
    </QueryClientProvider>
  );
}

export default App;
