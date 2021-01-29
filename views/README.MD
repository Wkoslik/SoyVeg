#    SOYVEG

**Objective**
Help eliminate hidden animal products from food for Vegetarians/Vegans

**Background**
Plant based diets are growing in popularity with 26% of Millenials now identifying as 'Vegetarian', however there are a limited number of resources available to help individuals move towards a plant based diet. 

SOYVEG will help with individuals identifying if something is vegetarian or vegan. 

Example: Parmesan Cheese --Cheese in general is seen as a staple in many vegetarians diet. However, parmesan cheese is traditionally made with an enzyme called Rennet. Rennet is only (natually) found in the lining of a cows stomach which means poor Bessie was killed in the making of the parmesan cheese and parmesan cheese isn't vegetarian. 

SOYVEG will help to identify these foods with the hidden animal products to help individuals working to be more towards a plant based lifestyle.

#    Models
1. User
2. Item
3. Recipe

## API
1. Edamam Food Database
2. Edamam Recipe Database

## Database Relationships

![](https://i.imgur.com/KTyItUy.png)


## Route Planning
![](https://i.imgur.com/zgdkyoa.png)

##  WireFrame
<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FlXWfFSrfNSpVIY4QjLvM6l%2FUntitled%3Fnode-id%3D0%253A1" allowfullscreen></iframe>

##  Tech
1. ejs
2. sequelize
3. postgres
4. axios
5. nodejs


## MVP
* User is able to search and add favorites/dislikes for ingredients
* user is able to search and add favorites/dislikes for recipes
* user can update profile

###    stretch.1
* recipes filter out based on disliked ingredients
* users can flag recipes/ingredients they think are incorrect (and a notice appears on the ingredient)
* recipes that have flagged ingredients are also flagged
* regex to do a secondary filter on vegan/vegetarian
* Attempt styling in bootstrap? 

### stretch.2
* mobile everything
* mobile: search by UPC code
* More than vegan/veg? include paleo/keto?

###    stretch.3
* Vegan/Vegetarian article resources
