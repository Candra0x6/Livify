"use server";
import { getSession } from "@/lib/auth/auth";
import React from "react";
import Store from "./page";

async function StoreLayout() {
	return <Store />;
}

export default StoreLayout;
