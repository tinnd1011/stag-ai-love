"use client";
import { containerMultiStepForm as container } from "@/constants/framer-motion";
import { useMultiStepForm } from "@/hooks/multi-step-form";
import { motion } from "framer-motion";
import { Form } from "@/components/ui/form";
import React, { PropsWithChildren } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../card";

import { FieldValues } from "react-hook-form";
import { UseMultiStepFormTypeOptions } from "@/types/multi-step-form";

interface Props<T extends FieldValues> extends PropsWithChildren {
  // title: string;
  // description: string;
  context: React.Context<UseMultiStepFormTypeOptions<T>>
};

const MultiStepForm = ({  children, context }: Props<any>) => {
  const { form, onSubmit, onErrors } = useMultiStepForm(context);
  return (
    <Form {...form}>
      <form onSubmit={form?.handleSubmit(onSubmit, onErrors)} className="w-full">
        {children}
      </form>
    </Form>
  );
};

export default MultiStepForm;