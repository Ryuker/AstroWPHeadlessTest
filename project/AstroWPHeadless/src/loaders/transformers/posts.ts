import { splitString } from "@utils/helpers";

export const gqLPostsTransformer = (node) => ({
  id: node.id.toString() || "",
  slug: node.slug || "",
  date: new Date(node.date) || undefined,
  title: node.title || "",
  excerpt: node.excerpt || "",
  featuredImageUrl: node.featuredImage.node.sourceUrl || "",
  authors: node.authors.nodes.map(author => author) || [],
  editorBlocks: node.editorBlocks || undefined,
  pages: getPages(node.content),
});

export const restPostsTransformer = (post) => ({
  id: post.id.toString() || "",
  slug: post.slug || "",
  date: new Date(post.date) || undefined,
  title: post.title.rendered || "",
  excerpt: post.excerpt.rendered || "",
  featuredImageUrl: post._embedded['wp:featuredmedia'][0].source_url || "",
  authors: hydrateAuthors(post.authors),
  pages: getPages(post.content.rendered),
});

// Return an array of content objects split when 'next' page element is encountered
function getPages(content: string){
  const pagesContent = splitString(content, /<!--nextpage-->/ );
  const pages = pagesContent.map(page =>  {
    return { content: page} 
  });
  return pages;
}

function hydrateAuthors(authors){
  const authorsArray = authors.map(author => ({ id: author.id, name: author.display_name }));
  return authorsArray;
}

function hydrateEditorBlocks(editorBlocks){
  const codeBlockArray = editorBlocks.map(block => {
    if (block.name === 'kevinbatdorf/code-block-pro'){
      console.log(block);
      return block;
    }
  });
  return codeBlockArray;
}


