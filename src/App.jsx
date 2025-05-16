import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import PageNotFound from "./pages/PageNotFound";
import { Navigate } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         staleTime: 30 * 1000,
      },
   },
});

function App() {
   <Route path="dashboard" element={<Dashboard />} />;
   return (
      <QueryClientProvider client={queryClient}>
         <ReactQueryDevtools initialIsOpen={false} />
         <GlobalStyles />
         <BrowserRouter>
            <Routes>
               <Route element={<AppLayout />}>
                  <Route index element={<Navigate replace to="dashboard" />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="account" element={<Account />} />
                  <Route path="bookings" element={<Bookings />} />
                  <Route path="cabins" element={<Cabins />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="users" element={<Users />} />
               </Route>
               <Route path="login" element={<Login />} />
               <Route path="*" element={<PageNotFound />} />
            </Routes>
         </BrowserRouter>
         <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
               success: {
                  duration: 3000,
               },
               error: {
                  duration: 5000,
               },
               style: {
                  font: "16px",
                  maxWidth: "500px",
                  padding: "16px 24px",
                  backgroundColor: "var(--color-grey-0)",
                  color: "var(--color-grey-700)",
               },
            }}
         />
      </QueryClientProvider>
   );
}

export default App;
