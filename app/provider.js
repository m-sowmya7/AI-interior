"use client";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { UserDetails } from "./_context/UserDetails";

function Provider({ children }) {
    const { user } = useUser();
    const [userDetails, setUserDetails] = useState([]);
    useEffect(() => {
        if (user) {
            VerifyUser();
        }
    }, [user]);

      const VerifyUser = async () => {
        try {
          const response = await axios.post("/api/verify-user", {
            user: user,
          });
          setUserDetails(response.data);
          // console.log("Verified User:", response.data); 
        } catch (error) {
          console.error("Error verifying user:", error);
        }
      };
    return (
        <UserDetails.Provider value={{userDetails, setUserDetails}}>
            <div>{children}</div>;
        </UserDetails.Provider>
    )
}

export default Provider;
