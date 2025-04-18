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

- Implement CodeHighlighting Support
  - [v] Install Code Block Pro and Content Blocks plugins in WP(see below)
    - [v] setup query
    - [v] test results from API
     
    - [v] implement editorBlock rendering
      - [v] processing editorBlocks in each page
      - [v] WPBlockRenderer
        - [v] maps through all the editorBlocks and checks their name to pick the right component to render the block with
        - [] WP Code Block to render code blocks
          - [v] render markdown
          - [v] code webcomponent  
            - [v] copy code button
              - [v] copy to clipboard 
              - [v] show code was copied in code block
              - [] copy code icon
                - [] copyable state color
                - [] copied state color, disable button

- [] Categories
  - [] display categories below post
  - [] clicking on category goes to page of this category
    - this page contains an overview of posts of this category
  - 

- [] Test WP HTML Tags
  - [v] Image: 
    - comes in as Figure with `class="wp-block-image size-large"`
  - [v] p element
    - doesn't have any styling
    - [v] test links in paragraphs
    - [v] test strong and cursive versions
  - [v] h2/h3 element
  - [v] ul element
    - [v]  li element
  - [] media elements
    - [] video
    - [] embedded
  - 



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

- Code Highlighting
- bunch of options for this, I went for Code Block Pro - [video](https://www.youtube.com/watch?v=gvYWfY4jrnc)
      - this renders it out properly on the wordpress frontend 
      - but also allows a graphql node export so we can copy the unrendered code 
        - this requires this plugin [github repo](https://github.com/wpengine/wp-graphql-content-blocks?tab=readme-ov-file)
- code block rendering in Astro - [video](https://www.youtube.com/watch?v=47qChv5YKOs)
  - there's a built in `Code` component apparantly which should work fine.
  - `Expressive Code` offers more options - [docs](https://expressive-code.com/key-features/code-component/)

# Best practises:
- add `loading="eager"` to images when you want to prevent lazy loading

# Deployment Notes
- `add a .nojekyll` file in the root of `gh-pages` branch
  - best to add it to `static` folder in this project since this just gets copied to the repo branch during deploy
  - this is necessary since page css files are created with an underscore.

- Astro 5.5 builds images a lot faster than the version SmashEurope is using. So would be wise to look into upgrading the site to that version.



