# Scraper
## How to use
There are 4 different topics that can be scraped from New York Times. By clicking a scrape button, the articles table is dropped for a new set of articles that will populate the left side of the page. Each article can be associated with a note by clicking the note button that appears next to each article. Each article can be saved by clicking the saved button that appears next to an article that was scraped. The saved articles can be removed by clicking the delete button of the associated article. The articles saved are publicly seen by anyone using the application.

## Design oversights
- Realized that there's no need for a saved articles collection, simply added a boolean for saved to the articles would easily solve the saving function.
- No user authentication so all saved article can be seen by anyone, could adapt code from firebase UI to handle user authentication and assign each saved article another attribute pertaining to a specific user logged in.
