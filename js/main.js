// Placeholder configuration - replace with your Supabase project credentials
const supabaseUrl = 'https://YOUR_SUPABASE_URL.supabase.co';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';
fioxgn-codex/analyze-cms-integration-and-identify-legacy-content
const client = window.supabase.createClient(supabaseUrl, supabaseKey);

async function loadNavigation() {
  const { data, error } = await client
=======
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

async function loadNavigation() {
  const { data, error } = await supabase
master
    .from('navigation')
    .select('title,url')
    .order('position');
  if (error) {
    console.error('Failed to load navigation:', error);
    return;
  }
  const navList = document.querySelector('.topnav ul');
  navList.innerHTML = '';
  data.forEach(item => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = item.url;
    a.textContent = item.title;
    li.appendChild(a);
    navList.appendChild(li);
  });
}

async function loadProfile() {
fioxgn-codex/analyze-cms-integration-and-identify-legacy-content
  const { data, error } = await client
=======
  const { data, error } = await supabase
master
    .from('profile')
    .select('*')
    .single();
  if (error) {
    console.error('Failed to load profile:', error);
    return;
  }
  document.querySelector('.profile').src = data.image_url;
  document.querySelector('h1').textContent = data.name;
  document.querySelector('h2').textContent = data.title;
  const paragraphs = document.querySelectorAll('.profile-text p');
  if (paragraphs[0]) paragraphs[0].textContent = data.intro_line1;
  if (paragraphs[1]) paragraphs[1].textContent = data.intro_line2;
}

async function loadContact() {
fioxgn-codex/analyze-cms-integration-and-identify-legacy-content
  const { data, error } = await client
=======
  const { data, error } = await supabase
master
    .from('contact')
    .select('*')
    .single();
  if (error) {
    console.error('Failed to load contact info:', error);
    return;
  }
  document.querySelector('#contact .email').textContent = data.email;
  document.querySelector('#contact .email').href = 'mailto:' + data.email;
  document.querySelector('#contact .phone').textContent = data.phone;
  document.querySelector('#contact address').innerHTML = data.address_html;
}

async function loadFooter() {
fioxgn-codex/analyze-cms-integration-and-identify-legacy-content
  const { data, error } = await client
=======
  const { data, error } = await supabase
master
    .from('footer')
    .select('*')
    .single();
  if (error) {
    console.error('Failed to load footer:', error);
    return;
  }
  document.querySelector('#main-footer p').innerHTML = data.text;
}

  fioxgn-codex/analyze-cms-integration-and-identify-legacy-content
async function loadAbout() {
  const aboutSection = document.querySelector('#about .about-content');
  if (!aboutSection) return;
  const { data, error } = await client
    .from('about')
    .select('content_html')
    .single();
  if (error) {
    console.error('Failed to load about content:', error);
    return;
  }
  aboutSection.innerHTML = data.content_html;
}

=======
master
document.addEventListener('DOMContentLoaded', async () => {
  await loadNavigation();
  await loadProfile();
  await loadContact();
  await loadFooter();
fioxgn-codex/analyze-cms-integration-and-identify-legacy-content
  await loadAbout();
  await loadServices();
});

async function loadServices() {
  const servicesList = document.querySelector('#services .services-list');
  if (!servicesList) return;
  const { data, error } = await client
    .from('services')
    .select('title,description')
    .order('position');
  if (error) {
    console.error('Failed to load services:', error);
    return;
  }
  servicesList.innerHTML = '';
  data.forEach(service => {
    const li = document.createElement('li');
    const title = document.createElement('h3');
    title.textContent = service.title;
    const desc = document.createElement('p');
    desc.textContent = service.description;
    li.appendChild(title);
    li.appendChild(desc);
    servicesList.appendChild(li);
  });
}
=======
});
master
