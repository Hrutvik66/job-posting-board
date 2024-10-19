import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
// js-cookie
import Cookies from "js-cookie";
import axios from "axios";
// Define the shape of the user object
interface Company {
  company_name: string;
  company_email: string;
  employee_size: string;
  name: string;
  phone: string;
  _id: string;
}

// Define the shape of the context
interface AuthContextType {
  company: Company | null;
  isAuthenticated: boolean;
  login: (companyData: any) => void;
  logout: () => void;
  isLoading: boolean;
}

// Create the Auth Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [company, setCompany] = useState<Company | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  //   get token from cookie and get company information
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        setIsLoading(true);
        const token = Cookies.get("cuvette-session");
        const URL = import.meta.env.VITE_URL!;
        if (token) {
          const response = await axios.get(`${URL}/api/company/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.status === 200) {
            setCompany(response.data.company);
            setIsAuthenticated(true);
          }
        }
        setIsLoading(false);
      } catch (error) {
        // If token is invalid or expired, remove it from cookies
        Cookies.remove("cuvette-session");
        setCompany(null);
        setIsAuthenticated(false);
        setIsLoading(false);
      }
    };
    fetchCompany();
  }, []);

  const login = (companyData: any) => {
    setCompany({
      company_name: companyData.company.company_name,
      company_email: companyData.company.company_email,
      employee_size: companyData.company.employee_size,
      name: companyData.company.name,
      phone: companyData.company.phone,
      _id: companyData.company._id,
    });
    setIsAuthenticated(true);
    // create cookie using js-cookie
    Cookies.set("cuvette-session", companyData.token, { expires: 7 });
  };

  const logout = () => {
    setCompany(null);
    setIsAuthenticated(false);
    Cookies.remove("cuvette-session");
  };

  return (
    <AuthContext.Provider value={{ company, isAuthenticated, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook for easy access to the context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
