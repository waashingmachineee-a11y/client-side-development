/*
 * tools.js — StudyHub Tools Page
 * Module: COM109 Client-Side Development (CW2)
 *
 * Implements three study tools using jQuery:
 *   1. GPA Calculator  – weighted GPA on a 4.0 scale
 *   2. Grade Calculator – average mark + UK classification
 *   3. Study Timer     – countdown and stopwatch modes
 *
 * All DOM manipulation and event handling is in this file
 * (Separation of Concerns — no inline JS in HTML).
 */

$(document).ready(function () {

  /* ============================================================
     TOOL 1: GPA CALCULATOR
     ============================================================ */

  // Track how many rows exist (used for aria-label on new inputs)
  var gpaRowCount = 1;

  /**
   * ADD SUBJECT ROW
   * When the user clicks "+ Add Subject", jQuery creates a new
   * row of inputs and fades it into the #gpa-rows container.
   */
  $('#add-subject-btn').on('click', function () {
    gpaRowCount++;
    var $row = $(
      '<div class="gpa-row">' +
        '<input type="text"   class="gpa-subject" placeholder="Subject name"    aria-label="Subject name" />' +
        '<input type="number" class="gpa-grade"   placeholder="Grade (0–100)"  min="0" max="100" aria-label="Grade" />' +
        '<input type="number" class="gpa-credits" placeholder="Credits"         min="1" max="20"  aria-label="Credits" />' +
        '<button class="remove-btn" aria-label="Remove row">✕</button>' +
      '</div>'
    );
    // Hide first, then fade in for a smooth appearance
    $row.hide().appendTo('#gpa-rows').fadeIn(300);
  });

  /**
   * REMOVE A ROW
   * Event delegation — catches clicks on .remove-btn even for
   * rows added dynamically after page load.
   * Fades out then removes the parent row element.
   */
  $('#gpa-rows').on('click', '.remove-btn', function () {
    if ($('#gpa-rows .gpa-row').length > 1) {
      $(this).closest('.gpa-row').fadeOut(200, function () {
        $(this).remove();
      });
    }
  });

  /**
   * CALCULATE GPA
   * Step 1: Validate all inputs (no empty fields, ranges valid).
   * Step 2: Convert each % grade to a 4.0 grade-point value.
   * Step 3: Calculate weighted average (Σ gp × credits) / Σ credits.
   * Step 4: Show result and animate a progress bar.
   */
  $('#calc-gpa-btn').on('click', function () {
    var valid   = true;
    var totalGP = 0;
    var totalCr = 0;

    // Step 1: Validate
    $('#gpa-rows .gpa-row').each(function () {
      var subject = $(this).find('.gpa-subject').val().trim();
      var grade   = parseFloat($(this).find('.gpa-grade').val());
      var credits = parseFloat($(this).find('.gpa-credits').val());

      if (!subject || isNaN(grade) || isNaN(credits) || grade < 0 || grade > 100 || credits < 1) {
        valid = false;
      }
    });

    if (!valid) {
      $('#gpa-error').text('Please fill in all fields correctly (grade 0–100, credits ≥ 1).');
      $('#gpa-result').hide();
      return;
    }

    $('#gpa-error').text('');

    // Step 2 & 3: Convert and accumulate weighted totals
    $('#gpa-rows .gpa-row').each(function () {
      var grade   = parseFloat($(this).find('.gpa-grade').val());
      var credits = parseFloat($(this).find('.gpa-credits').val());

      // Grade conversion table (% → 4.0 scale)
      var gp;
      if      (grade >= 90) gp = 4.0;
      else if (grade >= 80) gp = 3.7;
      else if (grade >= 75) gp = 3.3;
      else if (grade >= 70) gp = 3.0;
      else if (grade >= 65) gp = 2.7;
      else if (grade >= 60) gp = 2.3;
      else if (grade >= 55) gp = 2.0;
      else if (grade >= 50) gp = 1.7;
      else if (grade >= 45) gp = 1.3;
      else if (grade >= 40) gp = 1.0;
      else                  gp = 0.0;

      totalGP += gp * credits;
      totalCr += credits;
    });

    var gpa = totalCr > 0 ? (totalGP / totalCr) : 0;

    // Step 4: Display result
    $('#gpa-value').text(gpa.toFixed(2));
    $('#gpa-result').fadeIn(400);

    // Animate progress bar: GPA/4.0 as a percentage width
    $('#gpa-bar').css('width', '0%');
    setTimeout(function () {
      $('#gpa-bar').css('width', ((gpa / 4.0) * 100) + '%');
    }, 50);
  });

  /* ============================================================
     TOOL 2: GRADE CALCULATOR
     ============================================================ */

  var markCount = 3; // Starting number of mark inputs

  /**
   * ADD MARK INPUT
   * Appends a new numbered mark row when the user clicks "+ Add Mark".
   */
  $('#add-mark-btn').on('click', function () {
    markCount++;
    var $row = $(
      '<div class="grade-row">' +
        '<label>Mark ' + markCount + '</label>' +
        '<input type="number" class="grade-mark" placeholder="0–100" min="0" max="100" aria-label="Mark ' + markCount + '" />' +
      '</div>'
    );
    $row.hide().appendTo('#grade-inputs').fadeIn(300);
  });

  /**
   * CALCULATE AVERAGE
   * Step 1: Collect all non-empty mark values and validate.
   * Step 2: Sum and divide to get an average.
   * Step 3: Map average to UK degree classification band.
   * Step 4: Display result.
   */
  $('#calc-grade-btn').on('click', function () {
    var marks = [];
    var valid = true;

    // Step 1: Collect valid marks
    $('.grade-mark').each(function () {
      var val = $(this).val().trim();
      if (val === '') return; // Skip blank fields (they are optional extras)
      var num = parseFloat(val);
      if (isNaN(num) || num < 0 || num > 100) { valid = false; }
      else { marks.push(num); }
    });

    if (!valid) {
      $('#grade-error').text('All marks must be between 0 and 100.');
      $('#grade-result').hide();
      return;
    }
    if (marks.length === 0) {
      $('#grade-error').text('Please enter at least one mark.');
      $('#grade-result').hide();
      return;
    }

    $('#grade-error').text('');

    // Step 2: Calculate average
    var sum = 0;
    for (var i = 0; i < marks.length; i++) { sum += marks[i]; }
    var avg = (sum / marks.length).toFixed(1);

    // Step 3: UK classification
    var classification;
    if      (avg >= 70) classification = 'First Class (1st)';
    else if (avg >= 60) classification = 'Upper Second (2:1)';
    else if (avg >= 50) classification = 'Lower Second (2:2)';
    else if (avg >= 40) classification = 'Third Class (3rd)';
    else                classification = 'Fail';

    // Step 4: Show result
    $('#grade-value').text(avg);
    $('#grade-class').text(classification);
    $('#grade-result').fadeIn(400);
  });

  /* ============================================================
     TOOL 3: STUDY TIMER
     Supports countdown and stopwatch modes.
     State is managed through a closure — the setInterval
     reference is kept in timerInterval so it can be cleared
     by the Pause and Reset buttons.
     ============================================================ */

  var timerInterval = null;
  var timerRunning  = false;
  var timerMode     = 'countdown';
  var totalSeconds  = 0;

  /** Converts a raw second count to [hh, mm, ss] strings */
  function formatTime(secs) {
    var h = Math.floor(secs / 3600);
    var m = Math.floor((secs % 3600) / 60);
    var s = secs % 60;
    return [
      String(h).padStart(2, '0'),
      String(m).padStart(2, '0'),
      String(s).padStart(2, '0')
    ];
  }

  /** Updates the three <span> elements in the timer display */
  function updateDisplay(secs) {
    var parts = formatTime(secs);
    $('#t-hh').text(parts[0]);
    $('#t-mm').text(parts[1]);
    $('#t-ss').text(parts[2]);
  }

  /** Resets the display to the correct starting value for the current mode */
  function resetDisplay() {
    if (timerMode === 'countdown') {
      var mins = parseInt($('#timer-mins').val(), 10) || 25;
      totalSeconds = mins * 60;
    } else {
      totalSeconds = 0;
    }
    updateDisplay(totalSeconds);
    $('#timer-msg').text('');
  }

  // ── MODE TOGGLE BUTTONS ──
  // Clicking a mode button switches between countdown and stopwatch.
  $('.mode-btn').on('click', function () {
    clearInterval(timerInterval);
    timerRunning = false;
    $('#timer-start').prop('disabled', false);
    $('#timer-stop').prop('disabled', true);

    $('.mode-btn').removeClass('active');
    $(this).addClass('active');
    timerMode = $(this).attr('data-mode');

    // Show or hide the minutes input depending on mode
    if (timerMode === 'countdown') {
      $('#countdown-settings').show();
    } else {
      $('#countdown-settings').hide();
    }

    resetDisplay();
  });

  // ── START BUTTON ──
  $('#timer-start').on('click', function () {
    if (timerRunning) return;
    timerRunning = true;
    $('#timer-start').prop('disabled', true);
    $('#timer-stop').prop('disabled', false);
    $('#timer-msg').text('');

    if (timerMode === 'countdown') {
      // Initialise from the minutes input on first start
      var mins = parseInt($('#timer-mins').val(), 10);
      if (isNaN(mins) || mins < 1) { mins = 25; }
      totalSeconds = mins * 60;
      updateDisplay(totalSeconds);

      timerInterval = setInterval(function () {
        totalSeconds--;
        updateDisplay(totalSeconds);

        // When countdown hits zero, stop and notify user
        if (totalSeconds <= 0) {
          clearInterval(timerInterval);
          timerRunning = false;
          $('#timer-start').prop('disabled', false);
          $('#timer-stop').prop('disabled', true);
          $('#timer-msg').text("⏰ Time's up! Take a break.");
        }
      }, 1000);

    } else {
      // Stopwatch: count up from the current totalSeconds
      timerInterval = setInterval(function () {
        totalSeconds++;
        updateDisplay(totalSeconds);
      }, 1000);
    }
  });

  // ── PAUSE BUTTON ──
  $('#timer-stop').on('click', function () {
    clearInterval(timerInterval);
    timerRunning = false;
    $('#timer-start').prop('disabled', false);
    $('#timer-stop').prop('disabled', true);
  });

  // ── RESET BUTTON ──
  $('#timer-reset').on('click', function () {
    clearInterval(timerInterval);
    timerRunning = false;
    $('#timer-start').prop('disabled', false);
    $('#timer-stop').prop('disabled', true);
    resetDisplay();
  });

  // ── LIVE PREVIEW: update display when minutes input changes ──
  $('#timer-mins').on('input', function () {
    if (!timerRunning && timerMode === 'countdown') {
      resetDisplay();
    }
  });

  // Initialise timer display on page load
  resetDisplay();

}); // END $(document).ready
