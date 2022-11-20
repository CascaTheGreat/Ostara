#https://github.com/hhursev/recipe-scrapers
  #github scraper code
#https://www.allrecipes.com/recipes/1642/everyday-cooking/
  #featured recipe page - allrecipe
#https://www.allrecipes.com/recipe/8443/aunt-blanches-blueberry-muffins/
  #muffin allergen recipe 
from recipe_scrapers import scrape_me
import requests
import json


#allergens = {"dairy":["milk", "cheese", "butter"], "egg":["egg"], "nut":["peanut", "almond"]}

urlSite = "https://api.webflow.com/collections/6379063c9e2f61d86f33895a/items?live=true"


def findRecipes(url):
  featured = scrape_me(url).links()
  listFeat = []
  #print(featured)
  for item in featured:
    if "recipe/" in item["href"]:
      listFeat.append(item["href"])
  return listFeat


def recipeScrape(url):
  # give the url as a string, it can be url from any site listed below
  scraper = scrape_me("https://www.allrecipes.com/recipe/8443/aunt-blanches-blueberry-muffins/")

  #split ingredients into measurement and ingredient name 
  #split ingredient list for necessary conversions in substitutions
  listIngre = []
  for index in scraper.ingredients():
    if index.count(" ") == 1:
      ingredients = index.split(" ", 1)
      #used for ingredient cases where measurement is '2 eggs' without a customary measurement
    else:
      ingredients = []
      temp = index.split(" ", 2)
      ingredients.append(temp[0]+" "+temp[1])
      ingredients.append(temp[2])
      
    listIngre.append(ingredients)
      #used for all other ingredients where two spaces are present: '2 cups flour'

  listInstru = scraper.instructions().split("\n")
  strInstru = "<br>"
  
  for i in range(len(listInstru)):
    strInstru = strInstru + "Step " + str((i+1)) + ") " + listInstru[i] + "<br> <br>"
  

  
  strIngre = "<br>"
  
  for i in range(len(listIngre)):
    strIngre = strIngre + "- " + listIngre[i][0] + " " + listIngre[i][1] + "<br>"
  
  recipeDict = {"title": scraper.title(), #String
    "total time": scraper.total_time(), #String
    "yields": scraper.yields(), #String
    "ingredients": strIngre, #List
    "instructions": strInstru, #List
    "image": scraper.image(), #String of html url
    "host": scraper.host(), #String
    "nutrients":scraper.nutrients()} #Dictionary
  
  return recipeDict

#importantInfo = recipeScrape('https://www.allrecipes.com/recipe/8443/aunt-blanches-blueberry-muffins/')

for i in range(1):
  importantInfo = recipeScrape(findRecipes('https://www.allrecipes.com/recipes/1642/everyday-cooking/')[i])

  payload = {"fields": {
        "_archived": False,
        "_draft": False,
        "name": importantInfo["title"],
        "slug": "recipe",
        "salary": importantInfo["nutrients"]["calories"],
        "description": importantInfo["instructions"],
        "rich-description": importantInfo["ingredients"],
        "company": "6379063c9e2f61b7443389fe",
        "image": "<img src='"+importantInfo["image"]+"' style='border-radius:14px;'>"
    }}
  headers = {
    "accept": "application/json",
    "content-type": "application/json",
    "authorization": "Bearer f591cda42a8c48a03fbe45ccfa2a6e8408cad00cb9305110dbf4c868c74d9565"
  }
  
  response = requests.post(urlSite, json=payload, headers=headers)
  print(response.text)


#urlpro= "https://ostara-3e45bc.webflow.io/post-job"
#GET = requests.get(urlpro, headers=headers)
#print(GET.text)

#getAllergen(GET.text)
#<img src='"+importantInfo["image"]+"'>