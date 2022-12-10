interface IngredientAmountUnit {
  amount: number;
  unit?: string;
}

export interface IIngredientList extends IngredientAmountUnit {
  ingredientId?: number;
  name?: string;
}

export interface INewRecipeTag {
  tagId: number;
  recipeId: number;
}

export type tagName = {
  name: string;
};

export interface ITagsList {
  tagsFound: number[];
  newTags: tagName[];
}

export interface IIngredientFound extends IngredientAmountUnit {
  ingredientId: number;
}

export interface INewIngredient extends IngredientAmountUnit {
  name: string;
}

export type IIngredientsList = {
  ingredientsFound: IIngredientFound[];
  newIngredients: INewIngredient[];
};

export interface IAllIngredients extends IngredientAmountUnit {
  ingredientId: number;
  recipeId: number;
}

interface IIngredientUnit {
  ingredientId: number;
  amount: number;
  unitId?: number | null;
}

export interface INewRecipeIngredient extends IIngredientUnit {
  recipeId: number;
}
