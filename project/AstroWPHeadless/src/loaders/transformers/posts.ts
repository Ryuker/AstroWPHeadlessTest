import { splitString } from "@utils/helpers";

export const gqLPostsTransformer = (node) => ({
  id: node.id.toString() || "",
  slug: node.slug || "",
  date: new Date(node.date) || undefined,
  title: node.title || "",
  excerpt: node.excerpt || "",
  featuredImageUrl: node.featuredImage.node.sourceUrl || "",
  authors: node.authors.nodes.map(author => author) || [],
  pagesBlocks: getPagesBlocks(node.editorBlocks),
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

// Return an array containing an array per page populated with the page blocks
// - splits by checking for block name is 'core/nextpage' 
export function getPagesBlocks(blocks){
  const pageStarts = blocks.map((block, index: number) => { 
    if (index === 0)
      return { index: 0 }
    
    else if (block.name === 'core/nextpage'){
      return { index }
    }
  }).filter(item => item != undefined);
  
  const pagesBlocks = pageStarts.map((pageStart, index) => {

    // slice from last page break index till next page break
    if(index < pageStarts.length -1){
      const pageBlock = blocks.slice(pageStart.index, pageStarts[index + 1].index ).filter(block => block.name !== 'core/nextpage');
      return pageBlock;
    }
      
    // slice from last pageStart index to end of array
    else
      return blocks.slice(pageStart.index).filter(block => block.name !== 'core/nextpage');

  });

  return pagesBlocks;
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


