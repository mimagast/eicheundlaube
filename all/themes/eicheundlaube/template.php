<?php
/**
 * @file
 * The primary PHP file for this theme.
 */

  function eicheundlaube_preprocess_html(&$vars) {
    drupal_add_css('//fonts.googleapis.com/css?family=Lora:400,700|Open+Sans:400,700', array('type' => 'external'));
  }