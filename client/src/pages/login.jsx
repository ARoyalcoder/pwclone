// import { Button } from "@/components/ui/button";
// import {
//   Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Tabs, TabsContent, TabsList, TabsTrigger
// } from "@/components/ui/tabs";
// import { Loader2 } from "lucide-react";
// import { useEffect, useState } from "react";
// import {
//   useLoginUserMutation,
//   useRegisterUserMutation,
// } from "@/features/api/authApi";
// import { toast } from "sonner";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [signupInput, setSignupInput] = useState({ name: "", email: "", password: "" });

//   const [loginInput, setLoginInput] = useState({ email: "", password: "" });

//   const [registerUser, { data: registerData, error: registerError, isLoading: registerIsLoading, isSuccess: registerIsSuccess }] = useRegisterUserMutation();
//   const [loginUser, { data: loginData, error: loginError, isLoading: loginIsLoading, isSuccess: loginIsSuccess }] = useLoginUserMutation();


//   const navigate = useNavigate();

//   const changeInputHandler = (e, type) => {
//     const { name, value } = e.target;
//     if (type === "signup") {
//       setSignupInput((prev) => ({ ...prev, [name]: value }));
//     } else {
//       setLoginInput((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   // email validators




//   const handleRegistration = async (type) => {
//     const inputData = type === "signup" ? signupInput : loginInput;
//     const action = type === "signup" ? registerUser : loginUser;
//     await action(inputData);
//   };

//   useEffect(() => {
//     if (registerIsSuccess && registerData) {
//       toast.success(registerData.message || "Signup Successful.");
//     }

//     if (registerError) {
//       toast.error(registerError.data?.message || "Signup failed!");
//     }

//     if (loginIsSuccess && loginData) {
//       toast.success(loginData.message || "Login Successful.");
//       navigate("/");
//     }

//     if (loginError) {
//       toast.error(loginError.data?.message || "Login failed!");
//     }
//   }, [
//     loginIsSuccess,
//     registerIsSuccess,
//     loginError,
//     registerError,
//     loginData,
//     registerData,
//     navigate,
//   ]);

//   return (
//     <div className="flex items-center w-full justify-center mt-20">
//       <Tabs defaultValue="Signup" className="w-[400px]">
//         <TabsList className="grid w-full grid-cols-2">
//           <TabsTrigger value="Signup">Signup</TabsTrigger>
//           <TabsTrigger value="Login">Login</TabsTrigger>
//         </TabsList>

//         {/* Signup */}




//         <TabsContent value="Signup">
//           <Card>
//             <CardHeader>
//               <CardTitle>Signup</CardTitle>
//               <CardDescription>Create a new account.</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-2">
//               <div className="space-y-1">
//                 <Label htmlFor="name">Name</Label>
//                 <Input
//                   id="name"
//                   name="name"
//                   value={signupInput.name}
//                   onChange={(e) => changeInputHandler(e, "signup")}
//                   placeholder="Aditya Singh"
//                   required
//                 />
//               </div>
//               <div className="space-y-1">
//                 <Label htmlFor="signupEmail">Email</Label>
//                 <Input
//                   id="signupEmail"
//                   name="email"
//                   type="email"
//                   value={signupInput.email}
//                   onChange={(e) => changeInputHandler(e, "signup")}
//                   placeholder="Email"
//                   required
//                 />
//               </div>
//               <div className="space-y-1">
//                 <Label htmlFor="signupPassword">Password</Label>
//                 <Input
//                   id="signupPassword"
//                   name="password"
//                   type="password"
//                   value={signupInput.password}
//                   onChange={(e) => changeInputHandler(e, "signup")}
//                   placeholder="Password"
//                   required
//                 />
//               </div>
//             </CardContent>
//             <CardFooter>
//               <Button disabled={registerIsLoading} onClick={() => handleRegistration("signup")}>
//                 {registerIsLoading ? (
//                   <>
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     Please wait
//                   </>
//                 ) : "Signup"}
//               </Button>
//             </CardFooter>
//           </Card>
//         </TabsContent>

//         {/* Login */}
//         <TabsContent value="Login">
//           <Card>
//             <CardHeader>
//               <CardTitle>Login</CardTitle>
//               <CardDescription>Enter your credentials.</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-2">
//               <div className="space-y-1">
//                 <Label htmlFor="loginEmail">Email</Label>
//                 <Input
//                   id="loginEmail"
//                   name="email"
//                   type="email"
//                   placeholder="Email"
//                   value={loginInput.email}
//                   onChange={(e) => changeInputHandler(e, "login")}
//                   required
//                 />
//               </div>
//               <div className="space-y-1">
//                 <Label htmlFor="loginPassword">Password</Label>
//                 <Input
//                   id="loginPassword"
//                   name="password"
//                   type="password"
//                   value={loginInput.password}
//                   onChange={(e) => changeInputHandler(e, "login")}
//                   placeholder="Password"
//                   required
//                 />
//               </div>
//             </CardContent>
//             <CardFooter>
//               <Button disabled={loginIsLoading} onClick={() => handleRegistration("login")}>
//                 {loginIsLoading ? (
//                   <>
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     Please wait
//                   </>
//                 ) : "Login"}
//               </Button>
//             </CardFooter>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// };

// export default Login;





import { Button } from "@/components/ui/button";
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs, TabsContent, TabsList, TabsTrigger
} from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/features/api/authApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import PasswordInput from "./PasswordInput";
import PhoneInput from "./PhoneInput";

const Login = () => {
  const [signupInput, setSignupInput] = useState({ name: "", email: "", password: "", phone: "" });
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });
  const [emailError, setEmailError] = useState("");

  const [registerUser, { data: registerData, error: registerError, isLoading: registerIsLoading, isSuccess: registerIsSuccess }] = useRegisterUserMutation();
  const [loginUser, { data: loginData, error: loginError, isLoading: loginIsLoading, isSuccess: loginIsSuccess }] = useLoginUserMutation();

  const navigate = useNavigate();

  const isValidEmail = (email) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  };

  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupInput((prev) => ({ ...prev, [name]: value }));

      if (name === "email") {
        if (!isValidEmail(value)) {
          setEmailError("Invalid email address.");
        } else {
          setEmailError("");
        }
      }
    } else {
      setLoginInput((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRegistration = async (type) => {
    console.log("handleRegistration called with type:", type);  // Debugging log
  
    const inputData = type === "signup" ? signupInput : loginInput;
  
    // Validation for signup email
    if (type === "signup" && !isValidEmail(signupInput.email)) {
      setEmailError("Invalid email address.");
      return;
    }
  
    const action = type === "signup" ? registerUser : loginUser;
  
    // Log input data and action type for debugging
    console.log("Input data for", type, ":", inputData);
  
    try {
      const response = await action(inputData);
      console.log("Action response:", response); // Log response after action is called
    } catch (error) {
      console.error("Action failed with error:", error); // Log any errors
    }
  };
  

  // useEffect(() => {
  //   if (registerIsSuccess && registerData) {
  //     toast.success(registerData.message || "Signup Successful.");
  //     navigate("/"); // 
  //   }

  //   if (registerError) {
  //     toast.error(registerError.data?.message || "Signup failed!");
  //   }

  //   if (loginIsSuccess && loginData) {
  //     toast.success(loginData.message || "Login Successful.");
  //     navigate("/");
  //   }

  //   if (loginError) {
  //     toast.error(loginError.data?.message || "Login failed!");
  //   }
  // }, [
  //   loginIsSuccess,
  //   registerIsSuccess,
  //   loginError,
  //   registerError,
  //   loginData,
  //   registerData,
  //   navigate,
  // ]);


  useEffect(() => {
    if (registerIsSuccess && registerData) {
      toast.success(registerData.message || "Signup successful. Please Login.");
    }
  
    if (registerError) {
      // Log the error for debugging
      console.error("Register Error:", registerError);
  
      // Ensure registerError exists and has the necessary structure
      const errorMessage = registerError?.data?.message || "Signup Failed";
      toast.error(errorMessage);
    }
  
    if (loginIsSuccess && loginData) {
      toast.success(loginData.message || "Login successful.");
      navigate("/");  // Navigate to home after successful login
    }
  
    if (loginError) {
      // Log the error for debugging
      console.error("Login Error:", loginError);
  
      // Ensure loginError exists and has the necessary structure
      const errorMessage = loginError?.data?.message || "Login Failed";
      toast.error(errorMessage);
    }
  }, [
    loginIsLoading,
    registerIsLoading,
    loginData,
    registerData,
    loginError,
    registerError,
    navigate,
  ]);
  



  return (
    <div className="flex items-center w-full justify-center mt-20">
      <Tabs defaultValue="Signup" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="Signup">Signup</TabsTrigger>
          <TabsTrigger value="Login">Login</TabsTrigger>
        </TabsList>

        {/* Signup */}
        <TabsContent value="Signup">
          <Card>
            <CardHeader>
              <CardTitle>Signup</CardTitle>
              <CardDescription>Create a new account.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={signupInput.name}
                  onChange={(e) => changeInputHandler(e, "signup")}
                  placeholder="Aditya Singh"
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="signupEmail">Email</Label>
                <Input
                  id="signupEmail"
                  name="email"
                  type="email"
                  value={signupInput.email}
                  onChange={(e) => changeInputHandler(e, "signup")}
                  placeholder="Email"
                  required
                />
                {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
              </div>
              <div className="space-y-1">
                <PhoneInput
                  id="signupPhone"
                  name="phone"
                  value={signupInput.phone}
                  onChange={(e) => changeInputHandler(e, "signup")}
                  placeholder="Phone Number"
                  required
                />
              </div>
              <div className="space-y-1">

                <PasswordInput
                  id="signupPassword"
                  name="password"
                  type="password"
                  value={signupInput.password}
                  onChange={(e) => changeInputHandler(e, "signup")}
                  placeholder="Password"
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled={registerIsLoading} onClick={() => handleRegistration("signup")}>
                {registerIsLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : "Signup"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Login */}
        <TabsContent value="Login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Enter your credentials.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="loginEmail">Email</Label>
                <Input
                  id="loginEmail"
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={loginInput.email}
                  onChange={(e) => changeInputHandler(e, "login")}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="loginPassword">Password</Label>
                <Input
                  id="loginPassword"
                  name="password"
                  type="password"
                  value={loginInput.password}
                  onChange={(e) => changeInputHandler(e, "login")}
                  placeholder="Password"
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled={loginIsLoading} onClick={() => handleRegistration("login")}>
                {loginIsLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : "Login"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;
