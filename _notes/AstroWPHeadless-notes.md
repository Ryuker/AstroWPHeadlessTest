# AstroWPHeadless notes
- Project to test headless communication from Wordpress to Astro using 
  - REST API
  - GraphQL

# Goals:
- [v] connect Astro to WP through GET calls
- [v] process JSON data
- [v] properly parse the content in the JSON and render it to a page
- handle pagination
- properly handle additional query params

- create pages dynamically using API fetching
  - [v] [slug].astro 
    - [v] fetch single post from API based on slug
    - [v] render post to the page
      - [v] render optimized images from remote url
      - [v] convert html tags in content string - using astro-remote package
    - [] implement pagination 

- repeat the above with WPGraphQL
- render the data to the page


# Usefull:
- adding multiple authors to wp - [guide](https://rankmath.com/blog/add-multiple-authors-for-posts/)

- rendering remote HTML or Markdown content - [github repo](https://github.com/natemoo-re/astro-remote) 



