"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  if (!email || !password) {
    return encodedRedirect(
      "error",
      "/sign-up",
      "Email and password are required",
    );
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/sign-up", error.message);
  } else {
    return encodedRedirect(
      "success",
      "/sign-up",
      "Thanks for signing up! Please check your email for a verification link.",
    );
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return redirect("/");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password",
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password.",
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required",
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match",
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password update failed",
    );
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};

export const getAllProducts = async () => {
  const supabase = await createClient();
  let { data: products, error } = await supabase
    .from('products')
    .select('*');

  if (error) {
    console.error('Error fetching products:', error);
    return null;  
  }

  return products;
};

export const getAllOwners = async () => {
  const supabase = await createClient();
  let { data: owners, error } = await supabase
    .from('owners')
    .select('*');

  if (error) {
    console.error('Error fetching owners:', error);
    return null;
  }

  return owners;
};

export const getProductById = async (id: string) => {
  const supabase = await createClient();
  const { data: product, error } = await supabase
    .from('products_with_owners')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching product:', error);
    return null;
  }

  return product;
};

export const getOwnerById = async (id: string) => {
  const supabase = await createClient();
  const { data: owner, error } = await supabase
    .from('owners')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching owner:', error);
    return null;
  }

  return owner;
};

export const getRecommendedProducts = async (category: string, ownerTypes: string[]) => {
  const supabase = await createClient();
  

  const { data: products = [], error } = await supabase
    .from('products_with_owners')
    .select('*')
    .eq('category', category)
    .in('owner_type', ownerTypes);

  if (error) {
    console.error('Error fetching recommended products:', error);
  } else {
    console.log('Fetched recommended products:', products);
  }

  return products;
};

export const getProductsByOwner = async (ownerName: string) => {
  const supabase = await createClient();
  const { data: products = [], error } = await supabase
    .from('products_with_owners')
    .select('*')
    .eq('owner_name', ownerName);

  if (error) {
    console.error('Error fetching products by owner:', error);
    return [];
  }

  console.log('Fetched products by owner:', products);
  return products;
};

