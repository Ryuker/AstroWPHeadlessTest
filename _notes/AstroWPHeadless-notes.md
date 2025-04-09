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
    [v] setup ZOD schema for wordpress posts

  - [v] implement custom loader for fetching
    - [v] use loader in content collection of posts


- [v] repeat the above with WPGraphQL
  - [v] install WPGraphQL plugin
  - [v] create new collection ('graphql-posts')
  - [v] retrieve posts using graphql query
    - [v] add support for retrieving authors with a custom plugin
  - [v] setup schema for posts so they have an accessible object setup
  - - [v] define postSchema's in content folder
  - - [v] derive type from schema in content folder
  - - [v] add transformer methods to ensure post object matches schema
  - [v] use schema's in collections
  - [v] modify components and pages to be able to use posts and GQLPosts without errors
    - [v] there should be no knowledge in the components of the API data specifics.
  

- [v] Build tests
  - [v] build to static pages in dist folder
  - [v] try to deploy to github pages

- Implement Markdown Support
  - [] Install Markdown Plugin in WP
    - [] test results from API
    - [] process markdown in client components
    - [] implement code block rendering


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
  - how to build a loader setup - [guide](https://nuro.dev/posts/how_to_build_an_astro_collection_loader/)

- Setting up ZOD Schema - [guide](https://andrewkepson.com/blog/headless-wordpress/build-time-astro-content-layer-api/)
- Using ZOD for Types - [guide](https://www.allthingstypescript.dev/p/using-zod-schemas-as-source-of-truth)

# Best practises:
- add `loading="eager"` to images when you want to prevent lazy loading

# Deployment Notes
- `add a .nojekyll` file in the root of `gh-pages` branch
  - best to add it to `static` folder in this project since this just gets copied to the repo branch during deploy
  - this is necessary since page css files are created with an underscore.

- Astro 5.5 builds images a lot faster than the version SmashEurope is using. So would be wise to look into upgrading the site to that version.



