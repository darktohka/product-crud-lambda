import * as v from "valibot";

export const CreateProductSchema = v.object({
  name: v.string(),
  description: v.string(),
  stock: v.number(),
});

export const UpdateProductSchema = v.object({
  name: v.string(),
  description: v.string(),
  stock: v.number(),
});

export type CreateProductDTO = v.InferOutput<typeof CreateProductSchema>;
export type UpdateProductDTO = v.InferOutput<typeof UpdateProductSchema>;
