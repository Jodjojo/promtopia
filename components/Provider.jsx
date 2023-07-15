"use client";

import { SessionProvider } from "next-auth/react";

// We will use the session provider to wrap the code since it is a higher order component - meaning we are going to wrap other components with it

const Provider = ({ children, session }) => {
	return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;
