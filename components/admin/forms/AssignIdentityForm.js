"use client";

import { useState, useEffect } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useIdentities } from "@/hooks/useIdentities";
import { IdentityList } from "@/components/admin/identity/IdentityList";

const formSchema = z.object({
  person_id: z.string().min(1, "Please select a person"),
  identity_ids: z
    .array(z.string())
    .min(1, "Please select at least one identity"),
});

export const AssignIdentityForm = ({ onSubmit, onCancel, selectedPerson }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { identities, currentIdentities, fetchCurrentIdentities } =
    useIdentities();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      person_id: selectedPerson?.id || "",
      identity_ids: [],
    },
    mode: "onChange",
  });

  const { formState } = form;
  const { isValid } = formState;

  useEffect(() => {
    if (selectedPerson) {
      form.setValue("person_id", selectedPerson.id);
      fetchCurrentIdentities(selectedPerson.id);
    }
  }, [selectedPerson, form, fetchCurrentIdentities]);

  const handleSubmit = async (data) => {
    if (!isValid || isSubmitting) return;

    try {
      setIsSubmitting(true);
      await onSubmit({
        person_id: data.person_id,
        identity_ids: data.identity_ids,
      });
      form.reset();
    } catch (error) {
      console.error("Failed to assign identities:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {selectedPerson && (
          <div className="text-sm">
            Assigning identities to{" "}
            <span className="font-medium">{selectedPerson.full_name}</span>
          </div>
        )}

        {currentIdentities.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              Current Identities:
            </h3>
            <div className="bg-secondary/50 p-2 rounded-md">
              <IdentityList identities={currentIdentities} />
            </div>
          </div>
        )}

        <FormField
          control={form.control}
          name="identity_ids"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel>Available Identities</FormLabel>
              </div>
              <div className="space-y-2">
                {identities
                  .filter(
                    (identity) =>
                      !currentIdentities.find((ci) => ci.id === identity.id)
                  )
                  .map((identity) => (
                    <FormField
                      key={identity.id}
                      control={form.control}
                      name="identity_ids"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={identity.id}
                            className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(identity.id)}
                                onCheckedChange={(checked) => {
                                  const value = field.value || [];
                                  if (checked) {
                                    field.onChange([...value, identity.id]);
                                  } else {
                                    field.onChange(
                                      value.filter((val) => val !== identity.id)
                                    );
                                  }
                                }}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel className="text-sm font-medium">
                                {identity.label}
                              </FormLabel>
                              {identity.details && (
                                <p className="text-sm text-muted-foreground">
                                  {identity.details}
                                </p>
                              )}
                            </div>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            type="submit"
            className={
              !isValid || isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }
          >
            {isSubmitting ? "Assigning..." : "Assign Identities"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
