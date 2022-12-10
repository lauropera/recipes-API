export type newRecipeIngredient = {
  amount: number;
  unit: string;
};

export interface IIngredientFound extends newRecipeIngredient {
  ingredientId: number;
}

export interface INewIngredient extends newRecipeIngredient {
  name: string;
}

export interface ITagsList {
  tagsFound: number[];
  newTags: { name: string }[];
}

export interface IIngredientsList {
  ingredientsFound: IIngredientFound[];
  newIngredients: INewIngredient[];
}
