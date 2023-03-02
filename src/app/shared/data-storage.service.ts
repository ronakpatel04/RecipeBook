import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { exhaustMap, map, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(private recipeService: RecipeService, private http: HttpClient , private authService : AuthService) {}

  storeRecipe() {
    const recipes = this.recipeService.getRecipe();
    return this.http.put(
      'https://recipe-book-2c1c0-default-rtdb.firebaseio.com/recipes.json',
      recipes
    );
  }

  fetchData() {
 
        return this.http
        .get<Recipe[]>(
          'https://recipe-book-2c1c0-default-rtdb.firebaseio.com/recipes.json'
        ).pipe
      ( map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingrediants: recipe.ingrediant ?? [],
            };
          });
        }),
        tap((recipes) => {
          this.recipeService.setRecipe(recipes);
        })
      );
  }
}
