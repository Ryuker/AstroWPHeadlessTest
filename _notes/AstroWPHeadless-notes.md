# AstroWPHeadless notes
- Project to test headless communication from Wordpress to Astro using 
  - REST API
  - GraphQL

# Goals:
- [v] connect Astro to WP through GET calls
- [v] process JSON data
- [v] properly parse the content in the JSON and render it to a page
- [v] handle pagination
- properly handle additional query params

- create pages dynamically using API fetching
  - [v] [slug].astro 
    - [v] fetch single post from API based on slug
    - [v] render post to the page
      - [v] render optimized images from remote url
      - [v] convert html tags in content string - using astro-remote package
    - [v] implement pagination
      - [v] sub pages of blogposts (numbered) 
      - [v] page per slug of blogpost (first page of post)
      - [v] implement from test directory into posts directory
      - [v] implement pagination controls
        - [] pagination responsiveness
    - [v] add pagination to posts index page
      
- [v] setup content collection for posts
  - [v] move fetch of posts into code
  - [v] pull in the posts from the collection into [...page].astro
  - [v] pull in the posts from the collection into [index].astro
  - setup ZOD
    [] setup ZOD schema for wordpress posts

- [] repeat the above with WPGraphQL
  - [] install WPGraphQL plugin
  - [] create new collection ('graphql-posts')
  - [] retrieve posts using graphql query

- [] Build tests
  - [] build to static pages in dist folder
  - [] try to deploy to github pages

- [] Test WP HTML Tags
- [] Test Custom WP Block output in fetch result



- [] Clean up Project
 



# Usefull:
- adding multiple authors to wp - [guide](https://rankmath.com/blog/add-multiple-authors-for-posts/)

- rendering remote HTML or Markdown content - [github repo](https://github.com/natemoo-re/astro-remote) 

- adding pagination guide - [guide](https://fullstackdigital.io/blog/headless-wordpress-with-astro-part-2-pagination-and-tags-support/)
  - I'm making use of nestedPagination though, see [docs](https://docs.astro.build/en/guides/routing/#nested-pagination)

- split wordpress post in multiple pages - [guide](https://www.wpbeginner.com/wp-tutorials/how-to-split-wordpress-posts-into-multiple-pages/)

- Content Collections
  - building a custom loader - [docs](https://docs.astro.build/en/guides/content-collections/)
  - content layer deep dive - [guide](https://astro.build/blog/content-layer-deep-dive/)



