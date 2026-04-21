/*
 * subjects.js — StudyHub Subjects Page
 * Module: COM109 Client-Side Development (CW2)
 *
 * Uses jQuery for:
 *   1. Tab switching between subject panels
 *   2. Click-by-click reveal of topic lists per card
 *
 * Separation of Concerns:
 *   - HTML  → structure (subjects.html)
 *   - CSS   → appearance (subjects.css)
 *   - JS    → behaviour (this file)
 */

$(document).ready(function () {

  /* ==========================================================
     1. TAB SWITCHER
     When a tab button is clicked:
       Step 1 – Remove .active from all tab buttons and panels
       Step 2 – Add .active to the clicked button
       Step 3 – Find and show the matching panel
     ========================================================== */
  $('.tab-btn').on('click', function () {
    var targetPanel = $(this).attr('data-tab'); // e.g. "programming"

    // Step 1: Reset all tabs and hide all panels
    $('.tab-btn').removeClass('active');
    $('.tab-panel').removeClass('active');

    // Step 2: Activate the clicked button
    $(this).addClass('active');

    // Step 3: Show the matching panel using its id
    $('#panel-' + targetPanel).addClass('active');
  });

  /* ==========================================================
     2. CLICK-BY-CLICK TOPIC REVEAL
     When a "Show Topics" button is clicked inside any card:
       Step 1 – Find the .topics-list directly after the button
       Step 2 – Toggle its visibility using jQuery slideToggle
       Step 3 – Update the button text and aria-expanded
     This works for ALL cards on ALL tabs via event delegation.
     ========================================================== */
  $(document).on('click', '.topics-btn', function () {
    var $btn   = $(this);                         // The clicked button
    var $list  = $btn.next('.topics-list');       // The list immediately after it
    var isOpen = $btn.attr('aria-expanded') === 'true';

    if (isOpen) {
      // Currently open → slide up (hide)
      $list.slideUp(250);
      $btn.attr('aria-expanded', 'false').text('Show Topics');
    } else {
      // Currently closed → slide down (reveal)
      $list.slideDown(250);
      $btn.attr('aria-expanded', 'true').text('Hide Topics');
    }
  });

});
