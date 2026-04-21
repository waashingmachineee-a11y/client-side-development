const form = document.getElementById('notesForm');

function shakeField(id) {
  const field = document.getElementById(id);
  field.classList.add('shake');
  setTimeout(() => field.classList.remove('shake'), 300);
}

form.addEventListener('submit', function(e) {
  e.preventDefault();

  document.querySelectorAll('.error').forEach(el => el.textContent = '');
  const successMsg = document.getElementById('successMsg');
  successMsg.textContent = '';

  let isValid = true;

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value;
  const title = document.getElementById('title').value.trim();
  const file = document.getElementById('file').files[0];

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (name === '') {
    document.getElementById('nameError').textContent = 'Please enter your name';
    shakeField('name');
    isValid = false;
  }

  if (email === '') {
    document.getElementById('emailError').textContent = 'Please enter your email';
    shakeField('email');
    isValid = false;
  } else if (!emailPattern.test(email)) {
    document.getElementById('emailError').textContent = 'Enter a valid email';
    shakeField('email');
    isValid = false;
  }

  if (subject === '') {
    document.getElementById('subjectError').textContent = 'Please select a subject';
    shakeField('subject');
    isValid = false;
  }

  if (title === '') {
    document.getElementById('titleError').textContent = 'Please enter notes title';
    shakeField('title');
    isValid = false;
  }

  if (!file) {
    document.getElementById('fileError').textContent = 'Please upload a file';
    shakeField('file');
    isValid = false;
  }

  if (isValid) {
    const data = { name, email, subject, title, fileName: file.name };
    localStorage.setItem('notesData', JSON.stringify(data));

    successMsg.style.color = "green";
    successMsg.textContent = `✅ ${file.name} uploaded successfully!`;

    form.reset();
  } else {
    successMsg.style.color = "red";
  }
});