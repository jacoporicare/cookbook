import { RECEIVE_RECIPES } from '../constants/actionTypes';

function receiveRecipes(recipes) {
  return {
    type: RECEIVE_RECIPES,
    recipes: recipes
  };
}

export function fetchRecipes() {
  return (dispatch) => {
    setTimeout(() => {
      const recipes = [{"_id":"580680060cde48000f329084","title":"Drobenkový koláč s tvarohem a ovocem","user":"Kubík","__v":0,"directions":"*) Smícháme mouku, povolené nebo rozpuštěné máslo a cukr\n*) Odebereme 2/3, do kterých přidáme vejce, kypřící prášek a vypracujeme těsto\n*) Těsto dáme do vymazané, vysypané koláčové formy\n*) Propícháme vidličkou\n*) Vylijeme tvaroh\n*) Poklademe ovoce\n*) Nasypeme zbývající drobenku\n*) Pečeme ve vyhřáté troubě na 170°C cca 30 minut. Teplota i čas jsou orientační, záleží na Vaší troubě","preparationTime":45,"ingredients":[{"_id":"5808fcd7e1160b000fe48d59","isGroup":true,"name":"Těsto"},{"amount":250,"amountUnit":"g","name":"polohrubá mouka","_id":"580b5615d91279000f0124f0"},{"name":"máslo","amount":100,"amountUnit":"g","_id":"580680fd0cde48000f32908d"},{"name":"cukr","amount":100,"amountUnit":"g","_id":"580680fd0cde48000f32908c"},{"name":"vejce","amount":1,"amountUnit":"ks","_id":"580680fd0cde48000f32908b"},{"name":"prášek do pečiva","amount":0.5,"amountUnit":"","_id":"580680fd0cde48000f32908a"},{"_id":"5808fcd7e1160b000fe48d58","isGroup":true,"name":"Tvaroh"},{"name":"tvaroh","amount":500,"amountUnit":"g","_id":"5808b141953027001066ce53"},{"name":"vejce","amount":1,"amountUnit":"ks","_id":"580680fd0cde48000f329088"},{"name":"vanilkový cukr","amount":1,"amountUnit":"ks","_id":"580680fd0cde48000f329087"},{"name":"ovoce","_id":"580680fd0cde48000f329086"}],"lastModifiedDate":"2016-10-18T20:03:18.169Z"}];

      dispatch(receiveRecipes(recipes));
    }, 1000);
  };
}
