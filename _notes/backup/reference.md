``` TS
const contentTest = `<figure class="wp-block-image size-large"><img loading="lazy" decoding="async" width="1024" height="623" src="http://astrowpheadless.local/wp-content/uploads/2025/03/tires-on-shelf-1024x623.jpg" alt="" class="wp-image-49" srcset="http://astrowpheadless.local/wp-content/uploads/2025/03/tires-on-shelf-1024x623.jpg 1024w, http://astrowpheadless.local/wp-content/uploads/2025/03/tires-on-shelf-300x183.jpg 300w, http://astrowpheadless.local/wp-content/uploads/2025/03/tires-on-shelf-768x467.jpg 768w, http://astrowpheadless.local/wp-content/uploads/2025/03/tires-on-shelf.jpg 1280w" sizes="auto, (max-width: 1024px) 100vw, 1024px" /></figure>`;
```


# Using custom html elements from Wordpress Blocks
```Astro [slug].astro
---
import WPTest from '@components/wp/WPTest.astro';
const htmlTest = `<test id="my-test">My Test Content</test>`;
---

<Markup 
  content={htmlTest} 
  sanitize={{ allowElements: ["my-test"], }} 
  components={{ 'my-test': WPTest }} />
```

``` Astro WPTest.astro
---

const { id } = Astro.props;
console.log('entering component');

console.log('component', id);
---


<h1 class="text-blue-400" id={id}>
  <slot />
</h1>

```

## Split content string at next page
- uses a RexExp check
``` TS
splitString(content, /<!--nextpage-->/)
```

## Fetch single post by slug
``` TS
const { slug } = Astro.params;

const res = await fetch(`http://astrowpheadless.local/wp-json/wp/v2/posts?slug=${slug}`);
const [post] = await res.json();
const myPost = post;

const { 
    title, 
    content: { rendered: content},
    date, 
    authors} = myPost;

const dateFormatted = new Date(date).toLocaleDateString();
```


# GraphQL Query to get Code Block attributes
``` GraphQL
query NewQuery {
  post(id: "cG9zdDo3") {
    editorBlocks {
      name
      ... on KevinbatdorfCodeBlockPro {
        attributes {
          language
          lineNumbers
          code
          copyButton
          copyButtonString
        }
        renderedHtml
			}
    }
  }
}
```

# Sanitice Code Blocks
```Astro
<Markup 
  content={content} 
  components={{ 
    img: WPImage,
    '`<div class="wp-block-kevinbatdorf-code-block-pro">`': WPCodeBlock,
  }}
  sanitize={{
    dropElements: [`<div class="wp-block-kevinbatdorf-code-block-pro">`]
  }} 
/>

```

