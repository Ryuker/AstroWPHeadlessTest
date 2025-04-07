<?php
use WPGraphQL\Data\Connection\UserConnectionResolver;
/**
 * Plugin Name: AuthorsInGraphQL
 * Plugin URI: 
 * GitHub Plugin URI: 
 * Description: Authors Support for GraphQL API for WordPress
 * Author: Ryuker
 * Author URI: https://www.joerivanees.com
 * Version: 0.1
 * Text Domain: wp-graphql
 * Domain Path: /languages/

 *
 * @package  AuthorsInGraphQL
 * @category Core
 * @author   Ryuker
 * @version  0.1
*/



add_action( 'graphql_register_types', 'register_authors_connection' );

function register_authors_connection() {
  if ( function_exists( 'get_multiple_authors' ) ) {
    register_graphql_connection(
      [
        'fromType'           => 'Post',
        'toType'             => 'User',
        'fromFieldName'      => 'authors',
        'connectionTypeName' => 'AuthorsToPostConnection',
        'resolve'            => function ( $source, $args, $context, $info ) {

          // Ensure UserConnectionResolver is properly imported and defined
          $resolver = new UserConnectionResolver( $source, $args, $context, $info );

          // Get co-author IDs from get_multiple_authors function
          $coauthor_ids = array_map(
            function( $coauthor ) {
              return $coauthor->ID;
            },
            get_multiple_authors( $source->ID )
          );

          // Debug the arguments
          graphql_debug( $args, [ 'type' => 'ARGS_BREAKPOINT' ] );

          // Set the query argument for include
          $resolver->set_query_arg( 'include', $coauthor_ids );

          // Return the connection
          return $resolver->get_connection();
        },
      ]
    );
  }
}


